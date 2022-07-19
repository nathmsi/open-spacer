import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { addPlace } from '../../../../utils/firebase';
import Backdrop from '../../../commons/backdrop';

const AddPlace= () => {
  const [open, setOpen] = React.useState(false);
  const [numberPlace, setNumberPlace] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPlace = async() => {
    setIsLoading(true);
    await addPlace({
      numberPlace
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
