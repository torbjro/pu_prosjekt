import { FC, useState } from "react"
import { User } from "@/pages/types"
import { Image } from "@chakra-ui/react"


interface ProfileInfoProps {
    user: User
}

const ProfileInfo: FC<ProfileInfoProps> = (props) => {
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