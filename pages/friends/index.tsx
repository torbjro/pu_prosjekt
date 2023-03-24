import { useEffect, useRef, useState } from 'react'
import { currentUser, pocketbase } from '../api/connects'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { User } from '@/lib/types'
import FollowFriend from '@/components/stories/FollowFriend'
import { unfollowFriend, getFriends } from '../api/friendsHelpers'

export default function Friends() {
    const [friends, setFriends] = useState<User[]>()
    const [searchList, setSearchList] = useState<User[]>();
    const search = useRef<string | null>(null);

    useEffect(() => {
        getFriends().then((res) => {
            if (res) {
                setFriends(res)
            }
        })
    }, [])

    useEffect(() => {
        // This effect will run whenever searchList updates
        // You can add any logic you need here, or just leave it empty to trigger a re-render
    }, [searchList]);

    const handleUnfollow = async (friendId: string) => {
        console.log(friendId)
        if (!friendId) {
            return
        }
        await unfollowFriend(friendId)
        const newFriends = friends?.filter((friend) => friend.id !== friendId)
        setFriends(newFriends)
    }

    const handleAddFriend = (newFriend: User) => {
        setFriends((prevFriends) => prevFriends ? [...prevFriends, newFriend] : [newFriend]);
    };

    const handleDeleteFriend = (friendId: string) => {
        setFriends((prevFriends) => prevFriends?.filter((friend) => friend.id !== friendId));
    };

    const handleInputChange = (e: any) => {
        search.current = e.target.value
    }

    const handleSearch = async (search: any) => {
        //console.log(e)
       //search.preventDefault()
       if (search == '') {
           return
        }
        try {
            const users = await pocketbase.collection('users').getList<User>(1, 100, { filter: `username ~ '${search}'` })
            console.log(users.items)
            setSearchList(users.items)
        } catch (error) {
            console.log(error)
        }
    }
        
    return (

        <div>
            <div>
                {/*<div className="relative px-5">
                    <input type="search" onChange={(e) => setSearch(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-violet-500 focus:border-violet-500 dark:bg-white dark:border-violet-600 dark:placeholder-violet-600 dark:text-black dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="Search for friends" ></input>
                    <button onClick={() => handleSearch(search)} type="submit" className="text-white absolute right-7 bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-500">Search</button>
                </div>
                */}
                <div className="relative px-5">
                    <input type="search" onChange={handleInputChange} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-violet-500 focus:border-violet-500 dark:bg-white dark:border-violet-600 dark:placeholder-violet-600 dark:text-black dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="Search for friends"></input>

                    <button onClick={() => handleSearch(search?.current)} className="text-white absolute right-7 bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-500">Search</button>
                </div>
                <div className="px-5">
                    {searchList?.map((user) => {
                        return (
                            <FollowFriend key={user.id} 
                                user={user} 
                                following={currentUser?.friends.includes(user.id)}
                                onFollow={() => handleAddFriend(user)}
                                onUnfollow={() => handleDeleteFriend(user.id)}
                            />
                        )

                    //     currentUser?.friends?.includes(user.id) ? 
                    //         <FollowFriend key={user.id} user={user} onFollow={() => {}} />
                    //     :
                    //         <FollowFriend key={user.id} user={user} onUnfollow={() => {}}/>
                    // }
                    })}
                </div>       
                {/* <Searchbar /> */}
                </div>
                
                <ul role="list" className="px-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {friends?.map((friend) => (
                        <li
                            key={friend.id}
                            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                        >
                            <div className="flex flex-1 flex-col p-8">
                                <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={`http://127.0.0.1:8090/api/files/users/${friend.id}/${friend.avatar}`} alt="" />
                                <h3 className="mt-6 text-sm font-medium text-gray-900">{friend.name}</h3>
                            </div>
                            <div>
                                <div className=" flex divide-x divide-gray-200">
                                    <div className="flex w-0 flex-1">
                                        <button
                                            
                                            className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                            onClick={() => handleUnfollow(friend.id)}
                                        >   
                                            <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="mx-3">Unfollow</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    )
}
