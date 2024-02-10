import React, { useState } from 'react'
import styles from "../styles/sidebar.module.css"
import { Button } from "@mui/material"
import { selectMonth, selectSelectedMonth } from '../features/appSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'


const  Sidebar:React.FC=()=> {
  const month = useAppSelector(selectSelectedMonth)  
  const dispatch=useAppDispatch()  
  const [checkedMonth,setCheckedMonth]=useState<{ [ id:number ] : boolean}>({})
  const months = [
    {id: 1, name: "January"},
    {id: 2, name: "February"},
    {id: 3, name: "March"},
    {id: 4, name: "April"},
    {id: 5, name: "May"},
    {id: 6, name: "June"},
    {id: 7, name: "July"},
    {id: 8, name: "August"},
    {id: 9, name: "September"},
    {id: 10,name: "October"},
    {id: 11,name: "November"},
    {id: 12,name: "December"}
  ]
  const handleCheckboxChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      
      const id=parseInt(e.target.id)
      setCheckedMonth({
        [id]:e.target.checked
      })
      const selectedMonth=months.find((month)=>id===month.id)
      dispatch(selectMonth(selectedMonth?.name))
    } catch (error) {
      console.log(error);
    }
  }  
  return (
    <div className={styles.sidebarContainer}>
        <div className={styles.sidebarHeader}>
            <Button variant="text">Filter</Button>
            {/* <Button variant="text">Report</Button>
            <Button variant="text">Actions</Button> */}
        </div>        
        <div className={styles.sidebarContent}>
          {months.map((month)=>(
            <div key={month.id} className={`${styles.sidebarMonth} ${checkedMonth[month.id] && styles.sidebarActiveCheckbox}`}>
            <input type="checkbox" id={`${month.id}`} onChange={handleCheckboxChanged} checked={checkedMonth[month.id] || false}/>
            <label htmlFor={`${month.id}`}>{month.name}</label>
            </div>
          ))}
         
        </div>
    </div>
  )
}

export default Sidebar