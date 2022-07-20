import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { deepOrange, deepPurple } from "@mui/material/colors";

import styles from "./index.module.scss";

import AddPlace from "./addPlace";

import { db } from "../../../utils/firebase";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  try {
    return {
      sx: {
        bgcolor: name && stringToColor(name),
      },
      children: name,
    };
  } catch (err) {
    console.log(err);
  }
}

const ListEmploye = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    onValue(ref(db, `places`), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const places =
        data &&
        Object.keys(data).map((key) => ({
          ...data[key],
        }));
      setPlaces(places);
    });
  }, []);

  return (
    <div>
      <div className={styles.container}>
        {places?.map(({ numberPlace }) => (
          <ListItem alignItems="flex-start" key={numberPlace}>
            <ListItemAvatar>
              <Avatar {...stringAvatar(numberPlace)} />
            </ListItemAvatar>
          </ListItem>
        ))}
      </div>
      <AddPlace />
    </div>
  );
};

export default ListEmploye;
