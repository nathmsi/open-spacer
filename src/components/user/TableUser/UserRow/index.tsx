import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { Action, Container } from './index.style'
import { getColorPlaceMap } from '../../../../utils/colors'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

const UserRow = ({ fullName, email, role, maison, deleteUser, id }) => {
  return (
    <Container>
      <ListItem alignItems="flex-start" sx={{ padding: '0.4rem' }}>
        <ListItemAvatar>
          <Avatar
            {...getColorPlaceMap({
              name: fullName,
              role: role,
              numberPlace: '',
            })}
          />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          secondary={
            <div style={{ display: 'inline', fontSize: '0.7rem' }}>
              <div>
                {maison}/ {role}
              </div>
            </div>
          }
        />
      </ListItem>
      <Action>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => deleteUser({ id })}>
          <DeleteForeverIcon />
        </IconButton>
      </Action>
    </Container>
  )
}

export default UserRow
