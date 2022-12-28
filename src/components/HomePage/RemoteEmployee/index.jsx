import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ref, onValue, remove, get } from "firebase/database";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import styles from "./index.module.scss";

import { db } from "../../../utils/firebase";
import { stringAvatar } from "../../../utils/colors";

const NotAssignedEmployee = ({ daySelected }) => {
  // const [employes, setEmployes] = useState([]);
  const [remoteEmployee, setRemoteEmployee] = useState([]);

  // useEffect(() => {
  //   onValue(ref(db, `employees`), (snapshot) => {
  //     const data = snapshot.val();
  //     const employes =
  //       data &&
  //       Object.keys(data).map((key) => ({
  //         ...data[key],
  //       }));
  //     setEmployes(employes);
  //   });
  // }, []);

  useEffect(() => {
    if (daySelected) {
      onValue(ref(db, `week/${daySelected}`), async (snapshot) => {
        const data = snapshot.val();
        const employesSnapshot = await get(ref(db, `employees`));
        const employesGlobal = employesSnapshot.val();
        if (employesGlobal) {
          const employes =
            employesGlobal &&
            Object.keys(employesGlobal).map((key) => ({
              ...employesGlobal[key],
            }));
          const assignedEmployee = data?.employees || [];
          const remoteEmployee = employes.filter(
            (el) => assignedEmployee[el.id]?.remote
          );
          setRemoteEmployee(remoteEmployee);
        }
      });
    }
  }, [daySelected]);

  const handleRemoveRemoteEmployee = async (employee) => {
    await remove(ref(db, `week/${daySelected}/employees/${employee.id}`));
  };

  return (
    <div>
      <div className={styles.title}>Remote Employee ({remoteEmployee?.length})</div>
      <div className={styles.container}>
        {remoteEmployee?.map(({ name, id }) => (
          <ListItem
            alignItems="flex-start"
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveRemoteEmployee({ name, id })}
              >
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(name)} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {/* id : {id} */}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default NotAssignedEmployee;
