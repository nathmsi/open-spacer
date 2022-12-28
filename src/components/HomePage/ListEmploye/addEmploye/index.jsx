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
import { addEmployee, deleteEmployee } from "../../../../utils/firebase";
import Backdrop from "../../../commons/backdrop";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import styles from "./index.module.scss";
import { v4 as uuidv4 } from 'uuid';

export const SECTIONS = {
  dior: {
    // WeChat: ["Front", "Back", "SalesForce", "TechLead", "PM"],
    // STAR: ["IOS", "Qa", "SalesForce", "TechLead", "PM"],
    // NOVA: ["SalesForce", "Front", "TechLead", "PM"],
    // UberLuxury: ["SalesForce", "Qa", "TechLead", "PM"],
    ios: 'IOS',
    sf: 'SF',
    Manager: 'MANAGER',
    Wechat: 'WECHAT'
  },
  'Eden Gallery': {
    ios: 'IOS',
    sf: 'SF',
    Manager: 'MANAGER',
  },
  'FREE': {
    free: 'FREE'
  }
};

const AddEmploye = () => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [section, setSection] = React.useState("");
  const [subSection, setSubSection] = React.useState("");
  // const [techno, setTechno] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEmploye = async () => {
    if (!name) return alert("Please fill all fields");
    setIsLoading(true);
    await addEmployee({
      id: uuidv4(),
      name,
      section,
      subSection,
      // techno,
    });
    setIsLoading(false);
    setOpen(false);
  };



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Employee
      </Button>
      <Backdrop open={isLoading} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Id"
            type="email"
            fullWidth
            variant="standard"
            disabled
            onChange={(e) => setId(e.target.value)}
          /> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="email"
            fullWidth
            variant="standard"
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
            {/* <FormControl fullWidth>
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
                value={techno}
                renderValue={(selected) => selected?.join(', ')}
              >
                {SECTIONS[section] &&
                  SECTIONS[section][subSection]?.map((section) => (
                    <MenuItem key={section} value={section}>
                        <Checkbox checked={techno.indexOf(section) > -1} />
                        <ListItemText primary={section} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEmploye}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEmploye;
