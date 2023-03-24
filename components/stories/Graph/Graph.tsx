import { Exercise, Post } from '@/lib/types';
import React, { useEffect } from 'react';
import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import { Checkbox } from '@mui/material';
ChartJS.register(
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler
  )


interface GraphProps {
  exercise_name: string,
  pr_data: number[],
  dates: number[],
  startDisplay: boolean
}


export const Graph: React.FC<GraphProps> = (props) => {

  const { exercise_name, pr_data, dates, startDisplay} = props;

  const [data, setData]= useState({
      labels: dates,
      datasets:[
        {
          label: exercise_name,
          data: pr_data,
          borderColor:'#7c3aed',
          tension:0,
          fill:true,
          pointStyle:'rect',
          pointBorderColor:'black',
          pointBackgroundColor:'#fff',
          showLine:true
        }
      ]
    });

  useEffect(() => {
    setData({
      labels: dates,
      datasets:[
        {
          label: exercise_name,
          data: pr_data,
          borderColor:'#7c3aed',
          tension:0,
          fill:true,
          pointStyle:'rect',
          pointBorderColor:'black',
          pointBackgroundColor:'#fff',
          showLine:true
        }
      ]
    })
  }, [])

  console.log(exercise_name);
  console.log(pr_data);
  console.log(dates);

  return(
    <div>
      <Line data={data}>Hello</Line>
    </div>
  )
};
