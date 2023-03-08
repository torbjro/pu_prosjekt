import { createGroup } from "@/pages/api/groupsHelpers";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react"

interface CreategroupProps {
    children?: string
}

const Creategroup: FC<CreategroupProps> = (props) => {
    const {children} = props

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

    const onCancel = () => {router.push("/groups");}

    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const name = e.currentTarget.groupName.value;
        const description = e.currentTarget.description.value;

        createGroup(name, description);

        router.push("/groups");
        
        e.preventDefault();
        
    };
    
    return (

        //Creategroup tailwind style
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="flex items-center border-b border-violet-500 py-2">
                <input name="groupName" id="groupName" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Groupname" aria-label="Full name"></input>
        </div>

        <div className="flex items-center border-b border-violet-500 py-2">
                <input name="description" id="description" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Description" aria-label="Full name"></input>
        </div>

        <div className="flex justify-center mt-2">
        <button type="submit" className="flex-shrink-0 bg-violet-500 hover:bg-violet-700 border-violet-500 hover:border-violet-700 text-sm border-4 text-white py-1 px-2 rounded">
      Create group
      </button>
      <button onClick={onCancel} className="flex-shrink-0 border-transparent border-4 text-violet-500 hover:text-violet-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
        </button>
        </div>
        </form>
        
        
    )
}

export default Creategroup