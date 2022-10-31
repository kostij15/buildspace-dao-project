import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "Bao DAO brown cow",
      description: "Voting contracting for Bao DAO",
      voting_token_address: process.env.TOKEN_CONTRACT_ADDRESS,
      //voting can begin immediately
      voting_delay_in_blocks: 0,
      //one day == 6750
      voting_period_in_blocks: 6570,
      //Minimum % of total supply need to vote for the proposal to be valid after the time for the proposal has ended
      voting_quorum_fraction: 0,
      //min # of tokens allowed to create a proposal
      proposal_token_threshold: 0,
    });
    console.log("Deployed voting contract, address:", voteContractAddress);
  } catch (error) {
    console.error("Failed to deploy vote contract", error);
  }
})();
