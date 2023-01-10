import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import useUserAssigned from '../../../hooks/useUserAssigned'
import { getColorPlaceMap } from '../../../utils/colors'
import { Avatar, ListItemAvatar } from '@mui/material'
import Backdrop from '../../commons/backdrop'

const ModalSelectPlace = ({
  place,
  open,
  handleClose,
  indexDay,
  indexPlace,
}) => {
  const { handleSelectPlace, users, loading } = useUserAssigned({
    place,
    indexDay,
    index_place: indexPlace,
  })

  const handleClick = async (event, id) => {
    await handleSelectPlace(id)
    handleClose(event)
  }

  console.log({ open, users })
  if (!open) return null
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select User</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users?.map((user, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton
              onClick={(event) => handleClick(event, user?.id)}
              key={user?.id}
            >
              <ListItemAvatar>
                <Avatar
                  {...getColorPlaceMap({
                    name: user?.fullName,
                    role: user?.role?.name,
                    numberPlace: '',
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
