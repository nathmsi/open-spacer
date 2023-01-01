import { useState } from 'react'
import { Container, ContainerBlank } from './Card.styled'
import ModalSelectPlace from '../ModalSelectPlace/ModalSelectPlace'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { getColorPlace } from '../../../utils/colors'

const Card = ({ index, place, indexDay }) => {
  const [openModalUser, setModalUser] = useState(false)

  if (!place) {
    return <ContainerBlank>{''}</ContainerBlank>
  }
  const { user, maison } = place
  if (!user?.fullName) {
    return (
      <Container onClick={() => setModalUser(true)} haveMaison={maison?.name}>
        <ListItem alignItems="flex-start" sx={{ padding: '0rem 0.6rem' }}>
          <ListItemText
            primary={user?.fullName}
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
      </Container>
    )
  }
  return (
    <Container assigned={user?.fullName} haveMaison={maison?.name}>
      <ListItem alignItems="flex-start" sx={{ padding: '0rem 0.6rem' }}>
        <ListItemAvatar>
          <Avatar
            {...getColorPlace({
              name: user?.fullName,
              numberPlace: index,
              section: 'Dior',
              subSection: 'manager',
            })}
          />
        </ListItemAvatar>
        <ListItemText
          primary={user?.fullName}
          secondary={
            <div style={{ display: 'inline', fontSize: '0.7rem' }}>
              <div>{maison?.name}</div>
            </div>
          }
        />
      </ListItem>
    </Container>
  )
  // return (
  //   <Container assigned={user?.fullName} haveMaison={maison?.name}>
  //     <NumberPlace>
  //       ({index}) {maison?.name}
  //     </NumberPlace>
  //     {user?.fullName && <FullName>{user?.fullName || ''}</FullName>}
  //   </Container>
  // )
}

export default Card
