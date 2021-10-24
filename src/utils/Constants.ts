import gql from "graphql-tag";

export const BOO_TOKEN_ADDRESS: string = "0x841fad6eae12c286d1fd18d1d525dffa75c7effe"
export const VMP_TOKEN_ADDRESS: string = "0x75F4234579a9Bb9Dd1cA1Ba4832634275Cb305B8"
export const INFINTY: string = "115792089237316195423570985008687907853269984665640564039257584007913129639935"

export function getFullTokenInfo(tokenAddress: string) {
    return gql`
        query GetFullTokenInfo {
            token(id: "${tokenAddress}") {
                id
                pairQuote(orderBy: reserveUSD, first: 10, orderDirection: desc) {
                    reserveUSD
                }
                tokenDayData(orderBy: date, orderDirection: desc, first: 1) {
                    priceUSD
                }
            }
        }
    `;
}

export function getTokenLiquidityInfo(tokenAddress: string) {
    return gql`
        query GetTokenLiquidityInfo {
            token(id: "${tokenAddress}") {
                id
                pairQuote(orderBy: reserveUSD, first: 10, orderDirection: desc) {
                    reserveUSD
                }
            }
        }
    `;
}

export function getTokenPriceInfo(tokenAddress: string) {
    return gql`
        query GetTokenPriceInfo {
            token(id: "${tokenAddress}") {
                id
                tokenDayData(orderBy: date, orderDirection: desc, first: 1) {
                    priceUSD
                }
            }
        }
    `;
}

export const ZERO_ADDRESS: string = "0x0000000000000000000000000000000000000000";
export const FTM_SCAN_API_KEY: string = "8ITSSZC5SEX7D74ERNYSS89MFG1GY7J1VU";
export const FTM_SCAN_BASE_URL: string = "https://api.ftmscan.com/api"
export const FTM_SCAN_MODULES = {
    ACCOUNT: 'account',
    STATS: 'stats',
}
export const FTM_SCAN_ACTIONS = {
    TOKEN_BALANCE: "tokenbalance",
    TOKEN_SUPPLY: "tokensupply"
}
export const FANTOM_CHAIN_DETAILS = {
    "chainId": '0xfa',
    "chainName": 'Fantom Opera',
    "nativeCurrency": {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18
    },
    "rpcUrls": ['https://rpc.ftm.tools/'],
    "blockExplorerUrls": ['https://ftmscan.com'],
}
export const FANTOM_TESTNET_CHAIN_DETAILS = {
    "chainId": '0xfa2',
    "chainName": 'Fantom Opera Testnet',
    "nativeCurrency": {
        name: 'Fantom Testnet',
        symbol: 'FTM',
        decimals: 18
    },
    "rpcUrls": ['https://rpc.testnet.fantom.network/'],
    "blockExplorerUrls": ['https://testnet.ftmscan.com/'],
}