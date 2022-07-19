import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { addEmployee } from '../../../../utils/firebase';
import Backdrop from '../../../commons/backdrop';

const AddEmploye = () => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEmploye = async() => {
    setIsLoading(true);
    await addEmployee({
        id,
        name
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Id"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setId(e.target.value)}
          />
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
