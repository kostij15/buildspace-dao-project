import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken(process.env.TOKEN_CONTRACT_ADDRESS);

(async () => {
  try {
    const amount = 1000000;
    await token.mintToSelf(amount);
    const tokenSupply = await token.totalSupply();
    console.log(
      `There now is ${tokenSupply.displayValue} $BAOBAO in circulation`
    );
  } catch (error) {
    console.error("Failed to print $$$$", error);
  }
})();
