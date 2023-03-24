import { useRouter } from "next/router";
import { currentUser, getPosts } from "@/pages/api/connects";
import { deleteGroupById, getGroupById, leaveGroupByIdAndUser } from "@/pages/api/groupsHelpers";
import { useCallback, useEffect, useRef, useState } from "react";
import { Group, Post } from "@/lib/types";
import { Post2 } from "@/components/stories/Post/Post2";
import { Button } from "@chakra-ui/react";

const GroupPage = () => {
    const router = useRouter()
    const { slug } = router.query;

    const [posts, setPosts] = useState<Post[]>();
    const [group, setGroup] = useState<Group>();


    useEffect(() => {
        if (slug) {
            getPosts(slug as string).then((group) => {
                setPosts(group);
            });
        }
    }, [slug, posts]);

    useEffect(() => {
        if (slug) {
            getGroupById(slug as string).then((group) => {
                if (!group) {
                    router.push('/dashboard');
                } else {
                    setGroup(group);
                }
            });
        }
    }, [router, slug]);

    const deleteGroup = () => {
        deleteGroupById(slug as string);
        console.log('delete group');
        router.push('/groups');
    }

    const removeUser = (user: string) => {
        leaveGroupByIdAndUser(group!.id, user)
    }

    return (
        <>
            <div className='grid justify-center px-20'>
                <div
                className="bg-violet-600 shadow-md rounded-lg px-4 py-6 sm:px-6 sm:py-4 lg:px-8 lg:py-6 grid place-items-center gap-2"
                >
                    <h2 className="font-bold text-xl text-white">{group?.name}</h2>
                    <p className="text-white">{group?.description}</p>
                    {currentUser && group?.admins?.includes(currentUser?.id) ? 
                    <Button 
                    onClick={deleteGroup}
                    className="bg-white text-violet-600 px-4 py-2 rounded-lg"
                    >Delete Group</Button>
                    : ""
                    }
                </div>
                {
                    posts?.map((post) => {
                        return (
                         <div key={post.id} className="py-3">
                                <Post2
                                    post={post}
                                    />
                                {currentUser && group?.admins?.includes(currentUser?.id) ? 
                                    <Button 
                                    onClick={()=>removeUser(post.user)}
                                    className="text-violet-600 float-right mr-4 justify-end text-right hover:text-violet-800 text-sm text-decoration-line: underline"
                                    >Remove User</Button>
                                : ""
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
      );
};

export default GroupPage;