import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = await sdk.getEditionDrop(
  process.env.EDITION_DROP_CONTRACT_ADDRESS
);

(async () => {
  try {
    //we need to create an array of objects, since we can have different phases for claiming at different times
    const claimConditions = [
      {
        startTime: new Date(),
        maxQuantity: 50000,
        price: 0,
        quantityLimitPerTransaction: 1,
        waitInSeconds: MaxUint256,
      },
    ];
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("Successfully set claim condition!");
  } catch (err) {
    console.error("Failed to set claim condition", err);
  }
})();
