import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const Footer = () => {
  function Copyright() {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Fragment>
      <div className="col-12 bg-dark footer">
        <div className="row footer__row align-items-center justify-content-center py-3">
          <div className="col-12 col-sm-auto footer__txt mb-sm-0 mb-2 mx-2">
            <a href="#!">Privacy Policy</a>
          </div>
          <div>
            <Box>
              <Copyright />
            </Box>
          </div>
          <div className="col-12 col-sm-auto footer__txt mb-sm-0 mb-2 mx-2">
            Terms Of Condiitons
            <div className="footer_dot position-absolute"></div>
          </div>

          <div className="col-12 col-sm-auto footer__txt mb-sm-0 mb-2 mx-2">
            <a href="#!">Cookie Policy</a>
            <div className="footer_dot position-absolute"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
