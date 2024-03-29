import { useState } from 'react'
import { Container, ContainerBlank, ContainerMeetingRoom } from './Card.styled'
import ModalSelectPlace from '../ModalSelectPlace/ModalSelectPlace'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { getColorPlaceMap } from '../../../utils/colors'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
const isEvenRow = (index) => {
  const number = index.toString()
  if (!number) return false
  if (index < 10) return true
  if (number?.charAt(number.length - 2) % 2 === 0) return true
  return false
}

const Card = ({
  index,
  place,
  indexDay,
  handleRemoveUserAssigned,
  viewOnly = false,
}) => {
  const [openModalUser, setModalUser] = useState(false)
  const { index_x, index_y } = index || {}
  if (!place) {
    return <ContainerBlank>{''}</ContainerBlank>
  }
  const { user, maison, meeting_room } = place
  if (meeting_room?.name) {
    return <ContainerMeetingRoom>{''}</ContainerMeetingRoom>
  }
  if (!user?.fullName) {
    return (
      <Container haveMaison={maison?.name} isEvenRow={isEvenRow(index_x - 1)}>
        <ListItem alignItems="flex-start" sx={{ padding: '0.4rem' }}>
          <ListItemAvatar>
            <Avatar
              {...getColorPlaceMap({
                name: index_x,
                numberPlace: index_x,
                role: user?.role?.name,
              })}
            />
          </ListItemAvatar>
          <ListItemText
            // primary={`(${index_y},${index_x})`}
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
            indexPlace={index}
            handleClose={(event) => {
              event.stopPropagation()
              setModalUser(false)
            }}
            indexDay={indexDay}
          />
        )}
        {!viewOnly && (
          <div className="icon-action" onClick={() => setModalUser(true)}>
            <AddOutlinedIcon />
          </div>
        )}
      </Container>
    )
  }
  return (
    <Container
      assigned={user?.fullName}
      haveMaison={maison?.name}
      isEvenRow={isEvenRow(index_x - 1)}
    >
      <ListItem alignItems="flex-start" sx={{ padding: '0.4rem' }}>
        <ListItemAvatar>
          <Avatar
            {...getColorPlaceMap({
              name: user?.fullName,
              numberPlace: index_x,
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
      {!viewOnly && (
        <div
          className="icon-action"
          onClick={() => handleRemoveUserAssigned({ index_x, index_y })}
        >
          <DeleteOutlinedIcon />
        </div>
      )}
    </Container>
  )
}

export default Card
