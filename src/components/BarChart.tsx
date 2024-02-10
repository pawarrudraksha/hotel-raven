import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import data from "../data/data.json";
import styles from "../styles/Charts.module.css"
import { useAppSelector } from '../app/hooks';
import { selectSelectedMonth } from '../features/appSlice';

interface Data {
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

const BarChartComponent: React.FC = () => {
  const [noOfVisitors, setNoOfVisitors] = useState<{ [country: string]: number }>({});

  const month = useAppSelector(selectSelectedMonth)
  useEffect(() => {
    if(month){
      const filteredData = data.filter((item: Data) => item.arrival_date_month === month);
      
      const updatedVisitorsData: { [country: string]: number } = {};
      filteredData.forEach((item: Data) => {
        
        const totalVisitors = item.adults + item.children + item.babies;
        const country = item.country;
        updatedVisitorsData[country] = (updatedVisitorsData[country] || 0) + totalVisitors;
      });
      
      setNoOfVisitors(updatedVisitorsData);
    }
  }, [data,month]);
  

  return (
    <div className={styles.barChartContainer}>
      <h2>No of visitors / Country</h2>
      {Object.keys(noOfVisitors).length > 0 ? (
        <BarChart
          xAxis={[{ scaleType: 'band', data: Object.keys(noOfVisitors) }]}
          series={[{ data: Object.values(noOfVisitors) }]}
          width={500}
          height={300}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default BarChartComponent;
