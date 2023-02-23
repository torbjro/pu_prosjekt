import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Post, Exercise } from './Post'

export default {
    title: 'Post',
    component: Post,
}


export const Default = () => {
    return <Post 
            // hvis man legger til mange exercises blir nå posten veldig lang! bør derfor sette en maksgrense når man oppretter et treningsprogram
            exercises={[exercise_1, exercise_2, exercise_3, exercise_4, exercise_5, exercise_6, exercise_7, exercise_8, exercise_9]}
            name='Marcus Johansen' 
            profile_src='/'
            profile_pic_src='https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png'
        />
}

// exempel øvelser som taes inn over
const exercise_1: Exercise = {
    navn: "Pushups",
    sets: 3,
    reps: 12,
}
const exercise_2: Exercise = {
    navn: "Benkpress",
    sets: 4,
    reps: 8,
}

const exercise_3: Exercise = {
    navn: "Flies",
    sets: 4,
    reps: 10,
}

const exercise_4: Exercise = {
    navn: "Pushups",
    sets: 3,
    reps: 12,
}
const exercise_5: Exercise = {
    navn: "Pushups",
    sets: 3,
    reps: 12,
}
const exercise_6: Exercise = {
    navn: "Pushups",
    sets: 3,
    reps: 12,
}
const exercise_7: Exercise = {
    navn: "Pushups",
    sets: 3,
    reps: 12,
}
const exercise_8: Exercise = {
    navn: "Pushups",
    sets: 3,
    reps: 12,
}
const exercise_9: Exercise = {
    navn: "Pushups",
    sets: 3,
    reps: 12,
}