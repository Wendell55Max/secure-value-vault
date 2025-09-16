import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, TrendingUp, Users, Globe } from "lucide-react";
import Header from "@/components/Header";
import PropertyForm from "@/components/PropertyForm";
import AppraisalDashboard from "@/components/AppraisalDashboard";
import heroImage from "@/assets/hero-property.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border/50">
          <div className="container mx-auto px-6">
            <TabsList className="bg-transparent border-0 h-12 p-0 space-x-8">
              <TabsTrigger 
                value="home" 
                className="bg-transparent border-0 px-0 pb-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
              >
                Home
              </TabsTrigger>
              <TabsTrigger 
                value="appraise" 
                className="bg-transparent border-0 px-0 pb-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
              >
                New Appraisal
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard" 
                className="bg-transparent border-0 px-0 pb-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
              >
                Dashboard
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="home" className="mt-0">
          <div className="relative">
            {/* Hero Section */}
            <div className="relative h-[70vh] overflow-hidden">
              <img 
                src={heroImage} 
                alt="Encrypted Real Estate Appraisals"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
              <div className="relative container mx-auto px-6 h-full flex items-center">
                <div className="max-w-2xl space-y-6">
                  <h1 className="text-5xl font-bold leading-tight">
                    Property Values,{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Privately Computed
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    Revolutionary encrypted real estate appraisals that protect sensitive data while delivering accurate valuations using zero-knowledge proofs.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => setActiveTab("appraise")}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
                    >
                      Start Encrypted Appraisal
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setActiveTab("dashboard")}
                      className="border-primary/30 hover:bg-primary/10 px-8"
                    >
                      View Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose Encrypted Appraisals?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Advanced cryptographic techniques ensure your property data remains completely private throughout the valuation process.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 rounded-full bg-primary/20 w-fit mx-auto mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Zero-Knowledge Proofs</h3>
                    <p className="text-muted-foreground">
                      Appraisals computed without revealing sensitive property data to assessors or third parties.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto mb-4">
                      <Lock className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
                    <p className="text-muted-foreground">
                      All property data encrypted from submission to final appraisal report delivery.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 rounded-full bg-success/20 w-fit mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Accurate Valuations</h3>
                    <p className="text-muted-foreground">
                      Advanced ML models deliver precise appraisals while maintaining complete data privacy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-muted/20 to-muted/10 border-y border-border/50">
              <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
                    <p className="text-sm text-muted-foreground">Privacy Score</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">$2.4B+</div>
                    <p className="text-sm text-muted-foreground">Properties Valued</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-success mb-2">5,247</div>
                    <p className="text-sm text-muted-foreground">Encrypted Appraisals</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">0</div>
                    <p className="text-sm text-muted-foreground">Data Breaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appraise" className="mt-0">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">New Encrypted Appraisal</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Submit your property information securely. All data is encrypted before processing and never exposed to assessors.
              </p>
            </div>
            <PropertyForm />
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="mt-0">
          <div className="container mx-auto px-6 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Appraisal Dashboard</h2>
              <p className="text-muted-foreground">
                Monitor your encrypted appraisals and download privacy-sealed reports.
              </p>
            </div>
            <AppraisalDashboard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
