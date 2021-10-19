import axios from "axios";
import { FTM_SCAN_ACTIONS, FTM_SCAN_API_KEY, FTM_SCAN_BASE_URL, FTM_SCAN_MODULES, ZERO_ADDRESS } from "./Constants";
import { FtmScanResponse } from "./entities/BurnedTokenResponse";

export async function getTotalSupply(tokenAddress: string):Promise<string> {
    return axios.get<FtmScanResponse>(
        FTM_SCAN_BASE_URL + "?" +
        "module=" + FTM_SCAN_MODULES.STATS + "&" +
        "action=" + FTM_SCAN_ACTIONS.TOKEN_SUPPLY  + "&" +
        "contractaddress=" + tokenAddress + "&" +
        "apikey=" + FTM_SCAN_API_KEY
    )
    .then(result => result.data.result);
}

export async function getBurnedTokens(tokenAddress: string): Promise<string> {
    return axios.get<FtmScanResponse>(
        FTM_SCAN_BASE_URL + "?" +
        "module=" + FTM_SCAN_MODULES.ACCOUNT + "&" +
        "action=" + FTM_SCAN_ACTIONS.TOKEN_BALANCE + "&" +
        "contractaddress=" + tokenAddress + "&" +
        "address=" + ZERO_ADDRESS + "&" +
        "tag=latest" + "&" +
        "apikey=" + FTM_SCAN_API_KEY
    )
    .then(result => result.data.result)
}