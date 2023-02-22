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
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {friends?.map((person) => (
          <li
          key={person.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={person.avatar} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button
                onClick={() => goToPage(person)}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Go to profile</span>
                </button>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <button
                onClick={() => handleUnfollow(person)}

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
  )
}
