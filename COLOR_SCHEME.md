# Color Scheme Reference Guide

## New Color Palette

### Primary Colors
- **Burgundy**: `#773344` - Main brand color, buttons, headers
- **Beige**: `#E3B5A4` - Secondary color, accents, hover states  
- **Cream**: `#F5E9E2` - Background color, light sections

### Gradient Combinations
```css
/* Primary Gradient */
background: linear-gradient(to right, #773344, #E3B5A4);

/* Subtle Background Gradient */
background: linear-gradient(to bottom right, #F5E9E2, #ffffff);

/* Light Accent Gradient */
background: linear-gradient(to bottom right, rgba(119, 51, 68, 0.1), rgba(227, 181, 164, 0.1));
```

### Tailwind Classes
```jsx
// Backgrounds
className="bg-[#773344]"      // Burgundy solid
className="bg-[#E3B5A4]"      // Beige solid
className="bg-[#F5E9E2]"      // Cream solid

// Text colors
className="text-[#773344]"    // Burgundy text
className="text-[#E3B5A4]"    // Beige text

// Borders
className="border-[#773344]"
className="border-[#E3B5A4]"

// Gradients
className="bg-gradient-to-r from-[#773344] to-[#E3B5A4]"
className="bg-gradient-to-br from-[#F5E9E2] to-white"

// With opacity
className="bg-[#773344]/10"   // 10% opacity
className="bg-[#773344]/20"   // 20% opacity
className="text-[#773344]/80" // 80% opacity
```

## Old vs New Comparison

| Element | Old Color | New Color |
|---------|-----------|-----------|
| Primary | #7CE2A7 (Green) | #773344 (Burgundy) |
| Secondary | #7DC3EB (Blue) | #E3B5A4 (Beige) |
| Accent | #F9CBA2 (Orange) | #F5E9E2 (Cream) |
| Background | #FAF9F6 (Off-white) | #F5E9E2 (Cream) |

## Usage Guidelines

### Buttons
```jsx
// Primary button
<Button className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white hover:opacity-90">
  Click Me
</Button>

// Outline button
<Button variant="outline" className="border-[#773344] text-[#773344] hover:bg-[#773344]/10">
  Click Me
</Button>
```

### Cards & Sections
```jsx
// Card with gradient border effect
<Card className="border-2 hover:border-[#773344]">
  ...
</Card>

// Section with subtle background
<section className="bg-gradient-to-br from-[#F5E9E2] to-white">
  ...
</section>
```

### Links & Interactive Elements
```jsx
// Link
<Link className="text-[#773344] hover:text-[#E3B5A4] transition-colors">
  Link Text
</Link>

// Badge
<Badge className="bg-[#E3B5A4] text-white">Featured</Badge>
```

### Icons & Decorative Elements
```jsx
// Icon with gradient background
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#773344] to-[#E3B5A4] flex items-center justify-center">
  <Heart className="w-8 h-8 text-white" fill="white" />
</div>

// Light icon background
<div className="w-12 h-12 rounded-full bg-[#773344]/10 flex items-center justify-center">
  <Mail className="w-6 h-6 text-[#773344]" />
</div>
```

## CSS Variables Update

Update these in `globals.css`:

```css
:root {
  --primary: #773344;
  --secondary: #E3B5A4;
  --background: #F5E9E2;
  --accent: #773344;
  --accent-foreground: #ffffff;
}
```

## Accessibility Notes

- Burgundy (#773344) on white: WCAG AA compliant ✓
- Beige (#E3B5A4) on burgundy: Good contrast ✓
- Always use white text on burgundy backgrounds
- Use burgundy text on cream/white backgrounds
- For important CTAs, use the gradient: burgundy → beige

## Component-Specific Colors

### Navigation
- Background: White
- Links: #2C2C2C (dark gray)
- Active link: #773344
- Sign in button: Gradient (burgundy → beige)

### Footer
- Background: #F5E9E2
- Text: #2C2C2C
- Links: #773344
- Social icons: Burgundy with light backgrounds

### Hero Sections
- Background: Gradient from cream to white
- Heading: Dark gray (#2C2C2C)
- Highlighted text: Burgundy
- CTA buttons: Burgundy → Beige gradient

### Cards
- Background: White
- Border: Light gray
- Hover border: Burgundy
- Featured badge: Beige background

---

**Design Philosophy:**
The burgundy/beige/cream palette conveys:
- Warmth and compassion (essential for foster care)
- Professionalism and trust
- Sophistication without being cold
- Welcoming and family-friendly atmosphere
