import { PoolEntity } from "../utils/entities/PoolEntity";
import { web3 } from "./Wallet";
import tokenAbi from "../abi/Token.json"
import poolAbi from "../abi/Pool.json";
import { BigNumber, ethers } from "ethers";
import { INFINTY } from "../utils/Constants";
import { formatEther, parseEther } from "@ethersproject/units";

export async function approvePool(pool: PoolEntity) {
    if (!web3) {
        return Promise.reject("Your wallet is not connected");
    }

    const chainId = (await web3.getNetwork()).chainId;
    if (chainId !== 4002) {
        return Promise.reject("You are not connected to the right network");
    }

    const stakedTokenContract = new ethers.Contract(pool.stakeTokenAddress, JSON.parse(tokenAbi.result), web3.getSigner());
    const address = web3.getSigner().getAddress();
    const gasPrice = await web3.getGasPrice();

    let tx = await stakedTokenContract.approve(pool.poolContractAddress, BigInt(INFINTY));

    await tx.wait();

    const approved = (await stakedTokenContract.allowance(address, pool.poolContractAddress) as unknown as BigNumber).gt(0);

    return approved;
}

export async function depositPool(pool: PoolEntity, amount: string) {
    if (!web3) {
        return Promise.reject("Your wallet is not connected");
    }

    const chainId = (await web3.getNetwork()).chainId;
    if (chainId !== 4002) {
        return Promise.reject("You are not connected to the right network");
    }

    const poolContract = new ethers.Contract(pool.poolContractAddress, JSON.parse(poolAbi.result), web3.getSigner());

    let tx = await poolContract.deposit(parseEther(amount));

    const receipt: ethers.providers.TransactionReceipt = await tx.wait();

    return receipt.status;
}

export async function harvestPool(pool: PoolEntity) {
    if (!web3) {
        return Promise.reject("Your wallet is not connected");
    }

    const chainId = (await web3.getNetwork()).chainId;
    if (chainId !== 4002) {
        return Promise.reject("You are not connected to the right network");
    }

    const poolContract = new ethers.Contract(pool.poolContractAddress, JSON.parse(poolAbi.result), web3.getSigner());

    let tx = await poolContract.withdraw(parseEther("0"));

    const receipt: ethers.providers.TransactionReceipt = await tx.wait();

    return receipt.status;
}

export async function withdrawPool(pool: PoolEntity, amount: string) {
    if (!web3) {
        return Promise.reject("Your wallet is not connected");
    }

    const chainId = (await web3.getNetwork()).chainId;
    if (chainId !== 4002) {
        return Promise.reject("You are not connected to the right network");
    }

    const poolContract = new ethers.Contract(pool.poolContractAddress, JSON.parse(poolAbi.result), web3.getSigner());

    console.log(amount);

    let tx = await poolContract.withdraw(parseEther(amount));

    const receipt: ethers.providers.TransactionReceipt = await tx.wait();

    return receipt.status;
}