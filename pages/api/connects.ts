import Pocketbase from "pocketbase"

export const pocketbase = new Pocketbase("http://127.0.0.1:8090");

export const currentUser = pocketbase.authStore.model;

export async function authAndReturnUser(username: string, password: string) {
    const user = await pocketbase.collection('users').authWithPassword(username, password);
    return user;
}


