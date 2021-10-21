import { ethers } from "ethers";
import { ref } from "vue";
import { FANTOM_TESTNET_CHAIN_DETAILS } from "../utils/Constants";

export let web3: ethers.providers.Web3Provider | null = null;
export let ACCOUNT = ref('Connect Wallet');

export async function connect() {
    if ((window as any).ethereum) {
        web3 = new ethers.providers.Web3Provider((window as any).ethereum);
        await web3.send("eth_requestAccounts", []);

        let address = await web3.getSigner().getAddress();

        const chainId = (await web3.getNetwork()).chainId;
        checkChainId(chainId).then(() => ACCOUNT.value = address)
    }
}

async function checkChainId(chainId: number): Promise<void> {
    if (/*chainId !== 250 &&*/ chainId !== 4002) {
        try {
            await web3?.send('wallet_switchEthereumChain', [{ chainId: FANTOM_TESTNET_CHAIN_DETAILS.chainId }])
            return Promise.resolve();
        }
        catch (switchError) {
            if ((<any>switchError).code === 4902 || (<any>switchError).code === -32603) {
                try {
                    await web3?.send('wallet_addEthereumChain', [FANTOM_TESTNET_CHAIN_DETAILS])
                    return Promise.resolve();
                }
                catch (addError) {
                    return Promise.reject("Chain does not exist on your wallet")
                }
            }
            else {
                return Promise.reject("Chain does not exist on your wallet")
            }
        }
    }
    else {
        return Promise.resolve();
    }
}