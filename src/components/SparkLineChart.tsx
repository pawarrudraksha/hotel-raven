import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import data from "../data/data.json";


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

  useEffect(() => {
    const augustData = data.filter((item: Data) => item.arrival_date_month === "August");
    const updatedVisitorsData: { [day: number]: { adults: number; children: number } } = {};
    
    augustData.forEach((item: Data) => {
      const day = item.arrival_date_day_of_month;
      if (!updatedVisitorsData[day]) {
        updatedVisitorsData[day] = { adults: 0, children: 0 };
      }
      updatedVisitorsData[day].adults = (updatedVisitorsData[day].adults || 0) + item.adults;
      updatedVisitorsData[day].children = (updatedVisitorsData[day].children || 0) + item.children;
    });

    setVisitorsByDay(updatedVisitorsData);
  }, [data]);
  const firstValues = Object.values(visitorsByDay).map(obj => {
    const [[, firstValue], [, secondValue]] = Object.entries(obj);
    return firstValue;
  });

  const secondValues = Object.values(visitorsByDay).map(obj => {
    const [[, firstValue], [, secondValue]] = Object.entries(obj);
    return secondValue;
  }); 
 console.log(visitorsByDay);
 console.log(secondValues);
  
  return (
    <div className="sparkLineChartContainer">
      <div className="sparkLineAdultChartContainer">
        <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart data={firstValues} height={100} />
        </Box>
      </div>
      <div className="sparkLineChildrenChartContainer">
        <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart data={secondValues} height={100} />
        </Box>
      </div>
    </div>
  )
}


export default SparkLineChartComponent