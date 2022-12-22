import React from "react";
import './init.scss'
import { Button } from "react-bootstrap";
import { handleInitUser } from "../../functions/txfunctions";

const InitUserNoCollection = ({ user }) => {
  const wallet = user && user.services[0].provider.name;
  const network = process.env.REACT_APP_NETWORK;
  const address = user.addr;
  return (
    <div id='init-wrapper'>
        <h1>Welcome, {user.addr}!</h1>
      <h1>Please init your collection to continue</h1>
        <Button
          onClick={() => handleInitUser(wallet, network, address)}
          variant="wl"
          className="my-2"
        >
          Init
        </Button>
    </div>
  );
};

export default InitUserNoCollection;
