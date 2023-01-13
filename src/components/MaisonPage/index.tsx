import Backdrop from '../commons/backdrop'
import useMap from '../../hooks/useMap'
import { mapSpace } from '../EditMap/EditMap'
import Card from '../Map/Card/Card'
import Header from '../Map/Header/Header'
import { Container, MainContainer } from './index.style'

const MaisonPageComponent = () => {
  const {
    placesAssigned,
    usersNotAssigned,
    activeDay,
    loading,

    handleSelectDay,
    handleCheckMeetingRoom,
  } = useMap({ allMaison: false })

  return (
    <MainContainer>
      <Header
        active={activeDay}
        handleSelectDay={handleSelectDay}
        usersNotAssigned={usersNotAssigned}
        handleCheckMeetingRoom={handleCheckMeetingRoom}
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
                viewOnly
              />
            )
          })
        })}
      </Container>
      <Backdrop open={loading} />
    </MainContainer>
  )
}

export default MaisonPageComponent
