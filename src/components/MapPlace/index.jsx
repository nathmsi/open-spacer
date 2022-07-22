import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

import styles from "./index.module.scss";

import { db } from "../../utils/firebase";

import { stringAvatar } from "../../utils/colors";

import PlaceEdit from "./PlaceEdit";

const MapPlace = ({
  places,
  assignedPlace,
  handleRemovePlaceEmployee,
  editMode,
}) => {
  return (
    <div>
      <div className={styles.container}>
        {places?.map(({ numberPlace, section, subSection }, index) => {
          const employeeAssigned = assignedPlace.find(
            (el) => el.place === numberPlace
          );
          return (
            <div className={Math.floor(index / 4) % 2 ? styles.placeElementEven : styles.placeElement}  key={numberPlace}>
              <PlaceEdit
                place={{ numberPlace, section, subSection }}
                editMode={editMode}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar
                    sx={{ cursor: editMode && employeeAssigned ? "pointer" : ''}}
                    onClick={() =>
                      employeeAssigned && editMode && handleRemovePlaceEmployee(employeeAssigned)
                    }
                  >
                    <Avatar
                      {...stringAvatar(
                        employeeAssigned ? employeeAssigned.name : numberPlace
                      )}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={employeeAssigned?.name || ``}
                    secondary={employeeAssigned?.name && <div></div>}
                  />
                  <div>
                    {section} / {subSection}
                  </div>
                </ListItem>
              </PlaceEdit>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapPlace;
