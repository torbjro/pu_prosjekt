import React from 'react';


interface PostProps {
    name?: string;
    exercises: Exercise[]; //bruker interfacet Exercise blir dermed et objekt for hver exercise
    profile_pic_src: string;
    profile_src: string;
    caption?: string;
}

export type Exercise = {
    navn: string;
    sets: number;
    reps: number;
}



export function Post2({exercises, name, profile_src, profile_pic_src, caption}: PostProps) {
    
    return(
        <div className=" border w-[650px] rounded-2xl border-gray-200 mx-auto shadow-md max-w-7xl pr-10">
                <a href={profile_src} className="w-12 h-12 flex mt-4 ml-9 rounded-full overflow-hidden"><img src={profile_pic_src} /></a>
                <a href={profile_src} className="w-max text-violet-600 text-xl flex cursor-pointer ml-24 -mt-9">{name}</a>
                <div className="post_content">
                    <h3 className="text-violet-600 w-24 flex ml-10 mt-8 [word-spacing:10px] font-bold">Exercise</h3>
                    <h3 className="text-violet-600 flex [margin-left:480px] -mt-6 [word-spacing:50px] font-bold">Sets Reps</h3>
                    {exercises.map((exercise) => (
                        <tr key={exercise.navn}>
                            <td className="flex w-24 ml-10 mt-6 [word-spacing:10px]">{exercise.navn}</td>
                            <td className="flex [margin-left:495px] mt-5 [word-spacing:70px] relative -top-10 font-bold">{exercise.sets} {exercise.reps}</td>
                            <div className="[width:570px] -mt-8 ml-10 border-y-neutral-200 border-solid border-y"></div>
                        </tr>
                    ))}
                </div>
                <p>&nbsp;</p>
        </div>
    )
};