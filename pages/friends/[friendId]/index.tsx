import { useRouter } from "next/router";
import { currentUser, getPosts } from "@/pages/api/connects";
import { deleteGroupById, getGroupById } from "@/pages/api/groupsHelpers";
import { use, useEffect, useState } from "react";
import { Group, Post, User } from "@/lib/types";
import { Post2 } from "@/components/stories/Post/Post2";
import { Button } from "@chakra-ui/react";
import ProfileInfo from "@/components/stories/ProfileInfo/ProfileInfo";
import { getFriend } from "@/pages/api/friendsHelpers";

const UserPage = () => {
    const router = useRouter()
    const { friendId } = router.query;

    const [posts, setPosts] = useState<Post[]>();

    const [user, setUser] = useState<User>();


    useEffect(() => {
        if (friendId) {
            getPosts(undefined, friendId as string).then((group) => {
                setPosts(group);
            });
        }
    }, [friendId]);

    useEffect(() => {
        if (friendId) {
            getFriend(friendId as string).then((friend) => {
                setUser(friend);
            });
        }
    }, [friendId]);

    return (
        <>
        <div>
            <ProfileInfo user={user} />
            {
                posts?.map((post) => {
                    return (
                        <div key={post.id} className="py-3">
                            <Post2
                                post={post}
                                />
                        </div>
                    )
                })
            }
        </div>
        </>
      );
};

export default UserPage;