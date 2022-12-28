import { useState } from "react";
import NotAssignedEmployee from "../../HomePage/NotAssignedEmployee";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import EditIcon from '@mui/icons-material/Edit';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ModalUnassigned = ({ daySelected, totalPlace, assignedCount }) => {
  const [open, setOpen] = useState(false);
  const [countNotAssigned,setCountNotAssigned] = useState(0)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<EditIcon />}>Unassigned  </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
            top: '50vh'
        }}
      >
        {/* <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Unassigned Employee ({countUnassigned})
            </Typography>
          </Toolbar>
        </AppBar> */}
        <List sx={{ margin: '1rem'}}>
            <NotAssignedEmployee daySelected={daySelected} handleCountNotAssigned={(val) => setCountNotAssigned(val)} />
        </List>
      </Dialog>
    </div>
  );
};

export default ModalUnassigned;
