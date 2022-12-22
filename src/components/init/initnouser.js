import React from "react";
import { AuthCluster } from "../auth-cluster";
import './init.scss'

const InitNoUser = ({ user }) => {
  return (
    <div id='init-wrapper'>
      <h1 >Please connect your wallet to continue</h1>
     <div className="my-2"> <AuthCluster user={user} /></div>
    </div>
  );
};

export default InitNoUser;
