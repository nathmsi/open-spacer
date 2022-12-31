import { useState } from 'react'
import { Container, FullName, NumberPlace } from './Card.styled'
import ModalSelectPlace from '../ModalSelectPlace/ModalSelectPlace'

const Card = ({ index, place, indexDay }) => {
  const [openModalUser, setModalUser] = useState(false)

  if (!place) {
    return <Container>{index}</Container>
  }
  const { user, maison } = place
  if (!user?.fullName) {
    return (
      <Container onClick={() => setModalUser(true)} haveMaison={maison?.name}>
        ({index}) {maison?.name}
        {openModalUser && (
          <ModalSelectPlace
            open={openModalUser}
            place={place}
            handleClose={(event) => {
              event.stopPropagation()
              setModalUser(false)
            }}
            indexDay={indexDay}
          />
        )}
      </Container>
    )
  }
  return (
    <Container assigned={user?.fullName} haveMaison={maison?.name}>
      <NumberPlace>
        ({index}) {maison?.name}
      </NumberPlace>
      {user?.fullName && <FullName>{user?.fullName || ''}</FullName>}
    </Container>
  )
}

export default Card
