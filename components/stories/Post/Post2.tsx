import { Exercise, Post } from '@/lib/types';
import { Image } from '@chakra-ui/react';
import React from 'react';


interface PostProps {
    post: Post;
}


export const Post2: React.FC<PostProps> = (props) =>{

    const { post } = props;

    const exerciseList = post.expand?.program?.expand?.exercises

    let tags = exerciseList?.flatMap((exercise) => {
        const exerciseTags = [
            exercise.expand?.exercise_ref?.bodypart,
            exercise.expand?.exercise_ref?.type
        ];
        return exerciseTags.filter((tag) => tag);
      });

    // Remove duplicates using Set
    tags = tags ? Array.from(new Set(tags)) : [];

    return(
        <div className="flex flex-col border rounded-2xl border-gray-200 shadow-md px-8 py-4">

            {/* User info */}
            <div className="flex items-center gap-3">
                <a href={`/friends/${post.user}`} className="w-12 h-12 flex rounded-full overflow-hidden"><Image alt='UserImage' src={post.expand.user.avatar ? `http://127.0.0.1:8090/api/files/users/${post.expand.user?.id}/${post.expand.user?.avatar}` : `https://picsum.photos/200`} /></a>
                <a href={`/friends/${post.user}`} className="w-max text-violet-600 text-xl flex cursor-pointer">{post.expand.user.name}: </a>
                <label className='justify-center w-max text-violet-600 text-xl flex cursor-pointer'>
                    {post.caption}
                </label>
            </div>

            {/* Post tags */}
            <div className='flex gap-2 py-3'>
                {tags?.map((tag) => {
                    return (
                        <span key={tag} className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">{tag}</span>
                    )
                })}
            </div>

            <div>
                {/* add space between each row */}
                <table className="w-full border-separate border-spacing-y-4 px-4
                ">
                    <tr className='font-bold text-purple-800 '>
                        <th className="text-left">Exercise</th>
                        <th className="text-center">Sets</th>
                        <th className="text-center">Reps</th>
                    </tr>
                    {post.expand?.program?.expand?.exercises?.map((exercise) => {
                        return (
                        <tr key={exercise.exercise}>
                            {/* add border-t-2 border-gray-200 to each <td> classname to get gray line back */}
                            <td className="text-left">{exercise.exercise}</td>
                            <td className="text-center">{exercise.sets}</td>
                            <td className="text-center">{exercise.reps}</td>
                        </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
};
