import React from "react";
import "./init.scss";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { handleEquipWearable } from "../../functions/txfunctions";
import Character from "../character/character";
import Wearables from "../wearables/wearables";

const InitUserHasCollection = ({ collection }) => {
  const navigate = useNavigate();
  console.log(collection);
  return (
    <div id="init-wrapper">
      <h1>Your collection has been init!</h1>
      {/* <Button variant="wl" onClick={() => navigate("/collection")}>
        View collection
      </Button> */}
      {collection && (
        <>
          <Character characters={collection.character} />
          <Wearables characters={collection.character} wearables={collection.wearables} />
        </>
      )}
    </div>
  );
};

export default InitUserHasCollection;
