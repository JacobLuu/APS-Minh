import React from "react";

import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth={false}>
      <Box display="flex" justifyContent="center">
        <Typography component="h1" style={{ fontSize: 24 }}>
          Privacy Policy
        </Typography>
      </Box>
      <Box>
        <List>
          <ListItem>
            <ListItemText>
              The ANAFES extension will only collect sensitive data like access
              token on this site.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              This is to provide authentication on the extension.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Transmitted data is encrypted with HTTPS.
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
