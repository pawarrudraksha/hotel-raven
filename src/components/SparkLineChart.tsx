import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import data from "../data/data.json";
import styles from "../styles/Charts.module.css"
import { useAppSelector } from '../app/hooks';
import { selectSelectedMonth } from '../features/appSlice';


interface Data{
  hotel:string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}
    

const SparkLineChartComponent:React.FC=()=> {
  const [visitorsByDay, setVisitorsByDay] = useState<{ [day: number]: { adults: number; children: number } }>({});
  const [totalAdults,setTotalAdults]=useState<number>(0)
  const [totalChildren,setTotalChildren]=useState<number>(0)
  const month = useAppSelector(selectSelectedMonth)
  useEffect(() => {
    if(month){

      const filteredData = data.filter((item: Data) => item.arrival_date_month === month);
      const updatedVisitorsData: { [day: number]: { adults: number; children: number } } = {};
      
      filteredData.forEach((item: Data) => {
        const day = item.arrival_date_day_of_month;
        if (!updatedVisitorsData[day]) {
          updatedVisitorsData[day] = { adults: 0, children: 0 };
        }
        updatedVisitorsData[day].adults = (updatedVisitorsData[day].adults || 0) + item.adults;
        updatedVisitorsData[day].children = (updatedVisitorsData[day].children || 0) + item.children;
      });
      
      setVisitorsByDay(updatedVisitorsData);
    }
    }, [data,month]);
  const adultValues = Object.values(visitorsByDay).map(obj => {
    const [[, firstValue], [, secondValue]] = Object.entries(obj);
    return firstValue;
  });

  const childrenValues = Object.values(visitorsByDay).map(obj => {
    const [[, firstValue], [, secondValue]] = Object.entries(obj);
    return secondValue;
  }); 
  
  return (
    <div className={styles.sparkLineChartContainer}>
      <div className={styles.sparkLineAdultChartContainer}>
        <h2>Adult visitors in {month}</h2>
        <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart data={adultValues} height={300} width={500} />
        </Box>
      </div>
      <div className={styles.sparkLineChildrenChartContainer}>
        <h2>Children visitors in {month}</h2>
        <Box sx={{ flexGrow: 1 }}>
          
        <SparkLineChart data={childrenValues} height={300} width={500}/>
        </Box>
      </div>
    </div>
  )
}


export default SparkLineChartComponent