import { Exercise2, PR, PrExcercises } from "@/lib/types";
import { currentUser, pocketbase } from "./connects";

export async function createPrByExerciseName(exercise: string, value: number) {
    const exerciseTemp = await pocketbase.collection('exercises').getList(1, 1, {filter: `exercise = "${"123456"}"`})
    await pocketbase.collection('pr').create({
        user: currentUser?.id,
        exercise: exerciseTemp.items[0].id,
        value: value
    })
    console.log(exerciseTemp.items)
    
}

export async function getNewExercises(type: string, bodypart: string, difficulty: string) {
  let filterString = "";

  if (type !== "") {
    filterString += `type='${type}'`;
  }

  if (bodypart !== "") {
    filterString += filterString !== "" ? ` && bodypart='${bodypart}'` : `bodypart='${bodypart}'`;
  }

  if (difficulty !== "") {
    filterString += filterString !== "" ? ` && difficulty='${difficulty}'` : `difficulty='${difficulty}'`;
  }

  if (filterString === "") {
    return ['Choose type, bodypart, and difficulty first'];
  }

  const records = await pocketbase.collection('exercises2').getList<Exercise2>(1, 1000, { filter: filterString });
  const exerciseNames = records.items.map((e) => e.title);

  return exerciseNames;
}

export async function getExerciseIdFromName(name: string) {
    const exercise = await pocketbase.collection('exercises2').getFirstListItem<Exercise2>(`title = "${name}"`);
    // console.log('function. exerciseId: ' + exercise.id);
    return exercise.id;
}

export async function getPrs(userId: string) {
    const pr = await pocketbase.collection('pr').getFullList<PR>(undefined, { filter: `user = "${userId}"` });
    return pr;
}

export async function addPr(userId: string, exerciseId: string, value: number) {
    const data = {
        "user": userId,
        "exercise": exerciseId,
        "value": value
    };
    const pr = await pocketbase.collection('pr').create(data);
    return pr;
}

// gets exercise names of PRs without duplicates
export async function getExerciseNamesFromPrs(userId: string) {
    const prs = await getPrs(userId);
    let prExercises: PrExcercises[] = [];
    let temporaryExercises: string[] = []
    console.log(prs);
    for (let i = 0; prs.length>i; i++) {
        const exerciseId = prs[i].exercise;
        const exercise = await pocketbase.collection('exercises2').getOne<Exercise2>(exerciseId);
        const exerciseInfo: PrExcercises = {
            "id": exerciseId,
            "name": exercise.title
        };
        if (!temporaryExercises.includes(exerciseId)) {
            prExercises.push(exerciseInfo);
            temporaryExercises.push(exerciseId);
        }
    }
    console.log(prExercises);
    return prExercises;
}

// get an array with number values for a PR (ascending order)
export async function getPrValues(exercise: PrExcercises | undefined) {
    if (exercise != undefined) {
        const prs = await pocketbase.collection('pr').getFullList<PR>(undefined, { filter: `exercise = "${exercise?.id}" && user = "${currentUser?.id}"`});
        console.log(prs);
        let prValues: number[] = [];
        for (let i = 0; prs.length>i; i++) {
            const value = prs[i]?.value;
            prValues.push(value);
        }
        prValues = prValues.sort((n1, n2) => n1 - n2);
        return prValues;
        }
    return [];
}

export async function getExercisesById(id: string) {
    const exercise = pocketbase.collection('exercises').getOne(`${id}`);
    return exercise;
}