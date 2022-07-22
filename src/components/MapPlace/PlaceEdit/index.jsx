import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import styles from "./index.module.scss";
import { addPlace, removePlace } from "../../../utils/firebase";
import Backdrop from "../../commons/backdrop";

import { SECTIONS } from "../../HomePage/ListEmploye/addEmploye";

const PlaceEdit = ({ place, children, editMode }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { numberPlace, section, subSection } = place || {};

  const [sectionUpdate, setSection] = React.useState(section);
  const [subSectionUpdate, setSubSection] = React.useState(subSection);


  const handleAddPlace = async () => {
    setIsLoading(true);
    await addPlace({
      numberPlace,
      section: sectionUpdate,
      subSection: subSectionUpdate,
    });
    setIsLoading(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDeletePlace = async () => {
    setIsLoading(true);
    await removePlace(numberPlace);
    setIsLoading(false);
    setOpen(false);
  };



  return (
    <div>
      <div onClick={() => editMode && setOpen(true)} style={{ cursor: editMode ?'pointer' : '' }}>{children}</div>
      <Backdrop open={isLoading} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Place</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="place numuber"
            type="number"
            fullWidth
            variant="standard"
            value={numberPlace}
            disabled
          />
          <div className={styles.containerSelect}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                defaultValue={section}
                onChange={(e) => {
                  setSection(e.target.value);
                }}
              >
                {Object.keys(SECTIONS)?.map((section) => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                defaultValue={subSection}
                onChange={(e) => {
                  setSubSection(e.target.value);
                }}
              >
                {SECTIONS[sectionUpdate] &&
                  Object.keys(SECTIONS[sectionUpdate])?.map((section) => (
                    <MenuItem key={section} value={section}>
                      {section}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePlace}>Remove</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPlace}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlaceEdit;
