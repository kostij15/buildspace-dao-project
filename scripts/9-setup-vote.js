import sdk from "./1-initialize-sdk.js";

const vote = sdk.getVote(process.env.VOTING_CONTRACT_ADDRESS);
const token = sdk.getToken(process.env.TOKEN_CONTRACT_ADDRESS);

(async () => {
  try {
    await token.roles.grant("minter", vote.getAddress());
    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "Failed to grant vote contract permssions on token contract",
      error
    );
  }

  //we want to transfer 90 percent of the tokens from the initial contract (in our wallet)
  //to the voting contract to create more distribution
  try {
    //grab balance of wallet
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) * 0.9;
    await token.transfer(vote.getAddress(), percent90);
    console.log(`Successfully transfered ${percent90} tokens to vote contract`);
  } catch (error) {
    console.error("Failed to transfer tokens to vote contract", error);
  }
})();
