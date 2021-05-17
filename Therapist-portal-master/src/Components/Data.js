import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const Data = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://ec2-52-88-50-57.us-west-2.compute.amazonaws.com/Appointment")
      .then((response) => response.json())
      .then((jsun) => setData(jsun.reverse()));
  }, []);
  console.log(data);
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
