export type Post = {
    id: string;
    caption: string;
    user: string;
    tags: string[];
    created: string;
    expand: {
        program: {
            id: string;
            name: string;
            user: {
                id: string;
                name?: string;
                email?: string;
                avatar?: string;
                friends?: string[];
            };
            expand: {
                exercises: {
                    id: string;
                    exercise: string;
                    sets: number;
                    reps: number;
                    expand: {
                        exercise_ref: {
                            id: string;
                            title: string;
                            bodypart: "adductors" | "chest" | "forearms" | "hamstrings" | "triceps" | "lats" | "quadriceps" | "treadmill" | "traps" | "neck" | "abductors" | "middle_back" | "glutes" | "lower_back" | "shoulders" | "stationary" | "abdominals" | "calves" | "biceps";
                            difficulty: "Intermediate" |"Expert" | "Beginner";
                            description: string;
                            type: "Strength" | "Plyometrics" | "Cardio" | "Stretching" | "Powerlifting" | "Strongman" | "Olympic Weightlifting";
                        }
                    }
                }[]
            }
        }
        user: {
            id: string;
            name?: string;
            email?: string;
            avatar?: string;
            friends?: string[];
        }
    }
}

export type Picture = {
    id: string;
    progressPicture: File;
    user: string;
}

export type Program = {
    id: string;
    name: string;
    user: User;
    exercises: 
        {
            exercise: string;
            sets: number;
            reps: number;
        }[]
}

export type Exercise = {
    exercise: string;
    sets: number;
    reps: number;
}

export type ExerciseRef = {
    id: string;
    title: string;
    bodypart: "adductors" | "chest" | "forearms" | "hamstrings" | "triceps" | "lats" | "quadriceps" | "treadmill" | "traps" | "neck" | "abductors" | "middle_back" | "glutes" | "lower_back" | "shoulders" | "stationary" | "abdominals" | "calves" | "biceps";
    difficulty: "Intermediate" |"Expert" | "Beginner";
    description: string;
    type: "Strength" | "Plyometrics" | "Cardio" | "Stretching" | "Powerlifting" | "Strongman" | "Olympic Weightlifting";
}


export type User = {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
    friends?: string[];
    streak: number;
    pictures: string[];
    last_login: string;
}

export type ExpandedUser = {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
    friends?: string[];
    expand: {
        posts: Post[];
    }
}

export type Group = {
    id: string;
    name: string;
    description: string;
    members: string[];
    admins: string[];
}

export type Exercise2 = {
    id: string;
    title: string;
    bodypart: string;
    description: string;
    type: string;
    difficulty: string;
}

export type PR = {
    id: string;
    user: string;
    exercise: string;
    value: number;
}

export type PrExcercises = {
    id: string,
    name: string
}
