import { Container } from './UserNotAssigned.style'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'

const UserNotAssigned = ({ usersNotAssigned }) => {
  return (
    <Container>
      <Button
        variant="outlined"
        // onClick={handleClickOpen}
        startIcon={<EditIcon />}
      >
        Unassigned ({usersNotAssigned?.length})
      </Button>
    </Container>
  )
}

export default UserNotAssigned
