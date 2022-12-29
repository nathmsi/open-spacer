import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

import styles from "./index.module.scss";
import ModalSelectUser from "./ModalSelectUser/ModalSelectUser";

import { db } from "../../utils/firebase";

import { getColorPlace, stringAvatar } from "../../utils/colors";
import ModalUnassigned from "./ModalUnassigned";
import ModalRemote from "./ModalRemote";
import ModalOff from "./ModalOff";

import PlaceEdit from "./PlaceEdit";

const MapPlace = ({
  places,
  assignedPlace,
  handleRemovePlaceEmployee,
  editMode,
  daySelected,
}) => {
  const [placeSelectUsers, setPlaceSelectUsers] = useState(null);
  const [isOpenModalSelectUser, setIsOpenModalSelectUser] = useState(false);

  const onCloseModalSelectUser = () => {
    setIsOpenModalSelectUser(false);
  };

  const handleOpenUnassignedModalUser = (numPlace) => {
    setPlaceSelectUsers(numPlace)
    setIsOpenModalSelectUser(true)
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.availablePlace}>
        {/* <span className="content-span">
          <Avatar
            {...stringAvatar(
              (assignedPlace?.length)?.toString()
            )}
          />
          Assigned
        </span> */}
        <span className={styles.contentSpan}>
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
        />
        <ModalRemote
          daySelected={daySelected}
          countUnassigned={places?.length - assignedPlace?.length}
        />
        <ModalOff
          daySelected={daySelected}
          countUnassigned={places?.length - assignedPlace?.length}
        />
      </div>
      <div className={styles.container}>
        {places?.map(({ numberPlace, section, subSection }, index) => {
          const employeeAssigned = assignedPlace.find(
            (el) => el.place === numberPlace
          );
          const colorPlace = getColorPlace({
            name: employeeAssigned?.name,
            numberPlace,
            section,
            subSection,
          });
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
                editMode={editMode}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar
                    sx={{
                      cursor:
                        handleRemovePlaceEmployee && employeeAssigned
                          ? "pointer"
                          : "",
                    }}
                    onClick={() =>
                      employeeAssigned && handleRemovePlaceEmployee
                        ? handleRemovePlaceEmployee(employeeAssigned)
                        : handleOpenUnassignedModalUser(numberPlace)
                    }
                  >
                    <Avatar {...colorPlace} />
                  </ListItemAvatar>
                  {employeeAssigned?.name && (
                    <ListItemText
                      primary={employeeAssigned?.name || ``}
                      secondary={
                        section && (
                          <div>
                            {section} / {subSection}
                          </div>
                        )
                      }
                    />
                  )}
                </ListItem>
              </PlaceEdit>
            </div>
          );
        })}
      </div>
      <ModalSelectUser
        daySelected={daySelected}
        open={isOpenModalSelectUser}
        placeNumber={placeSelectUsers}
        onClose={onCloseModalSelectUser}
      />
    </div>
  );
};

export default MapPlace;
