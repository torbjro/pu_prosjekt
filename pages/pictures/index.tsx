import ProfileInfo from "@/components/stories/ProfileInfo/ProfileInfo"
import { currentUser, getExercisesByPostId, getPosts, getUser, getUserPosts, pocketbase } from "../api/connects";
import { Record } from 'pocketbase';
import { useEffect, useState } from "react";
import { Post2 } from "@/components/stories/Post/Post2";
import { Post, User } from "../../lib/types";
import Progress from "@/components/stories/Progress/Progress";
import Pictures from "@/components/stories/Progress/Pictures";
import PictureFeed from "@/components/stories/Progress/Pictures";


export const Profile = () => {

    const user =
    {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        avatar: currentUser?.avatar,
        pictures: currentUser?.pictures
    } as User
    const [posts, setPosts] = useState<Post[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            getPosts(undefined, currentUser?.id).then((posts: Post[]) => {
                setPosts(posts);
                setLoading(false);
            }
            );
        }
        fetchPosts();
      }, []);


    return (
        <div>
            <ProfileInfo user={user} />
            <div className="flex justify-center">
                <Progress/>
            </div>
            <div className="grid pt-10">
                <PictureFeed user={user}/>
            </div>
        </div>
    )
}

export default Profile;