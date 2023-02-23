import ProfileInfo from "@/components/stories/ProfileInfo/ProfileInfo"
import { getExercisesByPostId, getUser, getUserPosts } from "../api/connects";
import { Record } from 'pocketbase';
import { useEffect, useState } from "react";
import { Exercise, Post2 } from "@/components/stories/Post/Post2";

export const Profile = () => {

    const user = getUser();
    const [posts, setPosts] = useState<Record[]>();
    const [PostExercises, setPostExercises] = useState<Map<Record, Record[]>>();

    useEffect(() => {
        getUserPosts().then((postsList) => {
            setPosts(postsList.items);
            const tempMap = new Map<Record, Record[]>();
            const exercisesPromises = postsList.items.map((post) => getExercisesByPostId(post.id));
            Promise.all(exercisesPromises).then((exercisesArrays) => {
                postsList.items.forEach((post, index) => {
                    tempMap.set(post, exercisesArrays[index].items);
                });
                setPostExercises(tempMap);
            }
            );
        });
    }, []);

    console.log('user', user)

    return (
        <div>
            <ProfileInfo profile_pic_src={`http://127.0.0.1:8090/api/files/users/${user?.id}/${user?.avatar}`} name={user?.name} email={user?.email} />
            <div className="grid grid-cols-3 gap-4 pt-6">
                {posts?.map((post) => {
                    
                    let exercises: Exercise[] = [];
                    if (PostExercises?.get(post)) {
                        exercises = PostExercises.get(post)?.map((exercise) => {
                            return {
                                navn: exercise.exercise,
                                sets: exercise.sets,
                                reps: exercise.reps,
                            }
                        })!;
                    }

                    console.log('exercises', exercises)

                    return (
                    <div key={post.id}>
                        <Post2 
                            name={user?.name}
                            exercises={exercises}
                            profile_pic_src={"https://picsum.photos/200"} 
                            profile_src={""}                        
                        />
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile;