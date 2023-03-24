import { FC, useState } from "react"
import { User } from "@/lib/types"
import { Image } from "@chakra-ui/react"


interface ProfileInfoProps {
    user: User | undefined;
}

const ProfileInfo: FC<ProfileInfoProps> = (props: ProfileInfoProps) => {
    if (!props.user) {
        return <div></div>
    }
    
    const {id, name, email, avatar} = props.user;
    return (
        <div className="grid justify-center text-center items-center">
      <Image src={`http://127.0.0.1:8090/api/files/users/${id}/${avatar}`} alt="profile pic" className="sm:w-40 sm:h-40 w-20 h-20 rounded-full" />
      <div>
        <div style={{fontWeight: 'bold'}}>{name}</div>
        <div>{email}</div>
      </div>
    </div>
    );
};

export default ProfileInfo;