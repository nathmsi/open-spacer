import useMap from '../../hooks/useMap'
import Backdrop from '../commons/backdrop'
import Card from './Card/Card'
import Header from './Header/Header'
import { Container, MainContainer } from './index.styled'

const mapSpace = Array.from({ length: 200 }, (v, i) => i)

const Map = () => {
  const {
    placesAssigned,
    usersNotAssigned,
    activeDay,
    loading,

    handleSelectDay,
    handleChangMaison,
    handleRemoveUserAssigned,
    handleCheckMeetingRoom,
  } = useMap()

  return (
    <MainContainer>
      <Header
        active={activeDay}
        handleSelectDay={handleSelectDay}
        handleChangMaison={handleChangMaison}
        usersNotAssigned={usersNotAssigned}
        handleCheckMeetingRoom={handleCheckMeetingRoom}
      />
      <Container>
        {mapSpace.map((card) => (
          <Card
            key={card}
            index={card + 1}
            place={placesAssigned[card + 1]}
            indexDay={activeDay?.indexDay}
            handleRemoveUserAssigned={handleRemoveUserAssigned}
          />
        ))}
      </Container>
      <Backdrop open={loading} />
    </MainContainer>
  )
}

export default Map
