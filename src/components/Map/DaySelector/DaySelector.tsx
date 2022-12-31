import { Container } from './DaySelector.style'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { day } from '../../../hooks/useMap'

const DaySelector = ({ active, handleSelectDay }) => {
  return (
    <Container>
      <ButtonGroup sx={{ margin: '1rem 0' }}>
        {day.map((item, index) => (
          <Button
            key={index}
            variant={
              item.indexDay === active?.indexDay ? 'contained' : 'outlined'
            }
            onClick={() => handleSelectDay(item)}
            sx={{ padding: '0 1rem' }}
          >
            {item?.name}{' '}
          </Button>
        ))}
      </ButtonGroup>
    </Container>
  )
}

export default DaySelector
