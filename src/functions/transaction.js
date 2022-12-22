import * as fcl from "@onflow/fcl";
import toast from "react-hot-toast";
import { changeState, disableForm, enableForm } from "./DisabledState";
import { mapValuesToCode } from "flow-cadut";
import "../App.css";

//This is the FCL transaction handler.

const noop = async () => {};

export const Tx = async (input) => {
  console.debug(input);
  const callbacks = input.callbacks || {};
  const transaction = input.tx;
  const onStart = callbacks.onStart || noop;
  const onSubmission = callbacks.onSubmission || noop;
  const onUpdate = callbacks.onUpdate || noop;
  const onSuccess = callbacks.onSuccess || noop;
  const onError = callbacks.onError || noop;
  const onComplete = callbacks.onComplete || noop;
  const toastId = toast.loading("Preparing transaction");
  let hasSubmitted = 0;

  const args = [];
  let cadutArgs;
  if (!transaction.spec?.order) {
    cadutArgs = [];
  } else {
    for (var key in transaction.spec.order) {
      const value = transaction.spec.order[key];
      if (!(value in input.args)) {
        throw new Error("'" + value + "' is not present in arguments");
      }
      args.push(input.args[value]);
    }
    cadutArgs = await mapValuesToCode(transaction.code, args);
  }

  try {
    const mods = [
      fcl.transaction(transaction.code),
      fcl.args(cadutArgs),
      fcl.proposer(fcl.currentUser().authorization),
      fcl.payer(fcl.currentUser().authorization),
      fcl.authorizations([fcl.currentUser().authorization]),
      fcl.limit(9999),
    ];
    onStart();
    var txId = await fcl
      .send(mods)
      .then(fcl.decode)
      .then(toast.loading("Transaction Started", { id: toastId }))
      .then(disableForm());
    console.debug(
      `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
      "color:purple;font-weight:bold;font-family:monospace;"
    );
    onSubmission(txId);
    var unsub = fcl.tx(txId).subscribe(onUpdate);
    var txStatus = await fcl
      .tx(txId)
      .onceSealed()
      .then(
        toast.loading(
          <span className="text-center toast-link">
            Transaction Submitted
            <br />
            click{" "}
            <a
              href={fvsTx(await fcl.config().get("env"), txId)}
              target="_blank"
              rel="noreferrer"
              style={{ color: "black !important" }}
            >
              HERE
            </a>{" "}
            to view this transaction.
          </span>,
          { id: toastId }
        )
      )
      .then((hasSubmitted = 1));
    unsub();
    console.debug(
      `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
      "color:green;font-weight:bold;font-family:monospace;"
    );
    await onSuccess(txStatus)
      .then(
        toast.success(
          <span className="text-center toast-link">
            Transaction successful
            <br />
            click{" "}
            <a
              href={fvsTx(await fcl.config().get("env"), txId)}
              target="_blank"
              rel="noreferrer"
              style={{ color: "black !important" }}
            >
              HERE
            </a>{" "}
            to view this transaction.
          </span>,
          { id: toastId }
        )
      )
      .then(enableForm())
      .then(changeState());
    return txStatus;
  } catch (error) {
    console.error(
      `TX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
      error
    );
    onError(error);
    const { message } = error;
    if (hasSubmitted === 0 && message) {
      if (message.includes("Declined: User rejected signature")) {
        toast("Transaction cancelled by user", {
          id: toastId,
          duration: "100",
        });
        enableForm();
      } else if (message.includes("Cannot read properties of undefined")) {
        toast("Login cancelled by user", { id: toastId, duration: "100" });
        enableForm();
      } else {
        toast.error("Transaction " + error, { id: toastId });
        enableForm();
      }
    }
    if (hasSubmitted === 1) {
      if (
        error.includes(
          "Amount withdrawn must be less than or equal than the balance of the Vault"
        )
      ) {
        toast(
          "You do not have enough FUSD in your wallet for this transaction",
          { id: toastId, duration: "500" }
        );
        enableForm();
      } else if (error.includes("Not a valid FIND user")) {
        toast(
          "User doesn't exist, please ask them to create a profile in .find",
          { id: toastId, duration: "800" }
        );
        enableForm();
      } else {
        toast.error(
          <span className="text-center text-break toast-link">
            Transaction failed
            <br />
            click{" "}
            <a
              href={fvsTx(await fcl.config().get("env"), txId)}
              target="_blank"
              rel="noreferrer"
            >
              HERE
            </a>{" "}
            to view this transaction.
          </span>,
          { id: toastId }
        );
        enableForm();
      }
    }
  } finally {
    await onComplete(txStatus);
  }
};

const fvsTx = (env, txId) => `https://flow-view-source.com/${env}/tx/${txId}`;
