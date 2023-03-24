import { User } from '@/lib/types';
import { pocketbase, currentUser } from './connects'

export async function followFriend(friendId: string) {
    if (!currentUser) {
        return;
    }
    const user = currentUser;
    await pocketbase.collection('users').update(user.id, {
        friends: [...user.friends, friendId],
    });
}

export async function getFriend(friendId: string) {
    pocketbase.autoCancellation(false);
    const friend = await pocketbase.collection('users').getOne<User>(friendId);
    try {
        return friend;
    } catch (error) {
        console.log(error);
    }
}

export async function unfollowFriend(friendId: string) {
    if (!currentUser) {
        return;
    }
    const user = currentUser;
    await pocketbase.collection('users').update(user.id, {
        friends: user.friends.filter((friend: string) => friend !== friendId),
    });
}

export async function getFriends() {
    pocketbase.autoCancellation(false);
    const friends = await pocketbase.collection('users').getList<User>(1, 100, { filter: `id = '${currentUser?.friends?.join("' || id = '")}'` });
    try {
        return friends.items;
    } catch (error) {
        console.log(error);
    }
}