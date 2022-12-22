import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthCluster } from "../auth-cluster";
import * as fcl from "@onflow/fcl";

import React, { useEffect, useState } from "react";
import "./header.css";

export function Header({ user }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id='header-wrapper'>
      <Navbar
        collapseOnSelect={true}
        expanded={expanded}
        variant="dark"
        expand="md"
      >
        <Container className="mt-md-5 mb-md-5 g-0 p-0">
          <Link to={"/"}>
            <Navbar.Brand>
              <img
                alt=".find whitelabel"
                src="/assets/header/doodlehead-logo.svg"
                className="d-inline-block align-top"
                style={{ maxWidth: "300px" }}
              />{" "}
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            onClick={() => setExpanded(expanded ? false : "expanded")}
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav" className="">
            <Nav className="mx-auto">
              {/* <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/"} className="px-3">Mint</Nav.Link>
                            <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/info"} className="px-3">Info</Nav.Link>
                            <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/collection"} className="px-3">Collection</Nav.Link> */}
            </Nav>
            <AuthCluster user={user} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
