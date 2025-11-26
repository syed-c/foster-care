'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Download } from 'lucide-react';

export default function ClientGMBImportPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [importMode, setImportMode] = useState('city');
  const [apiKey, setApiKey] = useState('');
  const [keyword, setKeyword] = useState('foster agency');
  const [limit, setLimit] = useState(10);
  const [customLimit, setCustomLimit] = useState(10);
  const [avoidDuplicates, setAvoidDuplicates] = useState(true);
  const [markAsVerified, setMarkAsVerified] = useState(false);
  const [markAsFeatured, setMarkAsFeatured] = useState(false);
  const [importResults, setImportResults] = useState(null);

  // Mock data for demonstration - in a real app, this would come from an API
  useEffect(() => {
    // Simulate loading location data
    setCountries(['England', 'Scotland', 'Wales', 'Northern Ireland']);
    setRegions(['Greater London', 'West Midlands', 'Greater Manchester']);
    setCities(['London', 'Birmingham', 'Manchester']);
  }, []);

  // Update regions when country changes
  useEffect(() => {
    if (selectedCountry) {
      // In a real app, this would fetch regions for the selected country
      setRegions(['Greater London', 'West Midlands', 'Greater Manchester']);
      setSelectedRegion('');
      setSelectedCity('');
    }
  }, [selectedCountry]);

  // Update cities when region changes
  useEffect(() => {
    if (selectedRegion) {
      // In a real app, this would fetch cities for the selected region
      setCities(['London', 'Birmingham', 'Manchester']);
      setSelectedCity('');
    }
  }, [selectedRegion]);

  const handleTestApiKey = async () => {
    if (!apiKey) {
      toast({
        title: 'Error',
        description: 'Please enter a Google Places API key',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would call the API to test the key
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Success',
        description: 'API key is valid',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid API key',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    if (!apiKey) {
      toast({
        title: 'Error',
        description: 'Please enter a Google Places API key',
        variant: 'destructive',
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      const response = await fetch('/api/import-gmb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          keyword,
          country: selectedCountry,
          region: selectedRegion,
          city: selectedCity,
          importMode,
          limit: limit === -1 ? customLimit : limit,
          avoidDuplicates,
          markAsVerified,
          markAsFeatured
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Import failed');
      }

      setImportResults(data);
      
      toast({
        title: 'Import Complete',
        description: `Processed ${data.processed} agencies, inserted ${data.inserted}, skipped ${data.skipped}`,
      });
    } catch (error) {
      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleExportCSV = () => {
    // In a real implementation, this would export the imported results to CSV
    toast({
      title: 'Export Started',
      description: 'CSV export will begin shortly',
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Google Business Import Tool</CardTitle>
          <CardDescription>
            Import GMB profiles automatically into your agencies database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select 
                value={selectedRegion} 
                onValueChange={setSelectedRegion}
                disabled={!selectedCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select 
                value={selectedCity} 
                onValueChange={setSelectedCity}
                disabled={!selectedRegion}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Import Mode */}
          <div className="space-y-2">
            <Label>Import Mode</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="import-country" 
                  checked={importMode === 'country'}
                  onCheckedChange={() => setImportMode('country')}
                />
                <Label htmlFor="import-country">Import entire country</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="import-region" 
                  checked={importMode === 'region'}
                  onCheckedChange={() => setImportMode('region')}
                />
                <Label htmlFor="import-region">Import entire region</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="import-city" 
                  checked={importMode === 'city'}
                  onCheckedChange={() => setImportMode('city')}
                />
                <Label htmlFor="import-city">Import entire city</Label>
              </div>
            </div>
          </div>
          
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="api-key">Google Places API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Google Places API key"
              />
              <Button 
                onClick={handleTestApiKey} 
                disabled={isLoading}
                className="whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Save & Test API'
                )}
              </Button>
            </div>
          </div>
          
          {/* Keyword */}
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword</Label>
            <Input
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword (e.g., foster agency)"
            />
            <p className="text-sm text-muted-foreground">
              Example: "foster agency"
            </p>
          </div>
          
          {/* Limit */}
          <div className="space-y-2">
            <Label htmlFor="limit">How many listings to import</Label>
            <div className="grid grid-cols-5 gap-2">
              {[10, 50, 100, 500].map((value) => (
                <Button
                  key={value}
                  variant={limit === value ? "default" : "outline"}
                  onClick={() => setLimit(value)}
                >
                  {value}
                </Button>
              ))}
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  value={limit === -1 ? customLimit : limit}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 10;
                    setCustomLimit(value);
                    setLimit(-1);
                  }}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="avoid-duplicates" 
                checked={avoidDuplicates}
                onCheckedChange={(checked) => setAvoidDuplicates(checked)}
              />
              <Label htmlFor="avoid-duplicates">Avoid duplicates automatically</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mark-verified" 
                checked={markAsVerified}
                onCheckedChange={(checked) => setMarkAsVerified(checked)}
              />
              <Label htmlFor="mark-verified">Mark imported agencies as Verified</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mark-featured" 
                checked={markAsFeatured}
                onCheckedChange={(checked) => setMarkAsFeatured(checked)}
              />
              <Label htmlFor="mark-featured">Mark imported agencies as Featured</Label>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleImport} 
              disabled={isImporting}
              className="flex-1"
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                'Start Import'
              )}
            </Button>
            
            {importResults && (
              <Button 
                onClick={handleExportCSV}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export to CSV
              </Button>
            )}
          </div>
          
          {/* Import Log */}
          {(isImporting || importResults) && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Import Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {isImporting && (
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing agencies...
                  </div>
                )}
                
                {importResults && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Processed</p>
                        <p className="text-2xl font-bold">{importResults.processed}</p>
                      </div>
                      <div className="p-4 bg-green-500/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Inserted</p>
                        <p className="text-2xl font-bold text-green-500">{importResults.inserted}</p>
                      </div>
                      <div className="p-4 bg-yellow-500/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Skipped</p>
                        <p className="text-2xl font-bold text-yellow-500">{importResults.skipped}</p>
                      </div>
                    </div>
                    
                    {importResults.errors.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Errors:</h3>
                        <ul className="space-y-1">
                          {importResults.errors.map((error, index) => (
                            <li key={index} className="text-sm text-red-500">
                              • {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}