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
import { useState } from 'react'
import RowUpdate from './RowUpdate'

const UserRow = ({
  fullName,
  email,
  role,
  maison,
  deleteUser,
  id,
  maisonsList,
  maison_id,
  userRoleId,
  roleList,
}) => {
  const [rowUpdate, setRowUpdate] = useState(false)

  return rowUpdate ? (
    <Container>
      <RowUpdate
        maisonsList={maisonsList}
        roleList={roleList}
        handleClose={() => setRowUpdate(false)}
        {...{ fullName, email, role, maison_id, userRoleId, id }}
      />
    </Container>
  ) : (
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
          <EditIcon onClick={() => setRowUpdate((old) => !old)} />
        </IconButton>
        <IconButton onClick={() => deleteUser({ id })}>
          <DeleteForeverIcon />
        </IconButton>
      </Action>
    </Container>
  )
}

export default UserRow
