import useUserApi from '../../hooks/useUserApi'
import HeaderUserList from './HeaderUserList'
import TableUser from './TableUser'
import { Container } from './index.style'

const UserComponent = () => {
  const { users, maisonsList, handleChangMaison, deleteUser } = useUserApi()

  return (
    <Container>
      <HeaderUserList
        handleChangMaison={handleChangMaison}
        picklistMaison={maisonsList}
      />
      <TableUser users={users} deleteUser={deleteUser} />
    </Container>
  )
}

export default UserComponent
