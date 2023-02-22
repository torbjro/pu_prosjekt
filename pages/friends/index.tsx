import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Record } from 'pocketbase'
import { useEffect, useState } from 'react'
import { getFriends, pocketbase } from '../api/connects'

export default function Friends() {
    
    const [friends, setFriends] = useState<Record[]>()

    useEffect(() => {
        getFriends().then((friends) => {    
            setFriends(friends)
        })
    }, [])
        
    const handleUnfollow = async (friend: Record) => {
        const oldFriends = pocketbase.authStore.model?.friends;
        const newFriends = oldFriends?.filter((f: Record) => f !== friend)
        const newFriend = await pocketbase.collection('users').update(pocketbase.authStore.model!.id, {friends: newFriends})
        location.reload()
    }
    const goToPage = (friend: Record) => {
        console.log('go to page', friend)
    }

    return (
    
    <form>   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-violet-500 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-violet-500 focus:border-violet-500 dark:bg-white dark:border-violet-600 dark:placeholder-violet-600 dark:text-black dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="Search for friends" required></input>
      <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-500">Search</button>
      </div>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {friends?.map((friend) => (
          <li
          key={friend.id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={friend.avatar} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{friend.name}</h3>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button
                onClick={() => goToPage(friend)}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Go to profile</span>
                </button>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <button
                onClick={() => handleUnfollow(friend)}

                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Unfollow 🎃</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </form>
  )
}
