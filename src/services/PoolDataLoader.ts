import { PoolEntity } from "../utils/entities/PoolEntity";
import { web3 } from "./Wallet";
import poolAbi from "../abi/Pool.json";
import tokenAbi from "../abi/Token.json";
import { BigNumber, ethers } from "ethers";
import { PoolInfoResponse } from "../utils/entities/PoolInfoResponse";
import { UserInfoPoolResponse } from "../utils/entities/UserInfoResponse";

export async function loadPoolData(pool: PoolEntity, apolloProvider: string): Promise<PoolEntity> {
    if (!web3) {
        return Promise.reject("Your wallet is not connected");
    }

    const chainId = (await web3.getNetwork()).chainId;
    if (chainId !== 4002) {
        return Promise.reject("You are not connected to the right network");
    }

    const poolContract = new ethers.Contract(pool.poolContractAddress, JSON.parse(poolAbi.result), web3.getSigner());
    const stakedTokenContract = new ethers.Contract(pool.stakeTokenAddress, JSON.parse(tokenAbi.result), web3.getSigner());

    const address = web3.getSigner().getAddress();

    pool.walletTokens = (await stakedTokenContract.balanceOf(address) as unknown as BigNumber).toString();
    pool.approved = (await stakedTokenContract.allowance(address, pool.poolContractAddress) as unknown as BigNumber).gt(0);
    pool.depositFee = (await poolContract.FEE() as unknown as BigNumber).div(10).toString();
    pool.pendingReward = (await poolContract.pendingReward(address) as unknown as BigNumber).toString();
    pool.depositedTokens = (await poolContract.userInfo(address) as unknown as UserInfoPoolResponse).amount.toString();

    pool.rewardPerSecond = (await poolContract.rewardPerSecond() as unknown as BigNumber);
    pool.totalStaked = (await poolContract.poolInfo(0) as unknown as PoolInfoResponse).totalStaked;

    return Promise.resolve(pool);
}