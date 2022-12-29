import type { NextPage } from 'next';
import styles from '../styles/Home.module.css'
import EditPage from '../src/components/EditPage';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <EditPage  />
    </div>
  )
}

export default Home
