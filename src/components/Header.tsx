import styles from "../styles/header.module.css"
import React from 'react'

export default function Header() {
  return (
    <div className={styles.header}>
        Dashboard  <span>/ HotelSaven</span>   
    </div>
  )
}
