import type { NextPage } from 'next';
import styles from '../styles/Home.module.css'
import HomePage from '../src/components/HomePage';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <HomePage />
    </div>
  )
}

export default Home
