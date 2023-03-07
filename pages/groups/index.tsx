import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { currentUser } from "../api/connects";
import { getGroups, joinGroupById, leaveGroupById } from "../api/groupsHelpers";
import { Group, User } from "../../lib/types";


const Groups = () => {
    const [groups, setGroups] = useState<Group[]>();
    //map of group id to boolean

    useEffect(() => {
        getGroups().then((groups: Group[]) => {
            setGroups(groups);
        });
    }, [groups]);

    const joinGroup = (groupId: string) => {
        joinGroupById(groupId);
    }

    const leaveGroup = (groupId: string) => {
        leaveGroupById(groupId);
    }


    const user =
    {
        id: currentUser?.id,
    } as User

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-violet-700 p-2">Groups</h1>
            <button onClick={() => router.push('/groups/create')} className="bg-violet-600 text-white px-4 my-6 w-full h-20 rounded-lg">Create Group</button>
            <div className="grid grid-cols-3 gap-4">
                {
                    groups?.map((group) => {
                        console.log(group.members)
                        console.log(user)
                        return (
                            <div key={group.id} className="bg-white shadow-md rounded-lg px-4 py-6 sm:px-6 sm:py-4 lg:px-8 lg:py-6 grid place-items-center gap-2">

                                <a href={"/groups/" + group.id} className="">
                                    <h2 className="font-bold text-xl text-violet-600">{group.name}</h2>
                                </a>
                                <p>{group.description}</p>
                                {user.id && group.members.includes(user?.id) ? <button onClick={() => leaveGroup(group.id)} className="bg-violet-600 text-white px-4 py-2 rounded-lg">Leave</button> : <button onClick={() => joinGroup(group.id)} className="bg-violet-600 text-white px-4 py-2 rounded-lg">Join</button>}
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Groups;