import { Container, ContainerMaisonSelector } from './Header.style'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { day } from '../../../hooks/useMap'
import MaisonSelector from './MaisonSelector/MaisonSelector'

const Header = ({ active, handleSelectDay, handleChangMaison }) => {
  return (
    <Container>
      <ButtonGroup sx={{ margin: '1rem 0', gap: '0.8rem' }}>
        {day.map((item, index) => (
          <Button
            key={index}
            variant={
              item.indexDay === active?.indexDay ? 'contained' : 'outlined'
            }
            onClick={() => handleSelectDay(item)}
            sx={{
              padding: '0.7rem',
              borderColor: '#ebebeb',
              borderRadius: '0',
            }}
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

export default Header
