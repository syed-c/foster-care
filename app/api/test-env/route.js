export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  return Response.json({
    hasApiKey: !!apiKey,
    isPlaceholder: apiKey === 'your-google-maps-api-key',
    isEmpty: apiKey === '',
    keyLength: apiKey ? apiKey.length : 0,
    keyStart: apiKey ? apiKey.substring(0, 10) : null,
    setupInstructions: "If you see RefererNotAllowedMapError, configure HTTP referrer restrictions in Google Cloud Console. Add http://localhost:3000/* and http://localhost:3001/* to allowed referrers. See GOOGLE_MAPS_SETUP.md for detailed instructions."
  });
}