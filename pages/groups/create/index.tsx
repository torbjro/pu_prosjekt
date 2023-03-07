/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Input, Tag, TagLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createGroup } from "@/pages/api/groupsHelpers";
import { useRouter } from "next/router";
import Creategroup from "@/components/stories/Creategroup/Creategroup";

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
        <Creategroup/>
        </>
    );
};

export default create_groups;
