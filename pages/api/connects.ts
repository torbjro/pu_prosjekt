import Pocketbase from "pocketbase"

export const pocketbase = new Pocketbase("http://127.0.0.1:8090");

export const currentUser = pocketbase.authStore.model;

export async function authAndReturnUser(username: string, password: string) {
    const user = await pocketbase.collection('users').authWithPassword(username, password);
    return user;
}

export async function registerAndReturnUser(username: string, password: string, passwordConfirm: string) {
    const user = await pocketbase.collection('users').create({ 
        password: password, 
        passwordConfirm: passwordConfirm,
        username: username
    });
    return user;
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


