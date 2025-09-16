import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Wallet, Lock } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="border-b border-border/50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Secure Value Vault</h1>
              <p className="text-sm text-muted-foreground">FHE-Encrypted Property Valuations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Lock className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">FHE Encrypted</span>
            </div>
            
            <ConnectButton 
              chainStatus="icon"
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
            
            {isConnected && (
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;