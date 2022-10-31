import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken(process.env.TOKEN_CONTRACT_ADDRESS);

(async () => {
  try {
    const allRoles = await token.roles.getAll();
    console.log("Roles that exist currently", allRoles);
    await token.roles.setAll({ admin: [], minter: [] });
    console.log("Roles after revoking ourselves", await token.roles.getAll());
    console.log("Successfully revoked our roles");
  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
})();
