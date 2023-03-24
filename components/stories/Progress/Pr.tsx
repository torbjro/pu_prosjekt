import Layout from '@/components/stories/Dashboard/Layout';
import { PR, PrExcercises } from '@/lib/types';
import { getPrValues } from '@/pages/api/prHelpers';
import { Checkbox } from '@mui/material';
import { setProjectAnnotations } from '@storybook/react';
import { useEffect, useState } from 'react';
import { getDatasetAtEvent } from 'react-chartjs-2';
import { Graph } from '../Graph/Graph';

interface PrProps {
    exercise?: PrExcercises
}
const Pr: React.FC<PrProps> = (props) => {
    console.log('initialized component')
    const { exercise } = props;

    const [prs, setPrs] = useState<number[]>([]);
    const [indexes, setIndexes] = useState<number[]>([]);
    const [display, setDisplay] = useState(false);
    
    useEffect(() => {
        getPrValues(exercise).then((numbers: number[]) => {
            setPrs(numbers);
            setDisplay(false);
        });
    }, [exercise]);

    useEffect(() => {
        const length = prs!.length;
        let index = [];
        for (var i = 1; i <= length; i++) {
            index.push(i);
        }
        setIndexes(index);
    }, [prs]);


    return (
        <div className='grid'>
            <div className='flex justify-center'>
                <label className='bg-violet-600 rounded-md pl-1 pr-1 mt-2 mr-2 text-white font-medium'>
                    {exercise?.name}
                </label>
            </div>
            <div className='flex justify-start align-center'>
                <label className='text-violet-600 rounded-md border-black font-medium mt-2 mr-2'>
                    PRs:
                </label>
                {prs?.map((p, index) => (
                <label key={index} className='text-violet-600 rounded-md border-black font-medium mt-2 mr-3'>
                    {p}kg
                </label>
                ))}
            </div>
            <div>
                Display Graph:
                <Checkbox
                    checked={display}
                    onChange={() => setDisplay(!display)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                        "&.Mui-checked": {
                          color: '#8F00FF'
                        }
                      }}
                />
            </div>
            { display && (<Graph exercise_name={exercise!.name} pr_data={prs} dates={indexes} startDisplay={false}/>) }
        </div>
    )
}

export default Pr;