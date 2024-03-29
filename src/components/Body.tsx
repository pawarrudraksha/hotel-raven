import styles from "../styles/body.module.css"
import React from 'react'
import LineChartComponent from './LineChart'
import BarChartComponent from './BarChart'
import SparkLineChartComponent from './SparkLineChart'

export default function Body() {
  return (
    <div className={styles.body}>
        <div className={styles.bodyChartsSection}>
            <LineChartComponent/>
            <BarChartComponent/>
            <SparkLineChartComponent/>
        </div>
    </div>
  )
}
