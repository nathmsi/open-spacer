import { useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'

import styles from './index.module.scss'
import ModalSelectUser from './ModalSelectUser/ModalSelectUser'

import { getColorPlace, stringAvatar } from '../../utils/colors'
import ModalUnassigned from './ModalUnassigned'
import ModalRemote from './ModalRemote'
import ModalOff from './ModalOff'

import PlaceEdit from './PlaceEdit'
import { useRouter } from 'next/router'

const MapPlace = ({
  places,
  assignedPlace,
  handleRemovePlaceEmployee,
  daySelected,
  modePlaceEdit,
}) => {
  const [placeSelectUsers, setPlaceSelectUsers] = useState(null)
  const [isOpenModalSelectUser, setIsOpenModalSelectUser] = useState(false)

  const [urlImage, setUrlImage] = useState('')

  const router = useRouter()
  let { editModeOpenSpacer } = router?.query
  editModeOpenSpacer = editModeOpenSpacer === 'true'
  const onCloseModalSelectUser = () => {
    setIsOpenModalSelectUser(false)
  }

  const handleOpenUnassignedModalUser = (numPlace) => {
    setPlaceSelectUsers(numPlace)
    setIsOpenModalSelectUser(true)
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.availablePlace}>
        {/* <span className="content-span">
          <Avatar {...stringAvatar(assignedPlace?.length?.toString())} />
          Assigned
        </span> */}
        <span
          className={styles.contentSpan}
          onDoubleClick={() =>
            setUrlImage((old) =>
              old
                ? ''
                : 'https://media.licdn.com/dms/image/C5603AQHnIHV0IqQ1yQ/profile-displayphoto-shrink_400_400/0/1517452716461?e=1678924800&v=beta&t=dtjhWfOA04rHj2E-j4h5E8CojUNnrzkxT2UQ9iV-wuE'
            )
          }
        >
          <Avatar
            {...stringAvatar(
              (places?.length - assignedPlace?.length)?.toString()
            )}
          />
          Available
        </span>
        <ModalUnassigned
          daySelected={daySelected}
          totalPlace={places?.length}
          assignedCount={assignedPlace?.length}
          editMode={editModeOpenSpacer}
        />
        <ModalRemote
          daySelected={daySelected}
          countUnassigned={places?.length - assignedPlace?.length}
          editMode={editModeOpenSpacer}
        />
        <ModalOff
          daySelected={daySelected}
          countUnassigned={places?.length - assignedPlace?.length}
          editMode={editModeOpenSpacer}
        />
      </div>
      <div className={styles.container}>
        {places?.map(({ numberPlace, section, subSection }, index) => {
          const employeeAssigned = assignedPlace.find(
            (el) => el.place === numberPlace
          )
          const colorPlace = getColorPlace({
            name: name || employeeAssigned?.name,
            numberPlace,
            section,
            subSection,
          })
          return (
            <div
              className={
                Math.floor(index / 4) % 2
                  ? styles.placeElementEven
                  : styles.placeElement
              }
              key={numberPlace}
            >
              <PlaceEdit
                place={{ numberPlace, section, subSection }}
                editMode={modePlaceEdit}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar
                    sx={{
                      cursor:
                        handleRemovePlaceEmployee && employeeAssigned
                          ? 'pointer'
                          : '',
                    }}
                    onClick={() => {
                      if (editModeOpenSpacer) {
                        employeeAssigned && handleRemovePlaceEmployee
                          ? handleRemovePlaceEmployee(employeeAssigned)
                          : handleOpenUnassignedModalUser(numberPlace)
                      } else {
                        return null
                      }
                    }}
                  >
                    <Avatar {...colorPlace} src={urlImage} />
                  </ListItemAvatar>
                  {
                    <ListItemText
                      primary={
                        urlImage ? 'Meir B' : employeeAssigned?.name || ``
                      }
                      secondary={
                        section && (
                          <div>
                            {section} / {subSection}
                          </div>
                        )
                      }
                    />
                  }
                </ListItem>
              </PlaceEdit>
            </div>
          )
        })}
      </div>
      <ModalSelectUser
        daySelected={daySelected}
        open={isOpenModalSelectUser}
        placeNumber={placeSelectUsers}
        onClose={onCloseModalSelectUser}
      />
    </div>
  )
}

export default MapPlace
