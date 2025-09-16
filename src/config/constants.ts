// Configuration constants for the Secure Value Vault application
export const CONFIG = {
  CHAIN_ID: 11155111, // Sepolia testnet
  RPC_URL: 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  WALLET_CONNECT_PROJECT_ID: '2ec9743d0d0cd7fb94dee1a7e6d33475',
  INFURA_API_KEY: 'b18fb7e6ca7045ac83c41157ab93f990',
  RPC_URL_ALT: 'https://1rpc.io/sepolia',
} as const;

// Contract addresses (to be deployed)
export const CONTRACT_ADDRESSES = {
  SECURE_VAULT: '0x0000000000000000000000000000000000000000', // To be updated after deployment
} as const;
