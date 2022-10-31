import { AddressZero } from "@ethersproject/constants";
import { readFileSync } from "fs";
import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      //Collection name
      name: "BaoDAO Membership",
      //description for the collection
      description: "DAO for Bao lovers.",
      image: readFileSync("scripts/assets/bao.png"),
      //primary sale receipt -> receives the proceeds from the sales
      //Since there is no price we're using Address Zero
      //However going forward we can replace it with a contract address
      primary_sale_recipient: AddressZero,
    });

    //Allows us to get the promise of the smart contract
    const editionDrop = await sdk.getEditionDrop(editionDropAddress);

    //grab metadata
    const metadata = await editionDrop.metadata.get();

    console.log(
      `Successfully deployed editionDrop contract, address: ${editionDropAddress}`
    );
    console.log(`editionDrop metadata: ${metadata}`);
  } catch (err) {
    console.error(`Failed to deploy edition drop contract ${err}`);
  }
})();
