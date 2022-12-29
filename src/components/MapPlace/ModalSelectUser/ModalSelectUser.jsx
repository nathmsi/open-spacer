import { useEffect, useState } from "react";
import EmployeeCard from "../../EmployeeCard";
import { onValue, ref, refFromURL, set } from "firebase/database";
import { db } from "../../../utils/firebase";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { getColorPlace } from "../../../utils/colors";

const ModalSelectUser = ({ placeNumber, daySelected, open, onClose }) => {

  const [unasignedEmployee, setUnasignedEmployee] = useState([]);

  
  const handleClose = async () => {
    onClose();
  };

  const handleListItemClick = async(employee) => {
    await set(ref(db, `week/${daySelected}/employees/${employee.id}`), {
      ...employee,
      place: placeNumber,
    });
    onClose();
  };

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
            setUnasignedEmployee(
              employes.filter((el) => !assignedEmployee[el.id])
            );
          }
        });
      });
    }
  }, [daySelected]);

 
  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select User</DialogTitle>
        <List sx={{ pt: 0 }}>
          {unasignedEmployee.map((employee, index) => (
            <ListItem disableGutters key={index}>
              <ListItemButton
                onClick={() => handleListItemClick(employee)}
                key={employee?.id}
              >
                <ListItemAvatar>
                  <Avatar {...getColorPlace({name: employee?.name,section: employee?.section,subSection: employee?.subSection})} />
                </ListItemAvatar>
                <ListItemText primary={employee?.name} secondary={`${employee.section}/${employee.subSection}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default ModalSelectUser;
