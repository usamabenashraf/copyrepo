import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'
import { Typography } from '@mui/material';
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header.js'
import MealCard from '../../components/MealCard';

const Category = ({ meals }) => {
  const router = useRouter();
  const {category} = router.query; 

  return (
    <div>
        <Head>
            <title> {category} | Recipes App</title>
            <meta name="description" content="Homepage of the Recipes application" />
        </Head>

        <Header />
        <main className={styles.main}>
          <Typography variant='h3'>Meals</Typography>
          <MealCard meals={meals} />
        </main>

    </div>
  )
}

export async function getStaticPaths() {
  const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')).json();
  const mealCategories = data.categories;

  var categoryPaths = [];
  for (let i = 0; i < mealCategories.length; i++ ) {
    categoryPaths.push({params: {category: mealCategories[i].strCategory}})
  }

  return {
    paths: categoryPaths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`)).json();
  const meals = data.meals;
  
  return {
    props: {
      meals,
    }
  }
}

export default Category;