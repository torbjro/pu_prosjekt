import React, { useEffect, useRef, useState } from "react"
import { FC } from "react"
import router, { useRouter } from "next/router";
import { pocketbase } from '@/pages/api/connects';
import { createPrByExerciseName, getExerciseIdFromName, getNewExercises } from "@/pages/api/prHelpers";
import { setConstantValue } from "typescript";
import { Exercise2 } from "@/lib/types";
  

export function Newpr() {
    const [type, setType] = useState('');
    const [part, setPart] = useState('');
    const [exercises, setExercises] = useState<string[]>();
    const [exercise, setExercise] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const difficulties = ['Intermediate', 'Expert', 'Beginner'];
    const bodyparts: string[] = ['adductors', 'chest', 'forearms', 'hamstrings', 'triceps', 'lats', 'quadriceps', 'treadmill', 'traps', 'neck', 'abductors', 'middle_back', 'glutes', 'lower_back', 'shoulders', 'stationary', 'abdominals', 'calves', 'biceps'];
    const types: string[] = ['Strength', 'Plyometrics', 'Cardio', 'Stretching', 'Powerlifting', 'Strongman', 'Olympic Weightlifting'];


    const user = pocketbase.authStore.model?.id;

    const prValue = useRef(null)

    const onCancel = () => {router.push("/pr");}

    const onRegister = () => {
        getExerciseIdFromName(exercises![Number(exercise)]).then((id) => {
            console.log(id);
            console.log(exercise);
            const givenPr = prValue.current as any
            const data = {
                "exercise": id,
                "value": givenPr.value,
                "user": user
            }
        const pr = pocketbase.collection('pr').create(data);
        })
        router.push('/pr');
    }

    useEffect(() => {
      const fetchExercises = async () => {
        console.log(type)
        console.log(part)
        console.log(difficulty)
        getNewExercises(types[Number(type)], bodyparts[Number(part)], difficulties[Number(difficulty)])
          .then((result) => {
            setExercises(result);
          })
      };
      fetchExercises();
    }, [part, type, difficulty])

    return (

        //Newpr tailwind style
        <form className="grid justify-center text-center items-center">
       {/* <div className="flex items-center border-b border-violet-600 py-2">
            <input name="Exercise" value={input} ref={exerciseName} id="Exercise" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Exercise" aria-label="Full name"></input>*/}
        <div className="flex mb-0 min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                //handleInputChange(e, 'Type');
              }}
              className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
            >
              <option value="">Type</option>
              {types.map((typ, i) => (
                <option key={i} value={i}>
                  {typ}
                </option>
              ))}
            </select>
            <select
                value={part}
                onChange={(e) => {
                  setPart(e.target.value);
                  //handleInputChange(e, 'Bodypart')
                }}
                className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              >
                <option value="">Bodypart</option>
                {bodyparts.map((p, i) => (
                  <option key={i} value={i}>
                    {p}
                  </option>
                ))}
            </select>
            <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  //handleInputChange(e, 'Difficulty');
                }}
                className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              >
                <option value="">Difficulty</option>
                {difficulties.map((p, i) => (
                  <option key={i} value={i}>
                    {p}
                  </option>
                ))}
            </select>
            <select
                value={exercise}
                onChange={(e) => {
                    setExercise(e.target.value);
                }}
                className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              >
                <option value="">Exercise</option>
                {exercises?.map((p, i) => (
                    <option key={i} value={i}>
                      {p}
                    </option>
                ))}
            </select>

        </div>

        <div className="flex items-center border-b border-violet-600 py-2">
            <input 
                name="Value" 
                id="Value" 
                ref={prValue} 
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                type="text" 
                placeholder="kg" 
                aria-label="Full name"
                >
                </input>
        </div>

        <div className="flex justify-center mt-2">
            <button onClick={onRegister} className="flex-shrink-0 bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-sm border-4 text-white py-1 px-2 rounded">
            Register PR
            </button>
            <button onClick={onCancel} className="flex-shrink-0 border-transparent border-4 text-violet-600 hover:text-violet-800 text-sm py-1 px-2 rounded" type="button">
            Cancel
            </button>
        </div>
        </form>
    )

};

export default Newpr
