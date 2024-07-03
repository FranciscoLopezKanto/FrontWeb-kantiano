import React, { useEffect, useState } from "react";
import { View, Heading, ScrollView } from "@aws-amplify/ui-react";
import UsersTable from "./UsersTable";

const Tables = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}api/v1/users`);
        const data = await response.json();
        setDataUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Pacientes</h2>
      </div>

      <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
        <Heading> Información </Heading>
        <br></br>
        <ScrollView width="100%">
          <UsersTable users={dataUsers} />
        </ScrollView>
      </View>
    </>
  );
};

export default Tables;

