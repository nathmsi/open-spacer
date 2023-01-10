import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import styles from './index.module.scss'
import { getDayNumber } from '../../../hooks/useMap'

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

const DaySelector = ({ handleSelectDay }) => {
  const [active, setIsactive] = React.useState(getDayNumber() - 1 || 1)

  React.useEffect(() => {
    handleSelectDay(day[0])
  }, [])

  const handleClick = (index) => {
    setIsactive(index)
    handleSelectDay(day[index])
  }

  return (
    <div className={styles.listDay}>
      <ButtonGroup variant="contained" className={styles.buttonGroup}>
        {day.map((item, index) => (
          <Button
            key={index}
            variant={index === active ? 'contained' : 'outlined'}
            onClick={() => handleClick(index)}
            className={styles.button}
          >
            {item}{' '}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default DaySelector
