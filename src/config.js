import { config } from "@onflow/fcl"
import {send as grpcSend} from "@onflow/transport-grpc"


config()
  .put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) // Configure FCL's Access Node
  //  .put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism
  .put("env", process.env.REACT_APP_NETWORK)
  .put("discovery.wallet", process.env.REACT_APP_WALLET_DISCOVERY)
  .put("app.detail.title", ".find whitelabel")
  .put("app.detail.icon", window.location.origin + "/logo512.png")
  .put("decoder.Enum", (val) => {
    const result = {
      type: val.id
    };

    for (let i = 0; i < val.fields.length; i++) {
      const field = val.fields[i];
      result[field.name] = field.value;
    }

    return result;
  });

