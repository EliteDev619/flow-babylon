import { transactions } from "@findonflow/character-client";
import { Tx } from "../functions/transaction";
import ReactGA from "react-ga4";
import { Script } from "./script";
import { scripts } from "@findonflow/character-client";

// function NavigateAfterTx({url}){
// }

//new handleProfile
export const handleInitUser = async (wallet, network, address) => {
  try {
    await Tx({
      tx: transactions.initUser,
      args: {
        wallet: wallet,
        network: network,
        address: address,
      },
      callbacks: {
        async onSuccess(status) {
          console.log("success");
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

//new handleBid

export const HandleMint = async (e) => {
  var d = {};
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value;
  }

  const getPackIds = await Script(scripts.ids, {
    address: process.env.REACT_APP_MINTER_ADDRESS,
  });

  // Shuffle array
  const shuffled = getPackIds.sort(() => 0.5 - Math.random());
  // Get sub-array of first n elements after shuffled
  let selectedPacks = shuffled.slice(0, d.quantity);

  selectedPacks = selectedPacks.map((e) => parseInt(e));

  console.log(selectedPacks);

  let flowAmount = parseFloat(d.quantity * d.amount).toFixed(2);
  ReactGA.event("begin_checkout", {
    currency: "USD",
    value: flowAmount * 1.48,
  });
  try {
    await Tx({
      tx: transactions.bulkPurchase,
      args: {
        buy: selectedPacks,
        totalAmount: flowAmount,
      },
      callbacks: {
        async onSuccess(status) {
          console.log("success");
          ReactGA.event("purchase", {
            currency: "USD",
            value: flowAmount,
          });
          return true;
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const handleRedeemPack = async (packId, callbacks) => {
  try {
    await Tx({
      tx: transactions.openPack,
      args: {
        packId: parseInt(packId),
      },
      callbacks,
    });
  } catch (e) {
    console.log(e);
  }
};

export const handleSendToAdr = async (address, nftId) => {
  try {
    await Tx({
      tx: transactions.giftLampionsNFT,
      args: {
        id: parseInt(nftId),
        receiverAddr: address,
      },
      callbacks: {
        async onSuccess(status) {
          console.log("success");
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const handleSendPackToAdr = async (address, packId) => {
  try {
    await Tx({
      tx: transactions.giftPack,
      args: {
        id: parseInt(packId),
        receiverAddr: address,
      },
      callbacks: {
        async onSuccess(status) {
          console.log("success");
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const handleEquipWearable = async (id, wearableIDs, positions) => {
  let arrayPosition
  positions ? arrayPosition = [positions] : arrayPosition = []
  try {
    await Tx({
      tx: transactions.equipWearable,
      args: {
        id: parseInt(id),
        wearableIDs: wearableIDs,
        unequipPositions: arrayPosition,
      },
      callbacks: {
        async onSuccess(status) {
          console.log("success");
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
