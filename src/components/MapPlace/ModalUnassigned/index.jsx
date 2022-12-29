import { useState, useEffect } from "react";
import NotAssignedEmployee from "../../HomePage/NotAssignedEmployee";
import styles from "./index.module.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import EmployeeCard from "../../EmployeeCard";
import { onValue, ref } from "firebase/database";
import { db } from "../../../utils/firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalUnassigned = ({ daySelected, totalPlace, assignedCount }) => {
  const [open, setOpen] = useState(false);
  const [countNotAssigned, setCountNotAssigned] = useState(0);
  // const [employes, setEmployes] = useState([]);
  const [unasignedEmployee, setUnasignedEmployee] = useState([]);
  const [unasignedEmployeeOriginal, setUnasignedEmployeeOriginal] = useState(
    []
  );
  const [places, setPlaces] = useState([]);
  const [placesInUse, setPlacesInUse] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    onValue(ref(db, `places`), (snapshot) => {
      const data = snapshot.val();
      const places =
        data &&
        Object.keys(data).map((key) => ({
          ...data[key],
        }));
      setPlaces(places);
    });
  }, []);

  useEffect(() => {
    if (daySelected) {
      onValue(ref(db, `employees`), (employeeSnapShot) => {
        const employesGlobal = employeeSnapShot && employeeSnapShot.val();
        onValue(ref(db, `week/${daySelected}`), async (snapshot) => {
          const data = snapshot.val();
          if (employesGlobal) {
            const employes =
              employesGlobal &&
              Object.keys(employesGlobal).map((key) => ({
                ...employesGlobal[key],
              }));
            const assignedEmployee = data?.employees || {};

            if (assignedEmployee?.length === 0) {
              setUnasignedEmployee(employes);
            } else {
              const employeesListAssigned =
                assignedEmployee &&
                Object.keys(assignedEmployee).map((key) => ({
                  ...assignedEmployee[key],
                }));

              const placeAlreadyUse = employeesListAssigned
                ?.filter((el) => el.place)
                .map((el) => el.place);
              setPlacesInUse(placeAlreadyUse);
              const unasignedEmployee = employes.filter(
                (el) => !assignedEmployee[el.id]
              );
              setUnasignedEmployee(unasignedEmployee);
              setUnasignedEmployeeOriginal(unasignedEmployee);
            }
          }
        });
      });
    }
  }, [daySelected]);

  const handleRemoteEmployee = async (employee) => {
    await set(ref(db, `week/${daySelected}/employees/${employee.id}`), {
      ...employee,
      remote: true,
    });
  };

  const handleChangePlace = async (employee) => {
    await set(ref(db, `week/${daySelected}/employees/${employee.id}`), {
      ...employee,
    });
  };

  const handleOffEmployee = async (employee) => {
    await set(ref(db, `week/${daySelected}/employees/${employee.id}`), {
      ...employee,
      off: true,
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      const filterEmployee = unasignedEmployeeOriginal.filter((el) =>
        el.name.toLowerCase().includes(value.toLowerCase())
      );
      setUnasignedEmployee(filterEmployee);
    } else {
      setUnasignedEmployee(unasignedEmployeeOriginal);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
      >
        Unassigned ({unasignedEmployee?.length})
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          top: "50vh",
        }}
      >
        <List sx={{ margin: "1rem" }}>
          {/* <NotAssignedEmployee
            daySelected={daySelected}
            handleCountNotAssigned={(val) => setCountNotAssigned(val)}
          /> */}
          <div>
            <div className={styles.title}>
              Unassigned Employee ({unasignedEmployee?.length})
            </div>
            <TextField
              variant="outlined"
              onChange={handleChange}
              sx={{
                width: "100%",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            />
            <EmployeeCard
              {...{
                employee: unasignedEmployee,
                handleChangePlace,
                places,
                placesInUse,
                handleRemoteEmployee,
                handleOffEmployee,
              }}
            />
          </div>
        </List>
      </Dialog>
    </div>
  );
};

export default ModalUnassigned;
