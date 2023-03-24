import Pocketbase, { Record } from "pocketbase"
import { Exercise, Exercise2, Group, Post, Program, User, ExerciseRef, ExpandedUser, PrExcercises, PR, Picture } from "../../lib/types";

export const pocketbase = new Pocketbase("http://127.0.0.1:8090");

export const currentUser = pocketbase.authStore.model;

export async function getUpdatedUser() {
    const user = await pocketbase.collection('users').getOne<ExpandedUser>(`${currentUser?.id}`, { expand: "posts,posts.program,posts.program.exercises,posts.program.exercises.exercise_ref" });
    return user;
}

export async function authAndReturnUser(username: string, password: string) {
    const user = await pocketbase.collection('users').authWithPassword(username, password);
    return user;
}

export async function registerUser(username: string, email: string, password: string, passwordConfirm: string, name: string) {
    const data = {
        "username": username,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": passwordConfirm,
        "name": name,
        "posts": [

        ],
        "programs": [

        ],
        "friends": [

        ]
    };
    const newUser = await pocketbase.collection('users').create(data);
    const user1 = await authAndReturnUser(username, password);
    return newUser;
}

export async function deleteUser(userId: string) {
    await pocketbase.collection('users').delete(userId);
}

export async function createProgram(userId: string, exercises: string[], name: string) {
    const data = {
        "name": name,
        "user": [
            userId
        ],
        "exercises": exercises
    };
    const program = await pocketbase.collection('programs').create(data);
    return program;
}

export async function deleteProgram(programId: string) {
    await pocketbase.collection('programs').delete(programId);
}

export async function createPost(caption: string, programId: string, userId: string) {
    const data = {
        "caption": caption,
        "program": programId,
        "user": userId
    };
    const post = await pocketbase.collection('posts').create(data);
    return post;
}

export async function deletePost(postId: string) {
    await pocketbase.collection('posts').delete(postId);
}

export async function createExercise(exercise: string, sets: number, reps: number) {
    const data = {
        "exercise": exercise,
        "sets": sets,
        "reps": reps
    };
    const newExercise = await pocketbase.collection('exercises').create(data);
}

export async function deleteExercise(exerciseId: string) {
    await pocketbase.collection('exercises').delete(exerciseId);
}

export async function isAuthenticated() {
    return pocketbase.authStore.isValid;
}

export async function logout() {
    pocketbase.authStore.clear();
}

export function getUser() {
    //return pocketbase.authStore.model;
    return pocketbase.authStore.model;
}

export async function getUserId() {
    if (currentUser != null) {
        return currentUser.id;
    }
    else {
        console.log("currentUser is null");
    }
}

export function getUserPosts() {
    pocketbase.autoCancellation(false);
    return pocketbase.collection('posts').getList(1, 20, { filter: `id = '${currentUser?.posts?.join("' || id = '")}'` });
}

export async function getName() {
    if (currentUser != null) {
        return currentUser.name;
    }
    else {
        console.log("currentUser is null");
    }
}

export async function getPosts(groupId?: string, userId?: string) {
    pocketbase.autoCancellation(false);

    let filter = "";
    if (groupId) {
        const group = await pocketbase.collection('groups').getOne<Group>(`${groupId}`)
        filter = `user = '${group.members.join("' || user = '")}'`;
    }
    if (userId) {
        filter = `user = '${userId}'`;
    }
    if (!groupId && !userId) {
        filter = `user != '${currentUser?.id}'`;
    }
    const posts = await pocketbase.collection("posts").getFullList<Post>(20, { expand: "program,program.exercises,user,program.exercises.exercise_ref", filter: `${filter}`, sort: '-created'});
    const updatedUser = await getUpdatedUser();

    if (groupId) {
        sortPosts(posts, updatedUser);
        return posts;
    }
    else {
        return posts;
    }

        
}

function sortPosts(posts: Post[], user: ExpandedUser) {
    return posts.sort((a, b) => {
        
      // Sort by which post is the most similar to the user's posts' exercises
      const aExercises = a.expand.program?.expand.exercises?.map(
        (exercise) => exercise.expand.exercise_ref
      );
      const bExercises = b.expand.program?.expand.exercises?.map(
        (exercise) => exercise.expand.exercise_ref
      );
      let aSimilarity = 0;
      let bSimilarity = 0;
  
      for (let i = 0; i < aExercises?.length; i++) {
        for (let j = 0; j < user.expand.posts.length; j++) {
          const userExercises = user.expand.posts[j].expand.program?.expand.exercises.map(
            (exercise) => exercise.expand.exercise_ref
          );
          for (let k = 0; k < userExercises?.length; k++) {
            if (
              aExercises[i]?.id == userExercises[k]?.id
            ) {
                aSimilarity += 4;
            }
            if (
                aExercises[i]?.bodypart == userExercises[k]?.bodypart) {
                aSimilarity += 2;
            }
            if (
              aExercises[i]?.type == userExercises[k]?.type &&
              aExercises[i]?.difficulty == userExercises[k]?.difficulty
            ) {
              aSimilarity++;
            }
          }
        }
      }
      for (let i = 0; i < bExercises?.length; i++) {
        for (let j = 0; j < user.expand.posts.length; j++) {
          const userExercises = user.expand.posts[j].expand.program?.expand.exercises.map(
            (exercise) => exercise.expand.exercise_ref
          );
          for (let k = 0; k < userExercises?.length; k++) {
            if (
              bExercises[i]?.id == userExercises[k]?.id &&
              bExercises[i]?.title == userExercises[k]?.title &&
              bExercises[i]?.bodypart == userExercises[k]?.bodypart &&
              bExercises[i]?.type == userExercises[k]?.type &&
              bExercises[i]?.difficulty == userExercises[k]?.difficulty
            ) {
              bSimilarity++;
            }
          }
        }
      }
      return bSimilarity - aSimilarity;

    });
}

export async function getUserById(id: string) {
    const user = await pocketbase.collection("users").getOne(`${id}`);
    return user;
}

export async function getFriends() {
    pocketbase.autoCancellation(false);
    const friends = await pocketbase.collection('users').getList(1, 20, { filter: `id = '${currentUser?.friends?.join("' || id = '")}'` });
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pocketbase.authStore.isValid && await pocketbase.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        pocketbase.authStore.clear();
    }
    return friends;
}

export async function getProgramById(id: string) {
    const programs = await pocketbase.collection('programs').getOne(`${id}`);
    return programs;
}

export async function getExercisesByPostId(id: string) {
    // post contains an id to a program, which contains an array of ids to exercises
    const post = await pocketbase.collection('posts').getOne(`${id}`);
    const program = await pocketbase.collection('programs').getOne(`${post?.program}`);
    const exercises = await pocketbase.collection('exercises').getList(1, 20, { filter: `id = '${program?.exercises.join("' || id = '")}'` });
    return exercises;
}

export function getUserAvatar() {
    return currentUser?.avatar;
}

// TODO: currently not working
export async function addPicture(userId: string, pictureFile: File ) {
    // const oldPictures = pocketbase.authStore.model?.pictures;
    // const newPictures = oldPictures + pictureFile;

    const formData = new FormData();
    formData.append('progressPicture', pictureFile);
    formData.append('user', userId);
    //print the key/value pairs
    await pocketbase.collection('pictures').create(formData);
}

export async function getPictures() {
    const pictures = await pocketbase.collection('pictures').getList<Picture>(1, 20, { filter: `user = '${currentUser?.id}'` });
    return pictures;
}


export async function updateStreak() {
    const mostRecentPost = await pocketbase.collection('posts').getFirstListItem<Post>(`user = '${currentUser?.id}'`, {sort: '-created'});
    console.log("Most recent post: ", mostRecentPost);
    const today = new Date();
    console.log("Today: ", today);
    const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    console.log("Today at midnight: ", todayAtMidnight);
    const lastPostDate = new Date(mostRecentPost?.created);
    console.log("Last post date: ", lastPostDate);
    const lastPostDateAtMidnight = new Date(lastPostDate.getFullYear(), lastPostDate.getMonth(), lastPostDate.getDate());
    console.log("Last post date at midnight: ", lastPostDateAtMidnight);
    const differenceInDays = Math.ceil((todayAtMidnight.getTime() - lastPostDateAtMidnight.getTime()) / (1000 * 3600 * 24));
    console.log("Difference in days: ", differenceInDays);
    if (differenceInDays == 1) {
        await pocketbase.collection('users').update(currentUser?.id!, { streak: currentUser?.streak + 1 });
        console.log("Streak: ", currentUser?.streak);
    }
}

