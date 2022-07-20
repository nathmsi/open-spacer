import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styles from "./index.module.scss";

const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

const DaySelector = ({ handleSelectDay }) => {
  const [active, setIsactive] = React.useState(0);

  React.useEffect(() => {
    handleSelectDay(day[0])
  },[]);

  const handleClick = (index) => {
    setIsactive(index);
    handleSelectDay(day[index]);
  };

  return (
    <div>
      <div className={styles.listDay}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          className={styles.buttonGroup}
        >
          {day.map((item, index) => (
            <Button
              key={index}
              variant={index === active ? "contained" : "outlined"}
              onClick={() => handleClick(index)}
            >
              {item}{" "}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default DaySelector;
