import UserRow from './UserRow'
import { Container } from './index.style'

export default function TableUser({ users, deleteUser }) {
  console.log({ users })
  return (
    <Container>
      {users?.map((user, index) => (
        <UserRow key={index} {...user} deleteUser={deleteUser} />
      ))}
    </Container>
  )
}
