import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import styles from '../styles/Home.module.css';
import { IconButton, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import MealCard from '../components/MealCard';

export default function Search() {
  const [searchVal, setSearchVal] = useState("")
  const [options, setOptions] = useState([])

  const getSearchResults = async () => {
    const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`)).json()
    setOptions(data.meals)
  }

  const enterPressHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      getSearchResults()
    }
  }

  const randomFinder = async () => {
    const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json()
    setOptions(data.meals)
  }

  return (
    <> 
      <Head>
          <title>Search a Meal</title>
        </Head>
        <Header />
        <main className={styles.main}>
        <h3>What are you looking for?</h3>
        <div className={styles.searchbarDiv}>
          <TextField fullWidth
            id = "searchText"
            placeholder='Search...'
            onChange={(event) => {setSearchVal(event.target.value)}}
            onKeyDown={enterPressHandler}
            InputProps= {{
              endAdornment:<IconButton onClick={getSearchResults} ><SearchOutlined /></IconButton>
            }}
          />
          </div>
          <div className={styles.lucky} onClick={randomFinder}>I'm feeling hungry</div>
          <div className={styles.searchResult}>
            {options == null ? <div>No results found</div> : <MealCard meals={options} />}
          </div>
        </main>
    </>
  )
}

