import { User } from "@/lib/types";
import router, { Router } from "next/router";
import { FC, useState } from "react";
import { followFriend, unfollowFriend } from "@/pages/api/friendsHelpers";

interface FollowFriendProps {
    user: User,
    following: boolean,
    onFollow?: (friendId: string) => void,
    onUnfollow?: (friendId: string) => void
}


const FollowFriend: FC<FollowFriendProps> = (props) => {

    const { user, following, onFollow, onUnfollow } = props;

    const [isFollowing, setIsFollowing] = useState<boolean>(following)

    const handleUnfollow = async (friendId: string) => {
        console.log(friendId)
        if (!friendId) {
            return
        }
        await unfollowFriend(friendId)
        if (onUnfollow) {
            onUnfollow(friendId);
        }
        setIsFollowing(false)
    }

    const handleFollow = async (friendId: string) => {
        console.log(friendId)
        if (!friendId) {
            return
        }
        await followFriend(friendId)
        if (onFollow) {
            onFollow(friendId);
        }
        setIsFollowing(true)
    }
    
    return (
    <div className="flex rounded-md py-3 px-6 shadow-md justify-between">
        <div className="flex items-center">
            <img src={user.avatar ? `http://127.0.0.1:8090/api/files/users/${user?.id}/${user?.avatar}` : `https://picsum.photos/200`} className="w-12 h-12 flex mt-1 ml-9 rounded-full overflow-hidden"/>
            <h3 className='text-xl '>{user.name}</h3>
        </div>
        <div className='flex items-center'>
            {isFollowing ? (
                <button onClick={() => handleUnfollow(user.id)} className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-500">
                Unfollow
                </button>
            ) : (
                <button onClick={() => handleFollow(user.id)} className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-500">
                Follow
                </button>
            )}
        </div>
        {/* <hr
        className="border-1 border-gray-300 w-full mt-4"
        ></hr> */}
    </div>
    );
}; 

export default FollowFriend;