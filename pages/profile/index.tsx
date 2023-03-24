import ProfileInfo from "@/components/stories/ProfileInfo/ProfileInfo"
import { currentUser, getExercisesByPostId, getPosts, getUser, getUserPosts } from "../api/connects";
import { Record } from 'pocketbase';
import { FC, useEffect, useState } from "react";
import { Post2 } from "@/components/stories/Post/Post2";
import { Post, User } from "../../lib/types";
import Progress from "@/components/stories/Progress/Progress";

interface ProfileProps {
    children: React.ReactNode;
}


export const Profile: FC<ProfileProps> = (props) => {

    const {children} = props

    const user =
    {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        avatar: currentUser?.avatar,
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
        console.log(posts);
      }, []);
        /*getPosts(
            undefined,
            currentUser?.id
        ).then((postsList) => {
            setPosts(postsList);
            console.log(postsList);
        });
    }, []);*/


    return (
        <div>
            <ProfileInfo user={user} />
            <div className="flex justify-center">
                <Progress/>
            </div>
            <div className="grid pt-10">
                {children}
                {posts?.map((post) => {


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