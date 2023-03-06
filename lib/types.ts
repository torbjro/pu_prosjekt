export type Post = {
    id: string;
    caption: string;
    program: Program;
    user: User;
}

export type Program = {
    id: string;
    name: string;
    user: User;
    exercises: Exercise[];
}

export type Exercise = {
    exercise: string;
    sets: number;
    reps: number;
}

export type User = {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
}

export type Group = {
    id: string;
    name: string;
    description: string;
    members: string[];
    admins: string[];
}