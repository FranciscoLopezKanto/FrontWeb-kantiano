
//import UsersTable from "./UsersTable";
// const demoUsers = [{ name: "hello" }, { name: "hello" }];
import React, { useEffect, useState } from "react";
import { View, Heading, ScrollView } from "@aws-amplify/ui-react";

import MedicosTable from "./BasicTable";

const Tables = () => {
  const [dataMedicos, setDataMedicos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}api/v1/profesionales`);
        const data = await response.json();
        setDataMedicos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Médicos</h2>
      </div>

      <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
        <Heading>Información</Heading>
        <br></br>
        <ScrollView width="100%">
          <MedicosTable medicos={dataMedicos} />
        </ScrollView>
      </View>
    </>
  );
};

export default Tables;