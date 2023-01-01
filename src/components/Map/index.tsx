import useMap from '../../hooks/useMap'
import Backdrop from '../commons/backdrop'
import Card from './Card/Card'
import DaySelector from './DaySelector/DaySelector'
import { Container, MainContainer } from './index.styled'

const mapSpace = Array.from({ length: 200 }, (v, i) => i)

const Map = () => {
  const {
    placesAssigned,
    handleSelectDay,
    handleChangMaison,
    activeDay,
    loading,
  } = useMap()

  return (
    <MainContainer>
      <DaySelector
        active={activeDay}
        handleSelectDay={handleSelectDay}
        handleChangMaison={handleChangMaison}
      />
      <Container>
        {mapSpace.map((card) => (
          <Card
            key={card}
            index={card + 1}
            place={placesAssigned[card + 1]}
            indexDay={activeDay?.indexDay}
          />
        ))}
      </Container>
      <Backdrop open={loading} />
    </MainContainer>
  )
}

export default Map
