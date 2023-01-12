import { Container, ContainerMaisonSelector } from './index.style'
import MaisonSelector from '../../Map/Header/MaisonSelector/MaisonSelector'
import AddNewUser from '../../Map/Header/AddNewUser/AddNewUser'

const HeaderUser = ({ handleChangMaison, picklistMaison }) => {
  return (
    <Container>
      <AddNewUser MaisonList={picklistMaison} />
      <ContainerMaisonSelector>
        <MaisonSelector
          handleChangMaison={handleChangMaison}
          picklistMaison={picklistMaison}
        />
      </ContainerMaisonSelector>
    </Container>
  )
}

export default HeaderUser
