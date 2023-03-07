import { Exercise, Post } from '@/lib/types';
import { Image } from '@chakra-ui/react';
import React from 'react';


interface PostProps {
    post: Post;
}


export const Post2: React.FC<PostProps> = (props) =>{

    const { post } = props;

    //TODO: add links to user profiles

    return(
        <div className=" border w-[650px] rounded-2xl border-gray-200 mx-auto shadow-md max-w-7xl pr-10">
                <a href={"/"} className="w-12 h-12 flex mt-4 ml-9 rounded-full overflow-hidden"><Image alt='UserImage' src={post.user.avatar ? `http://127.0.0.1:8090/api/files/users/${post.user?.id}/${post.user?.avatar}` : `https://picsum.photos/200`} /></a>
                <a href={"/"} className="w-max text-violet-600 text-xl flex cursor-pointer ml-24 -mt-9">{post.user.name}</a>
                <div className="post_content">
                    <h3 className="text-violet-600 w-24 flex ml-10 mt-8 [word-spacing:10px] font-bold">Exercise</h3>
                    <h3 className="text-violet-600 flex [margin-left:480px] -mt-6 [word-spacing:50px] font-bold">Sets Reps</h3>
                    <table>
                    {post.program.exercises.map((exercise) => {
                        //TODO Fix hr inside table
                        return (
                        <tr key={exercise.exercise} >
                            <td className="flex w-24 ml-10 mt-6 [word-spacing:10px]">{exercise.exercise}</td>
                            <td className="flex [margin-left:495px] mt-5 [word-spacing:70px] relative -top-10 font-bold">{exercise.sets} {exercise.reps}</td>
                            <hr className="[width:570px] -mt-8 ml-10 border-y-neutral-200 border-solid border-y"></hr>
                        </tr>
                        )
                    })}
                    </table>
                </div>
                <p>&nbsp;</p>
        </div>
    )
};
