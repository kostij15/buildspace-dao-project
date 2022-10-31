import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote(process.env.VOTING_CONTRACT_ADDRESS);
const token = sdk.getToken(process.env.TOKEN_CONTRACT_ADDRESS);

(async () => {
  //proposal to mint 420,000 new tokens to treasury
  try {
    const AMOUNT_TO_MINT = 420000;
    const description = `Should the DAO mint an addition ${AMOUNT_TO_MINT} tokens into the treasury?`;
    const executions = [
      {
        //address that has our tokens
        toAddress: token.getAddress(),

        //Need to specify the amount of ETH we want to send in this proposal
        //SInce we're sending 0 ETH and just minting new tokens we can set
        //the value here to 0
        nativeTokenValue: 0,

        //since we're minting to the vote, we need to use ethers.js to convert amount  to the amount in wei
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(AMOUNT_TO_MINT.toString(), 18),
        ]),
      },
    ];

    await vote.propose(description, executions);
    console.log("Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("Failed to create first proposal", error);
    process.exit(1);
  }

  //creating a 2nd proposal to transfer ourselves 6900 tokens
  try {
    const AMOUNT_TO_SEND = 6900;
    const description = `Should the DAO transfer ${AMOUNT_TO_SEND} to ${process.env.WALLET_ADDRESS}?`;
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("transfer", [
          process.env.WALLET_ADDRESS, //THE ADDRESS WE WWANT TO TRANSFER TO
          ethers.utils.parseUnits(AMOUNT_TO_SEND.toString(), 18),
        ]),
      },
    ];

    await vote.propose(description, executions);
    console.log(`Successfully created proposal: ${description}`);
  } catch (error) {
    console.error(`Failed to create proposal giving us tokens`, error);
    process.exit(1);
  }
})();
