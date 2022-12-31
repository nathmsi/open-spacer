import { Container, FullName, NumberPlace } from './Card.styled'

const Card = ({ index, place }) => {
  if (!place) {
    return <Container>{index}</Container>
  }
  const { user, maison } = place

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
