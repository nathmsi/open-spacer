import useMap from '../../hooks/useMap'
import { mapSpace } from '../EditMap/EditMap'
import Backdrop from '../commons/backdrop'
import Card from './Card/Card'
import Header from './Header/Header'
import { Container, MainContainer } from './index.styled'

const Map = () => {
  const {
    placesAssigned,
    usersNotAssigned,
    activeDay,
    loading,
    picklistMaison,

    handleSelectDay,
    handleChangMaison,
    handleRemoveUserAssigned,
    handleCheckMeetingRoom,
  } = useMap({ allMaison: false })

  return (
    <MainContainer>
      <Header
        active={activeDay}
        handleSelectDay={handleSelectDay}
        handleChangMaison={handleChangMaison}
        usersNotAssigned={usersNotAssigned}
        handleCheckMeetingRoom={handleCheckMeetingRoom}
        picklistMaison={picklistMaison}
      />
      <Container lengthPerRow={20}>
        {mapSpace?.map((row, index_y) => {
          return row.map((column, index_x) => {
            return (
              <Card
                key={index_x}
                index={{ index_x, index_y }}
                place={placesAssigned?.[index_y]?.[index_x]}
                indexDay={activeDay?.indexDay}
                handleRemoveUserAssigned={handleRemoveUserAssigned}
              />
            )
          })
        })}
      </Container>
      <Backdrop open={loading} />
    </MainContainer>
  )
}

export default Map
