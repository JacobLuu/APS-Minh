import React from "react";
import { Grid } from "@material-ui/core";
import Text from "../../../../components/Text";
import { ProfileDetailsContainer, SaveButton } from "./styles";
import MaintenanceService from "../../../../services/maintenance";
import { getEnvironment } from "../../../../utils/miscellaneous";
import { TEXT_COLOR_GREY } from "../../../../themes/colors";

const ProfileMaintenance = () => {
  const run = () => {
    const environment = getEnvironment();
    if (environment === "Demo") {
      MaintenanceService.seedDemoDB();
    } else {
      MaintenanceService.replaceDB();
    }
  };

  return (
    <ProfileDetailsContainer maxWidth={false}>
      <form onSubmit={run}>
        <Grid container>
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Grid item xs={12}>
              <Text $size="lg" $color={TEXT_COLOR_GREY}>
                {"You are accessing now "}
              </Text>
              <Text
                $weight="bold"
                $color={TEXT_COLOR_GREY}
                style={{ fontSize: 38 }}
              >
                {getEnvironment()}
              </Text>
              <Text $size="lg" $color={TEXT_COLOR_GREY}>
                {"Would you like to clear up the DB? "}
              </Text>
            </Grid>
          </Grid>

          <Grid item xs={6} />

          <Grid container justifyContent="flex-end" style={{ marginTop: 12 }}>
            <SaveButton color="primary" variant="contained" type="submit">
              Go!
            </SaveButton>
          </Grid>
        </Grid>
      </form>
    </ProfileDetailsContainer>
  );
};

export default React.memo(ProfileMaintenance);
