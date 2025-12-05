# Google Maps API Setup Guide

This guide explains how to properly configure Google Maps API for the foster care agency directory.

## Error: RefererNotAllowedMapError

This error occurs when the Google Maps API key is restricted to specific websites (HTTP referrers) but the requesting URL is not in the allowed list.

## Solution

### Step 1: Configure HTTP Referrer Restrictions in Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Find your API key (the one used in `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
5. Click on the pencil/edit icon to modify the key
6. Under "Application restrictions", select "HTTP referrers (websites)"
7. In the "Website restrictions" section, add these entries:
   ```
   http://localhost:3000/*
   http://localhost:3001/*
   https://yourdomain.com/*
   ```
8. Click "Save"

### Step 2: Enable Required APIs

Make sure these APIs are enabled in your Google Cloud project:
1. Maps JavaScript API
2. Maps Static API (for static map images)
3. Geocoding API (for address lookups)

To enable APIs:
1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for each API name above
3. Click on the API and press "Enable"

### Step 3: Environment Configuration

Create or update your `.env.local` file in the project root:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your actual Google Maps API key.

### Step 4: Verification

After making these changes:
1. Restart your development server
2. Visit a page that uses Google Maps (e.g., agency detail page)
3. The map should now load correctly

## Best Practices

1. **Use different API keys for development and production**
2. **Restrict API keys to only the necessary APIs**
3. **Regularly audit API key usage in Google Cloud Console**
4. **Set appropriate quotas and billing alerts**

## Troubleshooting

If you still encounter issues:

1. Check browser console for detailed error messages
2. Verify the API key is correct and has no typos
3. Ensure the APIs are enabled in Google Cloud Console
4. Confirm HTTP referrer restrictions include your domain
5. Wait a few minutes after making changes for propagation

For more information, visit: https://developers.google.com/maps/documentation/javascript/error-messages#referer-not-allowed-map-error