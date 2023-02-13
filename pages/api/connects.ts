import Pocketbase from "pocketbase"

export const pocketbase = new Pocketbase("http://127.0.0.1:8090");

export const currentUser = pocketbase.authStore.model;

export async function authAndReturnUser(username: string, password: string) {
    const user = await pocketbase.collection('users').authWithPassword(username, password);
    return user;
}

export async function registerUser(username: string, email: string, password: string, passwordConfirm: string, name: string) {
    const data = {
        "username": JSON.stringify(username),
        "email": JSON.stringify(email),
        "emailvisibility": "true",
        "password": JSON.stringify(password),
        "passwordConfim": JSON.stringify(passwordConfirm),
        "name": JSON.stringify(name),
        "posts": [
            
        ],
        "programs": [

        ]
    };
    const newUser = await pocketbase.collection('users').create(data);
    return newUser;
}

export async function deleteUser(userId: string) {
    await pocketbase.collection('users').delete(userId);
}

export async function createProgram(userId:string, exercises:string, name:string) {
    const data = {
        "name": JSON.stringify(name),
        "user": [
            JSON.stringify(userId)
        ],
        "exercises": JSON.stringify(exercises)
    };
    const program = await pocketbase.collection('programs').create(data);
    return program;
}

export async function deleteProgram(programId: string) {
    await pocketbase.collection('programs').delete(programId);
}

export async function createPost(caption: string, programId: string, userId: string){
    const data = {
        "caption": JSON.stringify(caption),
        "program": JSON.stringify(programId),
        "user": JSON.stringify(userId)
    };
    const post = await pocketbase.collection('posts').create(data);
    return post;
}

export async function deletePost(postId: string) {
    await pocketbase.collection('posts').delete(postId);
}

export async function isAuthenticated() {
    return pocketbase.authStore.isValid;
}

export async function logout() {
    pocketbase.authStore.clear();
}

export async function getUser() {
    return pocketbase.authStore.model;
}


