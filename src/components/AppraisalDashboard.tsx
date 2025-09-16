import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Clock, DollarSign, FileText, Download, Eye, Lock } from "lucide-react";

const AppraisalDashboard = () => {
  const appraisals = [
    {
      id: "APR-2024-001",
      address: "123 Oak Street, Beverly Hills, CA",
      status: "completed",
      value: "$2,450,000",
      confidence: 94,
      date: "2024-01-15",
      encrypted: true
    },
    {
      id: "APR-2024-002", 
      address: "456 Maple Avenue, Manhattan, NY",
      status: "processing",
      value: "Processing...",
      confidence: 0,
      date: "2024-01-16",
      encrypted: true
    },
    {
      id: "APR-2024-003",
      address: "789 Pine Street, Miami, FL", 
      status: "pending",
      value: "Pending Review",
      confidence: 0,
      date: "2024-01-16",
      encrypted: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success border-success/20";
      case "processing": return "bg-warning/10 text-warning border-warning/20";
      case "pending": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appraisals</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value Assessed</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42.8M</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Zero data breaches
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Recent Encrypted Appraisals
          </CardTitle>
          <CardDescription>
            All appraisals are performed on encrypted data with zero-knowledge proofs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appraisals.map((appraisal) => (
              <div key={appraisal.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-gradient-to-r from-muted/20 to-muted/10">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{appraisal.address}</p>
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      <Shield className="h-3 w-3 mr-1" />
                      Encrypted
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>ID: {appraisal.id}</span>
                    <span>Date: {appraisal.date}</span>
                    {appraisal.status === "completed" && (
                      <span>Confidence: {appraisal.confidence}%</span>
                    )}
                  </div>
                  {appraisal.status === "processing" && (
                    <Progress value={67} className="w-full h-1 mt-2" />
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-sm">{appraisal.value}</p>
                    <Badge className={`text-xs ${getStatusColor(appraisal.status)}`}>
                      {appraisal.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                      {appraisal.status.charAt(0).toUpperCase() + appraisal.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {appraisal.status === "completed" && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalDashboard;