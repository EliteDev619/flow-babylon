import React from "react";
import { Button, CloseButton } from "react-bootstrap";
import { handleEquipWearable } from "../../functions/txfunctions";
import "./character.scss";

const Character = ({ characters }) => {
  console.log(characters);
  if (characters && characters[0]) {
    return (
      <div id="characters-wrapper">
        {characters.map((character, i) => {
          return (
            <div id="character-wrapper" key={i}>
              <h1>{character.display.name}</h1>
              <div id="character-info-wrapper">
                <div id="character-template-wrapper">
                  <img src="/assets/img/character-template.svg" />
                </div>
                <div></div>
                <div>
                  {character.traits?.traits.map((trait, i) => {
                    return (
                      <div key={i} id="character-equipped-item-row">
                        <img src="/assets/img/wearable-icon.svg" />
                        <span className="info-font equipped-span">
                          &nbsp;
                          {trait.name}: {trait.value}{" "}
                          {trait.rarity?.description}
                        </span>
                        <Button
                          onClick={() =>
                            handleEquipWearable(
                              parseInt(character.id),
                              [],
                              trait.name
                            )
                          }
                          variant="wl"
                        >
                          X
                        </Button>
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div id="characters-wrapper">
        <h1>You have no characters!</h1>
      </div>
    );
  }
};

export default Character;
