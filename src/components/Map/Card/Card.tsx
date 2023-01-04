import { useState } from 'react'
import { Container, ContainerBlank } from './Card.styled'
import ModalSelectPlace from '../ModalSelectPlace/ModalSelectPlace'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { getColorPlaceMap } from '../../../utils/colors'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

const isEvenRow = (index) => {
  const number = index.toString()
  if (!number) return false
  if (index < 10) return true
  if (number?.charAt(number.length - 2) % 2 === 0) return true
  return false
}

const Card = ({ index, place, indexDay, handleRemoveUserAssigned }) => {
  const [openModalUser, setModalUser] = useState(false)

  if (!place) {
    return <ContainerBlank>{''}</ContainerBlank>
  }
  const { user, maison } = place
  if (!user?.fullName) {
    return (
      <Container haveMaison={maison?.name} isEvenRow={isEvenRow(index - 1)}>
        <ListItem alignItems="flex-start" sx={{ padding: '0.4rem' }}>
          <ListItemAvatar>
            <Avatar
              {...getColorPlaceMap({
                name: index,
                numberPlace: index,
                role: user?.role?.name,
              })}
            />
          </ListItemAvatar>
          <ListItemText
            primary={index}
            secondary={
              <div style={{ display: 'inline', fontSize: '0.7rem' }}>
                <div>{maison?.name}</div>
              </div>
            }
          />
        </ListItem>
        {openModalUser && (
          <ModalSelectPlace
            open={openModalUser}
            place={place}
            handleClose={(event) => {
              event.stopPropagation()
              setModalUser(false)
            }}
            indexDay={indexDay}
          />
        )}
        <div className="icon-action" onClick={() => setModalUser(true)}>
          <AddCircleOutlineOutlinedIcon />
        </div>
      </Container>
    )
  }
  return (
    <Container
      assigned={user?.fullName}
      haveMaison={maison?.name}
      isEvenRow={isEvenRow(index - 1)}
    >
      <ListItem alignItems="flex-start" sx={{ padding: '0.4rem' }}>
        <ListItemAvatar>
          <Avatar
            {...getColorPlaceMap({
              name: user?.fullName,
              numberPlace: index,
              role: user?.role?.name,
            })}
          />
        </ListItemAvatar>
        <ListItemText
          primary={user?.fullName}
          secondary={
            <div style={{ display: 'inline', fontSize: '0.7rem' }}>
              <div>
                {maison?.name}/ {user?.role?.name}
              </div>
            </div>
          }
        />
      </ListItem>
      <div
        className="icon-action"
        onClick={() => handleRemoveUserAssigned({ indexPlace: index - 1 })}
      >
        <DeleteOutlinedIcon />
      </div>
    </Container>
  )
}

export default Card
