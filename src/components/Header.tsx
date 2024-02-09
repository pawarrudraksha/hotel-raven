import { Button } from "@mui/material"
import styles from "../styles/header.module.css"
import React from 'react'

export default function Header() {
  return (
    <div className={styles.header}>
    <div className={styles.headerLeft}>
        Dashboard  <span>/ HotelSaven</span>
    </div>
    <div className={styles.headerRight}>
        <Button variant="text">Filter</Button>
        <Button variant="text">Report</Button>
        <Button variant="text">Actions</Button>
    </div>
    </div>
  )
}
