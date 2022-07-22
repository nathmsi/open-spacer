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
import { updateEmployee, deleteEmployee } from "../../../utils/firebase";
import Backdrop from "../../commons/backdrop";

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { SECTIONS } from "../../HomePage/ListEmploye/addEmploye";

const EditEmployee = ({ employee, children, editMode }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { id, name, section, subSection, techno } = employee || {};

  const [sectionUpdate, setSection] = React.useState(section);
  const [subSectionUpdate, setSubSection] = React.useState(subSection);
  const [technoUpdate, setTechno] = React.useState(techno);

  const [nameUpdate, setName] = React.useState(name);

  const handleAddPlace = async () => {
    setIsLoading(true);
    await updateEmployee({
      id,
      section: sectionUpdate,
      subSection: subSectionUpdate,
      name: nameUpdate,
      techno: technoUpdate,
    });
    setIsLoading(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteEmploye = async () => {
    setIsLoading(true);
    await deleteEmployee(id);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <div onClick={() => editMode && setOpen(true)} style={{ cursor: editMode ?'pointer' : '' }} className={styles.container} >{children}</div>
      <Backdrop open={isLoading} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Id"
            type="email"
            fullWidth
            variant="standard"
            value={id}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
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
                defaultValue={section}
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
                {SECTIONS[section] &&
                  Object.keys(SECTIONS[section])?.map((section) => (
                    <MenuItem key={section} value={section}>
                      {section}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Techno</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                multiple
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setTechno(
                    typeof value === 'string' ? value.split(',') : value,
                  );
                }}
                input={<OutlinedInput label="Tag" />}
                value={technoUpdate}
                renderValue={(selected) => selected?.join(', ')}
              >
                {SECTIONS[section] &&
                  SECTIONS[section][subSection]?.map((section) => (
                    <MenuItem key={section} value={section}>
                        <Checkbox checked={technoUpdate.indexOf(section) > -1} />
                        <ListItemText primary={section} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDeleteEmploye}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPlace}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditEmployee;
