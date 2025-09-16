# Secure Value Vault

A secure, encrypted property valuation platform built with Fully Homomorphic Encryption (FHE) technology. This application enables confidential property appraisals while maintaining data privacy through advanced cryptographic techniques.

## Features

- **FHE-Encrypted Valuations**: All property data and valuations are encrypted using Fully Homomorphic Encryption
- **Web3 Integration**: Built with RainbowKit and Wagmi for seamless wallet connectivity
- **Secure Smart Contracts**: Deployed on Sepolia testnet with FHE-enabled Solidity contracts
- **Real-time Dashboard**: Interactive property valuation management interface
- **Reputation System**: Trust-based appraiser and user reputation scoring
- **Multi-wallet Support**: Compatible with MetaMask, WalletConnect, and other popular wallets

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **Web3**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: Zama FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, etc.)
- Sepolia ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/Wendell55Max/secure-value-vault.git

# Navigate to the project directory
cd secure-value-vault

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration

The application is configured to work with Sepolia testnet by default. Key configuration values:

- **Chain ID**: 11155111 (Sepolia)
- **RPC URL**: https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
- **Wallet Connect Project ID**: 2ec9743d0d0cd7fb94dee1a7e6d33475

## Smart Contract

The `SecureValueVault.sol` contract implements:

- **Property Valuations**: Encrypted storage of property data and estimated values
- **Valuation Requests**: Secure request system for property appraisals
- **Appraisal Reports**: FHE-encrypted appraisal results and confidence scores
- **Reputation Management**: Trust scoring for users and appraisers
- **Risk Assessment**: Encrypted risk calculation algorithms

## Usage

1. **Connect Wallet**: Use the RainbowKit connect button to link your Web3 wallet
2. **Create Property**: Add a new property with encrypted valuation data
3. **Request Appraisal**: Submit valuation requests for properties
4. **Submit Reports**: Appraisers can submit encrypted appraisal reports
5. **View Dashboard**: Monitor all valuations and reputation scores

## Security Features

- **FHE Encryption**: All sensitive data remains encrypted during computation
- **Zero-Knowledge Proofs**: Verification without revealing underlying data
- **Reputation System**: Trust-based access control
- **Audit Trail**: Immutable blockchain records of all transactions

## Deployment

### Vercel Deployment

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project in Vercel dashboard
4. Configure environment variables
5. Deploy to production

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Join our community discussions

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced FHE operations
- [ ] Mobile application
- [ ] API integration
- [ ] Advanced analytics dashboard
