//DEPRECATED

export {}


// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { Post2} from './Post2'
// import { Post, Program, User, Exercise } from '@/lib/types';

// export default {
//     title: 'Post',
//     component: Post2,
// }

// const exercise_1: Exercise = {
//     exercise: "Pushups",
//     sets: 3,
//     reps: 12,
// }
// const exercise_2: Exercise = {
//     exercise: "Benkpress",
//     sets: 4,
//     reps: 8,
// }

// const exercise_3: Exercise = {
//     exercise: "Flies",
//     sets: 4,
//     reps: 10,
// }

// const exercise_4: Exercise = {
//     exercise: "Pushups",
//     sets: 3,
//     reps: 12,
// }
// const exercise_5: Exercise = {
//     exercise: "Pushups",
//     sets: 3,
//     reps: 12,
// }
// const exercise_6: Exercise = {
//     exercise: "Pushups",
//     sets: 3,
//     reps: 12,
// }
// const exercise_7: Exercise = {
//     exercise: "Pushups",
//     sets: 3,
//     reps: 12,
// }
// const exercise_8: Exercise = {
//     exercise: "Pushups",
//     sets: 3,
//     reps: 12,
// }
// const exercise_9: Exercise = {
//     exercise: "Pushups",
//     sets: 3,
//     reps: 12,
// }


// export const Default = () => {

//     const user = {
//         id: "2",
//         name: "Pushups",
//         user: {
//             id: "3",
//             name: "John Doe",
//             email: "",
//             avatar: "avatar.png"
//     }} as User

//     const post: Post = {
//         id: "1",
//         caption: "Dette er en caption",
//         program: {
//             id: "2",
//             name: "Pushups",
//             user: {
//                 id: "3",
//                 name: "John Doe",
//                 email: "",
//                 avatar: "avatar.png"
//             } as User,
//             exercises: [exercise_1, exercise_2, exercise_3, exercise_4, exercise_5, exercise_6, exercise_7, exercise_8, exercise_9],

//         } as Program,
//         user: "Test",
//     }
//     return <Post2 
//         post={post}
//             // hvis man legger til mange exercises blir nå posten veldig lang! bør derfor sette en maksgrense når man oppretter et treningsprogram
//         />
// }