import { FC, useState } from "react"

interface ProfileInfoProps {
    profile_pic_src: string,
    name: string,
    email: string,

}

const ProfileInfo: FC<ProfileInfoProps> = (props) => {
    const {profile_pic_src, name, email} = props
    return (
        <div className="grid justify-center text-center items-center">
      <img src={profile_pic_src} alt="profile pic" className="sm:w-40 sm:h-40 w-20 h-20 rounded-full" />
      <div>
        <div style={{fontWeight: 'bold'}}>{name}</div>
        <div>{email}</div>
      </div>
    </div>
    );
};

export default ProfileInfo;