import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { ListResult, Record } from 'pocketbase'
import { useEffect, useState } from 'react'
import { getFriends, pocketbase } from '../api/connects'
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Router } from 'next/router'

export default function Friends() {
    const user = pocketbase.authStore.model;

    const [friends, setFriends] = useState<ListResult<Record>>()

    useEffect(() => {
        getFriends().then((friends) => {
            if (friends.items.length > 0) {
                setFriends(friends)
            }

        })
    }, [])

    console.log('friends', friends)

    const handleUnfollow = async (friend: Record) => {
        const oldFriends = pocketbase.authStore.model?.friends;


        const newFriends = oldFriends?.filter((f: Record) => f !== friend)
        console.log(newFriends)
        const newFriend = await pocketbase.collection('users').update(pocketbase.authStore.model!.id, { friends: newFriends })
        location.reload()
    }
    const goToPage = (friend: Record) => {
        console.log('go to page', friend)
    }
    return (

        <form>
            <div className="min-h-full">
                <div className="relative px-5">
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-violet-500 focus:border-violet-500 dark:bg-white dark:border-violet-600 dark:placeholder-violet-600 dark:text-black dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="Search for friends" required></input>
                    <button type="submit" className="text-white absolute right-7 bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-500">Search</button>
                </div>
                <ul role="list" className="px-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {friends?.items?.map((friend) => (
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
                                            onClick={() => goToPage(friend)}
                                            className="relative inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                                            <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="mx-3">Go to profile</span>
                                        </button>
                                    </div>
                                    <div className="flex w-0 flex-1">
                                        <button
                                            onClick={() => handleUnfollow(friend)}
                                            className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                        >
                                            <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="mx-3">Unfollow 🎃</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </form>
    )
}