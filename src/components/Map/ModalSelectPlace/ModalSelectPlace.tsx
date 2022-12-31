import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import useUserAssigned from '../../../hooks/useUserAssigned'
import { getColorPlace } from '../../../utils/colors'
import { Avatar, ListItemAvatar } from '@mui/material'
import Backdrop from '../../commons/backdrop'

const ModalSelectPlace = ({ place, open, handleClose, indexDay }) => {
  const { handleSelectPlace, users, loading } = useUserAssigned({
    place,
    indexDay,
  })

  console.log({ open, users })
  if (!open) return null
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select User</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users?.map((user, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton
              onClick={() => handleSelectPlace(user?.id)}
              key={user?.id}
            >
              <ListItemAvatar>
                <Avatar
                  {...getColorPlace({
                    name: user?.fullName,
                  })}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user?.fullName}
                secondary={`${user?.email}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Backdrop open={loading} />
    </Dialog>
  )
}

export default ModalSelectPlace
