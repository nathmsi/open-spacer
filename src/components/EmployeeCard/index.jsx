import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ref, onValue, set, get } from "firebase/database";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import IconButton from "@mui/material/IconButton";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import styles from "./index.module.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { stringAvatar } from "../../utils/colors";
import EditEmployee from "./EditEmployee";

const EmployeeCard = ({
  employee,
  handleChangePlace,
  places,
  placesInUse,
  handleRemoteEmployee,
  editMode
}) => {
  return (
    <div className={editMode ? styles.container : ''}>
      {employee?.map(({ name, id, section, subSection, techno, ...rest }) => (
        <EditEmployee
          key={id}
          employee={{ name, id, section, subSection, techno, ...rest }}
          editMode={editMode}
        >
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <div className={styles.actions}>
                {handleChangePlace && (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Place</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      onChange={(e) =>
                        handleChangePlace &&
                        handleChangePlace({ name, id, place: e.target.value })
                      }
                    >
                      {places
                        ?.filter((el) => !placesInUse.includes(el))
                        ?.map((place) => (
                          <MenuItem key={place} value={place}>
                            {place}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
                {handleRemoteEmployee && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                      handleRemoteEmployee && handleRemoteEmployee({ name, id })
                    }
                  >
                    <HomeOutlinedIcon />
                  </IconButton>
                )}
              </div>
            }
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(name)} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <div
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {/* <div>id : {id} </div> */}
                  <div> {section} / {subSection} </div>
                  <div>techno: {techno}</div>
                </div>
              }
            />
          </ListItem>
        </EditEmployee>
      ))}
    </div>
  );
};

export default EmployeeCard;
