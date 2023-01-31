import React from 'react'
import Link from 'next/link';
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const handleHomeRoute = (e) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <div 
        className={styles.link}
        onClick = {handleHomeRoute}
      >
        Home
      </div>
      <div className={styles.linkContainer}>
        <Link href = '/search'>Search</Link>
      </div>
    </div>
  )
}

export default Header;