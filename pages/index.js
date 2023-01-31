import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Grid, Typography, Card } from '@mui/material'
import Header from '../components/Header.js'

export default function Home( {mealCategories} ) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Meal Categories</title>
        <meta name="description" content="Meal categories you can choose from" />
      </Head>

      <Header />
      <main className={styles.main}>
        <Typography variant='h3' className = {styles.heading} >Meal Categories</Typography>
        <Grid 
        container 
        direction="row" 
        alignItems="center" 
        justifyContent='center' 
        spacing={2} >
          {
            mealCategories.map((category) => 
              <Grid item key={category.idCategory}>
                <Card 
                  variant='outlined' 
                  className = {styles.card}
                  onClick= {(e) => {
                    e.preventDefault();
                    router.push(`/categories/${category.strCategory}`)
                  }}
                >
                  <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item className={styles.imgContainer}>
                      <Image 
                      src = {category.strCategoryThumb} 
                      alt={category.strCategory} 
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant='h5'>
                        {category.strCategory}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )
          }
        </Grid>
      </main>
    </>
  )
}

export async function getStaticProps(){
    const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')).json();
    const mealCategories = data.categories;

    return {
        props: {
            mealCategories,
        }
    }
}
