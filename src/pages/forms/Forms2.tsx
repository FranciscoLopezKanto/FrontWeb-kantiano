import React from "react";
import { View, Heading } from "@aws-amplify/ui-react";
import BasicForm from "./BasicForm";

const Forms = () => {
  return (
    <>
      <div>
        <h2>Agregar Medico</h2>
      </div>
      <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth={{ base: "100%", large: "70%" }}
        padding="1rem"
        minHeight="100vh"
      >
        <Heading color="#333"> Ingresa los datos </Heading>
        <br></br>
        <BasicForm />
      </View>
    </>
  );
};

export default Forms;
