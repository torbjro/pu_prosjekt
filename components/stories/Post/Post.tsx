import { Input } from '@chakra-ui/react';
import React from 'react';
import './post.css';

interface PostProps {
    name: string;
    exercises: Exercise[]; //bruker interfacet Exercise blir dermed et objekt for hver exercise
    profile_pic_src: string;
    profile_src: string;
}

export interface Exercise {
    navn: string;
    sets: number;
    reps: number;
}

export function Post({exercises, name, profile_src, profile_pic_src}: PostProps) {
    return(
        <div className="post">
            <a href={profile_src} id="p_pic"><img src={profile_pic_src}/></a>
            <a href={profile_src} id="profile_name">{name}</a>
            <div className="post_content">
                <h3 id="exercise">Exercise</h3>
                <h3 id="sets_reps">Sets Reps</h3>
                {exercises.map((exercise) => (
                    <tr key={exercise.navn}>
                        <td className="exercise_name">{exercise.navn}</td>
                        <td className="exercise_sets_reps">{exercise.sets} {exercise.reps}</td>
                        <div id="separation_line"></div>
                    </tr>
                ))}
            </div>
            <p>&nbsp;</p>
        </div>
    )
};