import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = await sdk.getEditionDrop(
  process.env.EDITION_DROP_CONTRACT_ADDRESS
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "NowBaoFaoDAO",
        description: "NFT gives you access to the BaoDAO!",
        image: readFileSync("scripts/assets/chopstick_bao.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (err) {
    console.error(`Failed to create the new nft`, err);
  }
})();
