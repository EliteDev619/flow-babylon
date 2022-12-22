import * as fcl from "@onflow/fcl"
import { Button } from "react-bootstrap";
import ReactGA from "react-ga4";

export function AuthCluster({ user }) {

  if (user.loggedIn) {

    return (
      <div>
        <Button variant="wl" onClick={fcl.unauthenticate} style={{ width: "220px" }}>Log Out</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button variant="wl" onClick={() => {
          fcl.logIn();
          ReactGA.event("login", {
            method: "wallet"
          });
          }
        } style={{ width: "220px" }}>Connect Wallet</Button>
      </div>
    )
  }
}
