//import { pocketbase } from '@/pages/api/connects';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface Row {
  Exercise: string;
  Sets: number;
  Reps: number;
}

//const router = useRouter();

const user = pocketbase.authStore.model?.id;

function Program() {
  const [rows, setRows] = useState<Row[]>([{ Exercise: '', Sets: 0, Reps: 0}]);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const handleAddRow = () => {
    setRows([...rows, { Exercise: '', Sets: 0, Reps: 0}]);
  };

  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((row, i) => i !== index));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, key: keyof Row) => {
    const { value, type, checked } = event.target;
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index
          ? {
              ...row,
              [key]: type === 'checkbox' ? checked : value,
            }
          : row
      )
    );
  };

  const handleIsPublicChange = () => {
    setIsPublic(!isPublic);
  };

  const handleSave = async () => {
    // creating exercises
    let exercises = [];
    for (var exercise of rows) {
        const exerciseData = {
            "exercise": exercise.Exercise,
            "sets": exercise.Sets,
            "reps": exercise.Reps
        };
        const exerciseRecord = await pocketbase.collection('exercises').create(exerciseData);
        exercises.push(exerciseRecord.id);
    }
    // creating program
    const programData = {
        "name": "MyProgram",
        "user": [
            user
        ],
        "exercises": exercises
    };
    const programRecord = await pocketbase.collection('programs').create(programData);
    // creating post
    const postData = {
        "caption": "My Program",
        "program": programRecord.id,
        "user": user,
        "public": isPublic
    };
    const postRecord = await pocketbase.collection('posts').create(postData);

    // push back to dashboard
    // router.push('/dashboard');
  };

  const handleCancel = () => {
    // send back to dashboard
    // router.push('/dashboard');
  };

  return (
    <div>
        <div className="sm:flex sm:items-start">
            <div className="absolute left-0 flex-shrink-0 lg:static">
                <a href="#">
                    <span className="sr-only">MuscleMates</span>
                    <img
                        className="h-8 w-auto"
                        src="./logo2.svg"
                        alt="MuscleMates"
                    />
                </a>
            </div>
        </div>
      {rows.map((row, index) => (
        <div key={index} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600">
                <label htmlFor="name" className="block text-s font-medium text-gray-900">
                    <input 
                        type="text" 
                        value={row.Exercise} 
                        onChange={(e) => handleInputChange(e, index, 'Exercise')}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Exercise"
                    />
                </label>
            </div>
            <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600">
                <label htmlFor="name" className="block text-s font-medium text-gray-900">
                    <input 
                        type="number"  
                        onChange={(e) => handleInputChange(e, index, 'Sets')}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Sets"
                    />
                </label>
            </div>
            <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600">
                <label htmlFor="name" className="block text-s font-medium text-gray-900">
                    <input 
                        type="number"  
                        onChange={(e) => handleInputChange(e, index, 'Reps')}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Reps"
                    />
                </label>
            </div>
            {rows.length > 1 && (
            <button
                className="inline-flex items-center rounded-md border border-black bg-white px-3 py-2 text-sm font-medium leading-4 text-black shadow-sm hover:bg-slate-200 focus:outline-black focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                onClick={() => handleRemoveRow(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-center mt-3">
        <button
        className="inline-flex items-center rounded-md border border-black bg-white px-3 py-2 text-sm font-medium leading-4 text-black shadow-sm hover:bg-slate-200 focus:outline-black focus:ring-2 focus:ring-violet-500 focus:ring-offset-2" 
        onClick={handleAddRow}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
            Add Exercise
        </button>
      </div>
        <label className='absolute left-0 mt-5'>
            Make Public:
            <input 
                type="checkbox" 
                checked={isPublic} 
                onChange={handleIsPublicChange} 
                className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"/>
        </label>
      <div className="flex justify-end min-h-full p-4 text-center sm:items-center sm:p-0 mt-3">
        <button 
        className="mt-3 inline-flex w-full justif-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm" 
        onClick={handleCancel}>
            Cancel
        </button>
        <button 
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" 
        onClick={handleSave}>
            Save
        </button>
      </div>
    </div>
  );
}

export default Program;
