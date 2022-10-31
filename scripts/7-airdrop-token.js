import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const editionDrop = await sdk.getEditionDrop(
      process.env.EDITION_DROP_CONTRACT_ADDRESS
    );
    const token = sdk.getToken(process.env.TOKEN_CONTRACT_ADDRESS);

    const addresses = ["0x349A2ad632221A02deB145C2799c7aDD9248dBAf"];
    if (addresses.length === 0) {
      console.log("No NFTs have been claimed yet!");
    }

    const airDropTargets = addresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * 9001 + 1000);
      console.log(
        `Going to airdrop ${randomAmount} tokens to address ${address}`
      );

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
      return airdropTarget;
    });
    console.log("Starting airdrop!...");
    console.log(airDropTargets);
    await token.transferBatch(airDropTargets);
  } catch (error) {
    console.error("Airdrop failed", error);
  }
})();
