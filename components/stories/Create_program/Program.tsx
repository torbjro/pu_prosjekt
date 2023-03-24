//import { pocketbase } from '@/pages/api/connects';
import { currentUser, pocketbase, updateStreak } from '@/pages/api/connects';
import { getExerciseIdFromName, getNewExercises } from '@/pages/api/prHelpers';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Row {
  Type: string;
  Bodypart: string;
  Difficulty: string;
  Exercises: string[];
  Exercise: string;
  Sets: number;
  Reps: number;
}

//const router = useRouter();

const user = pocketbase.authStore.model?.id;

function Program() {
  const [rows, setRows] = useState<Row[]>([{ Type: '', Bodypart: '', Difficulty: '', Exercises: [''], Exercise: 'Exercise', Sets: 0, Reps: 0}]);
  const [type, setType] = useState('');
  const [part, setPart] = useState('');
  const [exercises, setExercises] = useState<string[]>();
  const [exercise, setExercise] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [name, setName] = useState('My Program');
  const [indRows, setIndRows] = useState(0);

  const difficulties = ['Beginner', 'Intermediate', 'Expert'];
  const bodyparts: string[] = ['adductors', 'chest', 'forearms', 'hamstrings', 'triceps', 'lats', 'quadriceps', 'treadmill', 'traps', 'neck', 'abductors', 'middle_back', 'glutes', 'lower_back', 'shoulders', 'stationary', 'abdominals', 'calves', 'biceps'];
  const types: string[] = ['Strength', 'Plyometrics', 'Cardio', 'Stretching', 'Powerlifting', 'Strongman', 'Olympic Weightlifting'];

  // useEffect(() => {
  //   console.log('useEffect init');
  //   const getExercises = async (type: string, part: string, difficulty: string) => {
  //     getNewExercises(types[Number(type)], bodyparts[Number(part)], difficulties[Number(difficulty)]).then((result) => {
  //       setExercises(result)});
  //   };
  //   getExercises(type, part, difficulty);
  // }, [type, part, difficulty]);

  // useEffect(() => {
  //   console.log('useEffect init');
  //   const getExercises = async () => {
  //     getNewExercises(rows[indRows].Type, rows[indRows].Bodypart, rows[indRows].Difficulty).then((result) => {
  //       setExercises(result)});
  //   };
  //   getExercises();
  // }, [indRows]);

  const handleAddRow = () => {
    setRows([...rows, { Type: '', Bodypart: '', Difficulty: '', Exercises: [''], Exercise: 'Exercise', Sets: 0, Reps: 0}]);
    setIndRows(indRows + 1);
  };

  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((row, i) => i !== index));
    setIndRows(indRows - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number, key: keyof Row) => {
    console.log('handleInputChange: ' + key);
    console.log(event.target.value);
    const { value } = event.target;
  
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index
          ? {
              ...row,
              [key]: value,
            }
          : row
      )
    );
  
    if (key === 'Type' || key === 'Bodypart' || key === 'Difficulty') {
      const updatedRow = {
        ...rows[index],
        [key]: value,
      };
  
      const typeValue = updatedRow.Type === "" ? "" : types[Number(updatedRow.Type)];
      const bodypartValue = updatedRow.Bodypart === "" ? "" : bodyparts[Number(updatedRow.Bodypart)];
      const difficultyValue = updatedRow.Difficulty === "" ? "" : difficulties[Number(updatedRow.Difficulty)];
  
      console.log(typeValue, bodypartValue, difficultyValue);
      getNewExercises(typeValue, bodypartValue, difficultyValue)
        .then((result) => {
          setRows((prevRows) =>
            prevRows.map((row, i) =>
              i === index
                ? {
                    ...row,
                    Exercises: result,
                  }
                : row
            )
          );
        });
    }
  };
  
  
  const handleSave = async () => {
    try {
      await updateStreak();
      console.log('streak updated');
      
      const exercises = await createExercises(rows);
      const programRecord = await createProgram(name, user, exercises);
      await createPost(name, programRecord.id, user);
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Error in handleSave:', error);
    }
  };
  
  const createExercises = async (rows: Row[]) => {
    const exercises = [];
  
    for (const row of rows) {
      const exerciseId = await getExerciseIdFromName(row.Exercises[Number(row.Exercise)]);
      const exerciseData = {
        exercise: row.Exercises[Number(row.Exercise)],
        sets: row.Sets,
        reps: row.Reps,
        exercise_ref: exerciseId,
      };
  
      const exerciseRecord = await pocketbase.collection('exercises').create(exerciseData);
      exercises.push(exerciseRecord.id);
    }
  
    return exercises;
  };
  
  const createProgram = async (name: string, user: string | undefined, exercises: string[]) => {
    const programData = {
      name: name,
      user: [user],
      exercises: exercises,
    };
  
    return await pocketbase.collection('programs').create(programData);
  };
  
  const createPost = async (caption: string, programId: string, user: string | undefined) => {
    const postData = {
      caption: caption,
      program: programId,
      user: user,
    };
  
    return await pocketbase.collection('posts').create(postData);
  };
  
  const handleCancel = () => {
    //send back to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex justify-center mb-5">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3 text-center text-black placeholder-gray-500 border-0 border-b-2 border-gray-300 rounded-md focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600 sm:text-sm"
            placeholder="Name of program"
          />
        </div>
      </div>
      {rows.map((row, index) => (
        <>
            <div key={index} className="flex flex-wrap mb-4 min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {selectField("Type", row.Type, (e) => {
                handleInputChange(e, index, "Type");
                setType(e.target.value);
            }, types)}
            {selectField("Bodypart", row.Bodypart, (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
                handleInputChange(e, index, "Bodypart");
                setPart(e.target.value);
            }, bodyparts)}
            {selectField("Difficulty", row.Difficulty, (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
                handleInputChange(e, index, "Difficulty");
                setDifficulty(e.target.value);
            }, difficulties)}
            {selectField("Exercise", row.Exercise, (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
                handleInputChange(e, index, "Exercise");
            }, row.Exercises)}
            {numberField("Sets", (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e, index, "Sets"))}
            {numberField("Reps", (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e, index, "Reps"))}
            {rows.length > 1 && removeButton(() => handleRemoveRow(index))}
            </div>
            <hr className="border-gray-300 pb-4" />
        </>
      ))}
      <div className="flex justify-center mt-3">
        {addButton(handleAddRow)}
      </div>
      <div className="flex justify-end mt-3 space-x-4">
        {cancelButton(handleCancel)}
        {saveButton(handleSave)}
      </div>
    </div>
  );
  

  



}
const removeButton = (onClick: React.MouseEventHandler<HTMLButtonElement> | undefined) => (
    <button
      onClick={onClick}
      className="px-3 py-2 text-sm font-medium text-black bg-white border border-black rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
      </svg>
    </button>
);
const addButton = (onClick: React.MouseEventHandler<HTMLButtonElement> | undefined) => (
    <button
      onClick={onClick}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-black rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Exercise
    </button>
  );
  
