import React from "react"
import { FC } from "react"

    

const Joingroup: FC = () => {
    const onLeave = () => {
        setFollowing(true)
    }
    const onJoin = () => {
        setFollowing(false)
    }
    const [following, setFollowing] = React.useState<boolean | undefined>();

    return (

        <div className="max-w-sm flex justify-between items-center w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{}</h3>
            {following 
            ? 
            <button onClick={onLeave} className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg px-4 py-2 ">Leave group</button>
            : 
            <button onClick={onJoin} className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none font-medium rounded-lg px-4 py-2">Join Group</button>
            }
        </div>
    )
}

export default Joingroup 