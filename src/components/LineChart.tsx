import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import data from "../data/data.json";

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

const LineChartComponent: React.FC = () => {
  const [noOfVisitorsData, setNoOfVisitorsData] = useState<{ [day: number]: number }>({});

  useEffect(() => {
    const augustData = data.filter((item: Data) => item.arrival_date_month === "August");
    const updatedVisitorsData: { [day: number]: number } = {};
    augustData.forEach((item: Data) => {
      const totalVisitors = item.adults + item.children + item.babies;
      const dayOfMonth = item.arrival_date_day_of_month;
      updatedVisitorsData[dayOfMonth] = (updatedVisitorsData[dayOfMonth] || 0) + totalVisitors;
    });
    setNoOfVisitorsData(updatedVisitorsData)
  }, [data]);   
  
  return (
    <div className="lineChartContainer">
      <LineChart
        xAxis={[{ data: Object.keys(noOfVisitorsData).map(Number) }]} //date
        series={[
          {
            data: Object.values(noOfVisitorsData),
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default LineChartComponent;
