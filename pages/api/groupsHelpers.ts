import { Group } from '../types';
import { pocketbase, currentUser } from './connects'

export async function addUserToGroup(userId: string, groupId: string) {
    const group = await pocketbase.collection('groups').getOne(groupId);
    await pocketbase.collection('groups').update(group.id, {
        users: [...group.users, userId],
    });
}

export async function getPostsByGroupId(id: string) {
    const group = await pocketbase.collection('groups').getOne(`${id}`);

    const members = await pocketbase.collection('users').getList(1, 20, { filter: `id = '${group?.members.join("' || id = '")}'` });
    const posts = await pocketbase.collection('posts').getList(1, 20, { filter: `user = '${members?.items.map((member) => member.id).join("' || user = '")}'` });
    return posts;
}

export async function getGroupById(id: string) {
    try {
        const group = await pocketbase.collection('groups').getOne<Group>(`${id}`);
        return group;
    } catch (error) { 
        console.log(error);
    }
}

export async function getGroups() {
    const groups = await pocketbase.collection('groups').getFullList<Group>(undefined, { '$autoCancel': false });
    return groups;
}

export async function isUserInGroup(groupId: string) {
    const group = await pocketbase.collection('groups').getOne<Group>(`${groupId}`, { '$autoCancel': false });
    const members = group.members;
    members.forEach((member) => {
        if (member === currentUser?.id) {
            return true;
        }
    });

    return false
}

export async function joinGroupById(groupId: string) {    
    pocketbase.autoCancellation(false);
    const group = await pocketbase.collection('groups').getOne<Group>(`${groupId}`, { '$autoCancel': false });
    const members = group.members;
    await pocketbase.collection('groups').update(groupId, { members: [...members, currentUser?.id] });
}



export async function leaveGroupById(groupId: string) {
    pocketbase.autoCancellation(false);
    const group = await pocketbase.collection('groups').getOne<Group>(`${groupId}`, { '$autoCancel': false });
    const members = group.members;
    await pocketbase.collection('groups').update(groupId, { members: members.filter((member) => member !== currentUser?.id)});
}

export async function deleteGroupById(groupId: string) {
    await pocketbase.collection('groups').delete(groupId);
}

export async function createGroup(name: string, description: string) {
    const res = await pocketbase.collection('groups').create(
        {
            "name": name,
            "description": description,
            "members": [currentUser?.id],
            "admins": [currentUser?.id],
        })
}