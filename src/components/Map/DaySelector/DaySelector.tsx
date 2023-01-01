import { Container, ContainerMaisonSelector } from './DaySelector.style'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { day } from '../../../hooks/useMap'
import MaisonSelector from './MaisonSelector/MaisonSelector'

const DaySelector = ({ active, handleSelectDay, handleChangMaison }) => {
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
      <ContainerMaisonSelector>
        <MaisonSelector handleChangMaison={handleChangMaison} />
      </ContainerMaisonSelector>
    </Container>
  )
}

export default DaySelector
