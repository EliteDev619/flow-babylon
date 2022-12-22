import { mapValuesToCode } from "flow-cadut";
import * as fcl from "@onflow/fcl";

export const Script = async (script, inputArgs) => {
  console.debug(inputArgs)
  console.debug(script)

  const args = [];
  for (var key in script.spec.order) {
    const value = script.spec.order[key];

    if (!(value in inputArgs)) {
      throw new Error("'" + value + "' is not present in arguments")
    }
    args.push(inputArgs[value]);
  }
  console.debug(script)
  const cadutArgs = await mapValuesToCode(script.code, args);

  const response = await fcl.send([
    fcl.script(script.code),
    fcl.args(cadutArgs)
  ]);

  return await fcl.decode(response)
}
