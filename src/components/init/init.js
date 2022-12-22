import React from "react";
import { useFormStatus } from "../../functions/DisabledState";
import { LoadingModule } from "../loading/loading";
import InitNoUser from "./initnouser";
import InitUserHasCollection from "./inituserhascollection";
import InitUserNoCollection from "./initusernocollection";

const Init = ({ user, hasCollection, collection }) => {
//conditionally show auth and init info/actions based on fcl user and collection status from validUser script

  if (!user.loggedIn) {
    return <InitNoUser user={user} />;
  } else if (user.loggedIn && hasCollection === false) {
    return <InitUserNoCollection user={user} />;
  } else if (user.loggedIn && hasCollection) {
    return <InitUserHasCollection collection={collection} />;
  } else return <LoadingModule />;
};

export default Init;
