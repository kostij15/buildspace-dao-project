import sdk from "./1-initialize-sdk.js";
import { AddressZero } from "@ethersproject/constants";

(async () => {
  try {
    const tokenAddress = await sdk.deployer.deployToken({
      name: "BaoDAO Governance Token",
      symbol: "BAOBAO",
      description: "Token for Bao DAO members",
      primary_sale_recipient: AddressZero,
    });
    console.log("Successfully deployed token module\n\naddress:", tokenAddress);
  } catch (error) {
    console.error("Failed to deploy token module", error);
  }
})();
