export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return Response.json({
      error: "Google Maps API key not configured",
      solution: "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file"
    }, { status: 500 });
  }
  
  // Test the Static Maps API
  const testUrl = `https://maps.googleapis.com/maps/api/staticmap?center=51.5074,-0.1278&zoom=10&size=400x400&key=${apiKey}`;
  
  try {
    // Make a simple fetch request to test the API key
    const response = await fetch(testUrl);
    const contentType = response.headers.get('content-type');
    
    return Response.json({
      success: response.ok,
      status: response.status,
      contentType: contentType,
      apiKeyConfigured: !!apiKey,
      keyLength: apiKey.length,
      testUrl: testUrl.substring(0, 100) + "...",
      isImage: contentType && contentType.includes('image'),
      message: response.ok 
        ? "API key appears to be working correctly" 
        : "API key may have issues - check the status code and error message"
    });
  } catch (error) {
    return Response.json({
      error: "Failed to test Google Maps API",
      message: error.message,
      solution: "Check your internet connection and API key configuration"
    }, { status: 500 });
  }
}