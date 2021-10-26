import { PoolEntity } from "../utils/entities/PoolEntity";
import { web3 } from "./Wallet";
import tokenAbi from "../abi/Token.json"
import poolAbi from "../abi/Pool.json";
import { BigNumber, ethers } from "ethers";
import { INFINTY } from "../utils/Constants";
import { parseEther } from "@ethersproject/units";
import { useToast } from "vue-toastification";
import Alert from "../components/Alert.vue";
import { AlertType } from "../utils/entities/AlertType";

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

    let tx;

    try{
        tx = await stakedTokenContract.approve(pool.poolContractAddress, BigInt(INFINTY));
    }
    catch(reason: any) {
        return reason.code;
    }

    await tx.wait();

    const approved = (await stakedTokenContract.allowance(address, pool.poolContractAddress) as unknown as BigNumber).gt(0);

    return approved;
}

export async function depositPool(pool: PoolEntity, amount: string): Promise<number> {
    if (!web3) {
        return Promise.reject("Your wallet is not connected");
    }

    const chainId = (await web3.getNetwork()).chainId;
    if (chainId !== 4002) {
        return Promise.reject("You are not connected to the right network");
    }

    const poolContract = new ethers.Contract(pool.poolContractAddress, JSON.parse(poolAbi.result), web3.getSigner());

    let tx ;
    
    try {
        tx = await poolContract.deposit(parseEther(amount));
    }
    catch(reason: any) {
        return reason.code;
    }

    const receipt: ethers.providers.TransactionReceipt = await tx.wait();

    return receipt.status ? receipt.status : 0;
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

    let tx ;

    try {
        tx = await poolContract.withdraw(parseEther("0"));
    }
    catch(reason: any) {
        return reason.code;
    }

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

    let tx ;
    
    try {
        tx = await poolContract.withdraw(parseEther(amount));
    }
    catch(reason: any) {
        return reason.code;
    }

    const receipt: ethers.providers.TransactionReceipt = await tx.wait();

    return receipt.status;
}