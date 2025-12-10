# Country Page System Documentation

This document describes the implementation of the country page system with animated transitions and CMS foundation.

## Overview

The country page system provides a single-page application experience with smooth animated transitions between country and county views. The system is built with Next.js, TypeScript, TailwindCSS, and Framer Motion.

## Key Features

1. **Single Route Architecture**: All country pages are served from `/foster-agency/[countrySlug]`
2. **Animated Transitions**: County cards expand to full-page views without URL changes
3. **CMS Integration**: All static content is editable through the CMS
4. **Responsive Design**: Mobile-first responsive layout
5. **Performance Optimized**: Client-side data fetching with loading states

## Technical Implementation

### Route Structure

```
app/
└── foster-agency/
    └── [countrySlug]/
        └── page.tsx
```

### API Endpoints

- `GET /api/foster-agency/[countrySlug]` - Fetch country data

### Database Schema

The system uses four main tables:

1. **countries**: Stores country information
   - id (UUID)
   - slug (TEXT)
   - title (TEXT)
   - description (TEXT)
   - intro_html (TEXT)
   - meta_title (TEXT)
   - meta_description (TEXT)
   - order (INTEGER)

2. **regions**: Stores regional information
   - id (UUID)
   - country_id (UUID) - Foreign key to countries
   - slug (TEXT)
   - title (TEXT)
   - description (TEXT)
   - order (INTEGER)

3. **counties**: Stores county information
   - id (UUID)
   - country_id (UUID) - Foreign key to countries
   - region_id (UUID) - Foreign key to regions
   - slug (TEXT)
   - title (TEXT)
   - description (TEXT)
   - order (INTEGER)

4. **country_page_blocks**: Stores CMS-editable content blocks
   - id (UUID)
   - country_id (UUID) - Foreign key to countries
   - type (TEXT)
   - content (JSONB)
   - order (INTEGER)

### Component Structure

```
CountryView (main page wrapper)
├── AnimatedPageWrapper (animation container)
│   ├── CountryView (country layout)
│   │   ├── Hero section
│   │   ├── Intro section
│   │   ├── Stats section
│   │   └── CountyGrid
│   │       └── CountyCard (individual cards)
│   └── CountyView (expanded county view)
│       └── CloseButton
```

### Animation Flow

1. User visits `/foster-agency/[countrySlug]`
2. Country data loads and displays grid of county cards
3. User clicks a county card
4. `useCountyTransition` hook manages state transition
5. Framer Motion animates card expansion to full page
6. `useDisableScroll` hook prevents background scrolling
7. User views expanded county content
8. User clicks close button
9. Reverse animation returns to country view

## CMS Integration

The CMS allows editing of all static content through the Sanity CMS:

- Country hero section
- Country intro text
- Country statistics
- County information

## Testing

### Manual Testing Steps

1. Visit `/foster-agency/england` to see the country page
2. Verify county cards display correctly
3. Click on a county card to see expansion animation
4. Verify close button returns to country view
5. Test responsive design on different screen sizes

### Automated Testing

Minimal tests are included for core functionality:
- Animation state transitions
- Data fetching and error handling
- Component rendering

## Deployment

The implementation is ready for deployment with no additional setup required beyond the standard Next.js deployment process.

## Maintenance

To modify the country page system:

1. Update components in `components/CountryPage/`
2. Modify styles in `styles/globals.css`
3. Extend types in `lib/types/country.ts`
4. Update CMS fields in `app/cms/edit/[countrySlug]/page.tsx`
5. Add new API endpoints in `app/api/foster-agency/[countrySlug]/route.ts`

## Future Enhancements

Potential improvements include:
- Adding more animation effects
- Implementing lazy loading for county data
- Adding search and filtering capabilities
- Extending CMS functionality
- Adding more interactive elements