import React from "react";
import { Text, SwitchField } from "@aws-amplify/ui-react";

const ProfileSettings = () => {
  return (
    <div className="profile-card-content">
      <Text fontWeight="600" fontSize="18px" marginBottom="18px">
        Profile Settings
      </Text>

      <SwitchField
        isDisabled={false}
        label="report multiple cancellations of appointments"
        labelPosition="end"
        defaultChecked={false}
      />

      <SwitchField
        isDisabled={false}
        label="Email me when there are weather problems
        "
        labelPosition="end"
        defaultChecked={true}
      />
      <SwitchField
        isDisabled={false}
        label="appointments update notifications"
        labelPosition="end"
        defaultChecked={false}
      />
      <SwitchField
        isDisabled={false}
        label="log out every 30 minutes of inactivity"
        labelPosition="end"
        defaultChecked={true}
      />
    </div>
  );
};

export default ProfileSettings;
