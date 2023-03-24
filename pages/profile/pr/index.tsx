import ProfileInfo from "@/components/stories/ProfileInfo/ProfileInfo"
import { currentUser, getExercisesByPostId, getPosts, getUser, getUserPosts } from "../../api/connects";
import { Record } from 'pocketbase';
import { useEffect, useState } from "react";
import { Post2 } from "@/components/stories/Post/Post2";
import { Post, PrExcercises, User } from "../../../lib/types";
import Progress from "@/components/stories/Progress/Progress";
import Pr_start from "@/components/stories/Progress/Pr_start";
import { Newpr } from "@/components/stories/Newpr/Newpr";
import { getExerciseNamesFromPrs } from "@/pages/api/prHelpers";


export const Pr_page = () => {

    const user =
    {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        avatar: currentUser?.avatar,
    } as User
    const [posts, setPosts] = useState<Post[]>();
    const [exercises, setExercises] = useState<PrExcercises[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            await getPosts(undefined, currentUser?.id).then((posts: Post[]) => {
                setPosts(posts);
            }
            );
        }
        const fetchExercises = async () => {
            await getExerciseNamesFromPrs(currentUser!.id).then((exercises: PrExcercises[]) => {
                setExercises(exercises);
            })
        }
        fetchPosts();
        fetchExercises();
      }, []);


    return (
        <div>
            <ProfileInfo user={user} />
            <div className="flex justify-center">
                <Progress/>
            </div>
            <Newpr/>
            <div className="grid pt-10">
                <Pr_start options={exercises}/>
            </div>
            
        </div>
    )
}

export default Pr_page;