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
import { addEmployee } from "../../../../utils/firebase";
import InputLabel from "@mui/material/InputLabel";

import styles from './index.module.scss';
import { addPlace } from '../../../../utils/firebase';
import Backdrop from '../../../commons/backdrop';

import { SECTIONS } from "../../ListEmploye/addEmploye";
import { v4 as uuidv4 } from 'uuid';

const AddPlace= () => {
  const [open, setOpen] = React.useState(false);
  const [numberPlace, setNumberPlace] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [section, setSection] = React.useState("");
  const [subSection, setSubSection] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPlace = async() => {
    setIsLoading(true);
    await addPlace({
      numberPlace: numberPlace || uuidv4(),
      section,
      subSection
    });
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Place
      </Button>
      <Backdrop open={isLoading} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Place</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="place numuber"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setNumberPlace(e.target.value)}
          />
          <div className={styles.containerSelect}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
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
                onChange={(e) => {
                  setSubSection(e.target.value);
                }}
              >
                {SECTIONS[section] &&
                  Object.keys(SECTIONS[section])?.map((section) => (
                    <MenuItem key={section} value={section}>
                      {section}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPlace}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPlace;
