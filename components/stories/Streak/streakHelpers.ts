import { currentUser, pocketbase } from "pages/api/connects";

export async function getStreak() {
    const streak = await pocketbase.collection('users').getOne(currentUser!.id, { '$autoCancel': false });
    return streak;
}