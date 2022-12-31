import useMap from '../../hooks/useMap'
import Card from './Card/Card'
import { Container } from './index.styled'

const mapSpace = Array.from({ length: 200 }, (v, i) => i)

const Map = () => {
  const { placesAssigned } = useMap()
  console.log(placesAssigned)
  return (
    <Container>
      {mapSpace.map((card) => (
        <Card key={card} index={card + 1} place={placesAssigned[card + 1]} />
      ))}
    </Container>
  )
}

export default Map
