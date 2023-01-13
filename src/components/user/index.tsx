import useUserApi from '../../hooks/useUserApi'
import HeaderUserList from './HeaderUserList'
import TableUser from './TableUser'
import { Container } from './index.style'

const UserComponent = () => {
  const { users, maisonsList, handleChangMaison, deleteUser, roleList } =
    useUserApi()

  return (
    <Container>
      <HeaderUserList
        handleChangMaison={handleChangMaison}
        picklistMaison={maisonsList}
      />
      <TableUser
        users={users}
        deleteUser={deleteUser}
        maisonsList={maisonsList}
        roleList={roleList}
      />
    </Container>
  )
}

export default UserComponent
