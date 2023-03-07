import ProfileInfo from "@/components/stories/ProfileInfo/ProfileInfo"
import { currentUser, getExercisesByPostId, getPosts, getUser, getUserPosts } from "../api/connects";
import { Record } from 'pocketbase';
import { useEffect, useState } from "react";
import { Post2 } from "@/components/stories/Post/Post2";
import { Post, User } from "../../lib/types";


export const Profile = () => {

    const user =
    {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        avatar: currentUser?.avatar,
    } as User
    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {
        getPosts(
            undefined,
            currentUser?.id
        ).then((postsList) => {
            setPosts(postsList);
        });
    }, []);


    return (
        <div>
            <ProfileInfo user={user} />
            <div className="grid pt-10">
                {posts?.map((post) => {

                    console.log('exercises', post.program.exercises)

                    return (
                    <div key={post.id} className="p-5">
                        <Post2 
                            post={post}                 
                        />
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile;