/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Input, Tag, TagLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createGroup } from "@/pages/api/groupsHelpers";
import { useRouter } from "next/router";

const create_groups = () => {
    const input = useRef<HTMLInputElement>(null);

    const [membersList, setMembersList] = useState<string[]>([]);

    const addUser = () => {

        
        if (!input.current || !input.current.value) {
            return;
        }
        console.log(input.current.value);
        input.current.value = "";
        input.current.focus();
    };


    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const name = e.currentTarget.groupName.value;
        const description = e.currentTarget.description.value;

        createGroup(name, description);

        router.push("/groups");
        
        e.preventDefault();
        
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-10">
            <h1 className="font-bold text-2xl p-6">Create a group</h1>
            <div className="flex flex-col items-center justify-center gap-2">
                <label htmlFor="groupName">Name your group
                    <Input type="text" name="groupName" id="groupName" placeholder="Fitness group" />
                </label>
            </div>
            <></>
            <div className="flex flex-col items-center justify-center gap-2">
                <label htmlFor="description">Description
                    <Input type="text" name="description" id="description" placeholder="Description" className="h-40 w-64" />
                </label>
            </div>
            <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                Create
            </button>
        </form>
        {/* <form
            onSubmit={handleSubmit2}
            className="flex flex-col items-center justify-center gap-2">
            
            <div className="flex flex-row items-center justify-center gap-2">
            {membersList.map((member) => (
                <div className="flex flex-row items-center justify-center gap-2">
                    <p>{member}</p>
                </div>
            ))}
            </div>
        
            <label htmlFor="username">Add members</label>
            <input type="text" ref={input} placeholder="username" />
            <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                Add
            </button>
        </form> */}
        </>
    );
};

export default create_groups;
