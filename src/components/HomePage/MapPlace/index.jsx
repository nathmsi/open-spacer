import { useEffect, useState } from "react";
import { get, ref, remove, onValue } from "firebase/database";
import { deepOrange, deepPurple } from "@mui/material/colors";

import styles from "./index.module.scss";

import { db } from "../../../utils/firebase";
import BackDrop from '../../commons/backdrop/index';

import MapPlace from '../../MapPlace';

const HomePage = ({ daySelected }) => {
  const [places, setPlaces] = useState([]);
  const [assignedPlace, setAssignedPlace] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onValue(ref(db, `places`), async(snapshot) => {
      const data = snapshot.val();
      const places =
        data &&
        Object.keys(data).map((key) => ({
          ...data[key],
        }));
      setPlaces(places);
    });

  }, []);

  useEffect(()=>{
    // onValue(ref(db, `employees`),(employeeSnapShot) => {
    //   const employesGlobal = employeeSnapShot && employeeSnapShot.val();
    //   console.log({ employesGlobal, assignedPlace })
    //   const deletedEmployees = assignedPlace.filter(el => employesGlobal[el.id]);
    //   deletedEmployees.forEach(async el => {
    //     await handleRemovePlaceEmployee(el)
    //   })
    //   console.log({deletedEmployees})
    // })
  },[assignedPlace])

  useEffect(() => {
    setIsLoading(true);
    setAssignedPlace([]);
    if (daySelected) {
      onValue(ref(db, `week/${daySelected}`), async(snapshot) => {
        setIsLoading(true);
        const data = snapshot.val();
        console.log("week-employee-changed",data)
        if (data) {
          const employeesAssigned =
            data.employees &&
            Object.keys(data.employees).map((key) => ({
              ...data.employees[key],
            }));
          const employeesWithPlace = employeesAssigned?.filter(
            (el) => el.place
          );
          setAssignedPlace(employeesWithPlace);
          // const employesSnapshot = await get(ref(db, `employees`));
          // const employesGlobal = employesSnapshot.val();
          // if (employesGlobal) {
          //   const employes =
          //   employesGlobal &&
          //   Object.keys(employesGlobal).map((key) => ({
          //     ...employesGlobal[key],
          //   })).filter((el) => !employeesAssigned?.find(el2 => el2.id === el.id && (el2.place || el2.remote || el2.off)));
          //   setAllEmployeesNot(employes);
          // }
        } else {
          setAssignedPlace([]);
        }
        setIsLoading(false);
      });
    }
  }, [daySelected]);

  const handleRemovePlaceEmployee = async (employee) => {
    console.log({employee})
    await remove(ref(db, `week/${daySelected}/employees/${employee.id}`));
  };

  console.log({ assignedPlace})

  return (
    <>
      <BackDrop open={isLoading} />
      <MapPlace {...({ handleRemovePlaceEmployee, places, assignedPlace, allEmployeesLength: allEmployees?.length, daySelected })} />
    </>
  );
};

export default HomePage;