const cancelButton = (onClick: React.MouseEventHandler<HTMLButtonElement> | undefined) => (
<button
    onClick={onClick}
    className="mt-3 inline-flex w-full justify-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
>
    Cancel
</button>
);

const saveButton = (onClick: React.MouseEventHandler<HTMLButtonElement> | undefined) => (
<button
    onClick={onClick}
    className="inline-flex w-full justify-center px-4 py-2 text-base font-medium text-white bg-violet-600 border border-transparent rounded-md shadow-sm hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
>
    Save
</button>
);
const numberField = (placeholder: string | undefined, onChange: React.ChangeEventHandler<HTMLInputElement> | undefined) => (
    <div className="w-full p-2 sm:w-1/6">
      <input
        type="number"
        onChange={onChange}
        className="w-full py-2 text-center text-gray-900 placeholder-gray-500 border-0 border-b-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent sm:text-sm"
        placeholder={placeholder}
      />
    </div>
);

const selectField = (label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined, value: string | number | readonly string[] | undefined, onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined, options: string[]) => (
    <div className="w-full p-2 sm:w-1/3">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
      >
        <option value="">{label}</option>
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
);

export default Program;

//   return (
//     <div>
//         <div className='flex justify-center'>
//             <div className="rounded-md border border-gray-300 px-3 py-3 shadow-sm focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600 mb-5">
//                 <label htmlFor="name" className="block text-s font-medium text-gray-900">
//                     <input 
//                         type="text" 
//                         onChange={(e) => setName(e.target.value)}
//                         className="block w-full border-0 p-0 text-black text-center placeholder-gray-500 focus:ring-0 sm:text-sm"
//                         placeholder="Name of program"
//                     />
//                 </label>
//             </div>
//         </div>
//       {rows.map((row, index) => (
//         <div key={index} className="flex mb-2 min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <select
//               value={row.Type}
//               onChange={(e) => {
//                 handleInputChange(e, index, 'Type');
//                 setType(e.target.value)
//               }}
//               className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
//             >
//               <option value="">Type</option>
//               {types.map((typ, i) => (
//                 <option key={i} value={i}>
//                   {typ}
//                 </option>
//               ))}
//             </select>
//             <select
//                 value={row.Bodypart}
//                 onChange={(e) => {
//                   handleInputChange(e, index, 'Bodypart');
//                   setPart(e.target.value);
//                 }}
//                 className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
//               >
//                 <option value="">Bodypart</option>
//                 {bodyparts.map((p, i) => (
//                   <option key={i} value={i}>
//                     {p}
//                   </option>
//                 ))}
//             </select>
//             <select
//                 value={row.Difficulty}
//                 onChange={(e) => {
//                   handleInputChange(e, index, 'Difficulty');
//                   setDifficulty(e.target.value);
//                 }}
//                 className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
//               >
//                 <option value="">Difficulty</option>
//                 {difficulties.map((p, i) => (
//                   <option key={i} value={i}>
//                     {p}
//                   </option>
//                 ))}
//             </select>
//             <select
//                 value={row.Exercise}
//                 onChange={(e) => {
//                   handleInputChange(e, index, 'Exercise');
//                 }}
//                 className="w-full px-4 py-2 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
//               >
//                 <option value="">Exercise</option>
//                 {row.Exercises?.map((p, i) => (
//                     <option key={i} value={i}>
//                       {p}
//                     </option>
//                 ))}
//             </select>
//             <div className="w-full px-4 py-2.5 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent">
//                 <label htmlFor="name" className="block text-s font-medium text-gray-900">
//                     <input 
//                         type="number"  
//                         onChange={(e) => handleInputChange(e, index, 'Sets')}
//                         className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                         placeholder="Sets"
//                     />
//                 </label>
//             </div>
//             <div className="w-full px-4 py-2.5 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent">
//                 <label htmlFor="name" className="block text-s font-medium text-gray-900">
//                     <input 
//                         type="number"  
//                         onChange={(e) => handleInputChange(e, index, 'Reps')}
//                         className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                         placeholder="Reps"
//                     />
//                 </label>
//             </div>
//             {rows.length > 1 && (
//             <button
//                 className="inline-flex items-center rounded-md border border-black bg-white px-3 py-2 text-sm font-medium leading-4 text-black shadow-sm hover:bg-slate-200 focus:outline-black focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
//                 onClick={() => handleRemoveRow(index)}>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
//                 </svg>
//             </button>
//           )}
//         </div>
//       ))}
//       <div className="flex justify-center mt-3">
//         <button
//         className="inline-flex items-center rounded-md border border-black bg-white px-3 py-2 text-sm font-medium leading-4 text-black shadow-sm hover:bg-slate-200 focus:outline-black focus:ring-2 focus:ring-violet-500 focus:ring-offset-2" 
//         onClick={handleAddRow}>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//         </svg>
//             Add Exercise
//         </button>
//       </div>
//       <div className="flex justify-end min-h-full p-4 text-center sm:items-center sm:p-0 mt-3">
//         <button 
//         className="mt-3 inline-flex w-full justif-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm" 
//         onClick={handleCancel}>
//             Cancel
//         </button>
//         <button 
//         className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" 
//         onClick={handleSave}>
//             Save
//         </button>
//       </div>
//     </div>
//   );
