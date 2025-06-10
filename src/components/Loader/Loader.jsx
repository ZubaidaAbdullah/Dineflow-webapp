import React, { Fragment } from "react";
import '../Loader/Loader.css'
import { Fade } from "react-awesome-reveal";

import Logo from "../../assets/Logo/brand-logo.png";

export default function Loader() {
  return (
    <Fragment>
      <div className="container-fluid">
        <div
          className="row preloader "
        >
          <div className="imagepre col-sm-12 ">
            <Fade direction="down">
              <img
                src={Logo}
                className="zoom-in-zoom-outa"
                alt=""
              />
            </Fade>
            <div>
              <h2 className="loaderh2">
                <Fade direction="up" delay={1000}>
                  Welcome to
                </Fade>
                <Fade direction="up" delay={1000}>
                  DineFlow
                </Fade>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
