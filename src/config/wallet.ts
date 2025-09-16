import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { CONFIG } from './constants';

export const config = getDefaultConfig({
  appName: 'Secure Value Vault',
  projectId: CONFIG.WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
