import React from "react";
import { Button } from "react-bootstrap";
import { handleEquipWearable } from "../../functions/txfunctions";
import "./wearables.scss";

const Wearables = ({ wearables, characters }) => {
  return (
    <div id="wearables-wrapper">
      <h1>Wearables</h1>
      {wearables &&
        wearables.map((wearable, i) => {
          return (
            <div id="wearable-item-row" key={i}>
              <img src="/assets/img/wearable-icon.svg" />
              &nbsp;
              <span className="info-font wearables-span">
                {wearable.display.name}&nbsp;
                {wearable.rarity?.description}
              </span>
             
              <Button
                variant="wl"
                onClick={() =>
                  handleEquipWearable(characters[0].id, [parseInt(wearable.id)])
                }
              >
                Equip
              </Button>
              <br /> <br />
            </div>
          );
        })}
    </div>
  );
};

export default Wearables;
