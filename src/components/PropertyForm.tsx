import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Upload, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyForm = () => {
  const [isEncrypted, setIsEncrypted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEncrypted(true);
    toast({
      title: "Property Encrypted Successfully",
      description: "Your property data has been encrypted and is ready for appraisal.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Property Information
            </CardTitle>
            <CardDescription>
              Enter property details for encrypted valuation
            </CardDescription>
          </div>
          <Badge variant={isEncrypted ? "default" : "secondary"} className="bg-success/10 text-success border-success/20">
            {isEncrypted ? (
              <>
                <Lock className="h-3 w-3 mr-1" />
                Encrypted
              </>
            ) : (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Not Encrypted
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Property Address</Label>
              <Input 
                id="address" 
                placeholder="123 Main Street" 
                className="bg-input border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select>
                <SelectTrigger className="bg-input border-border/50">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input 
                id="bedrooms" 
                type="number" 
                placeholder="3" 
                className="bg-input border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input 
                id="bathrooms" 
                type="number" 
                placeholder="2" 
                className="bg-input border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sqft">Square Feet</Label>
              <Input 
                id="sqft" 
                type="number" 
                placeholder="1500" 
                className="bg-input border-border/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Textarea 
              id="description" 
              placeholder="Any additional property details..."
              className="bg-input border-border/50 min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Property Documents</Label>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop files or <span className="text-primary cursor-pointer">browse</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Photos, deeds, inspection reports (Max 10MB)
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Lock className="h-4 w-4 mr-2" />
              Encrypt & Submit for Appraisal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;