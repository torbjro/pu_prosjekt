import Pocketbase from "pocketbase"

export const pocketbase = new Pocketbase("http://127.0.0.1:8090");

export const currentUser = pocketbase.authStore.model;

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
        "passwordConfim": passwordConfirm,
        "name": name,
        "posts": [

        ],
        "programs": [

        ]
    };
    const newUser = await pocketbase.collection('users').create(data);
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

export async function getUser() {
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

export async function getName() {
    if (currentUser != null) {
        return currentUser.name;
    }
    else {
        console.log("currentUser is null");
    }
}


export async function getFriends() {
    pocketbase.autoCancellation(false);
    //const user = pocketbase.authStore.model;
    //const friends = await pocketbase.collection('users').getList(1, 20, {
    //    filter: 'users.friends.id == ' + user?.id
    //});
    const friends = pocketbase.authStore.model?.friends;
    return friends;
}