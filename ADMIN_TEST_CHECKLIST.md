# CMS Admin Test Checklist

## Prerequisites
- [ ] Ensure you have admin access to the CMS
- [ ] Verify Supabase connection is working
- [ ] Confirm location content exists in the database

## Test 1: Edit Section Fields
1. [ ] Open CMS → Navigate to a region (e.g., England → Bedford)
2. [ ] Edit the Popular Cities section title
3. [ ] Change a city name in the list
4. [ ] Save the changes
5. [ ] Reload the admin page to confirm changes persisted
6. [ ] Load `/foster-agency/england/bedford` in browser
7. [ ] Verify updated title appears on live page
8. [ ] Verify updated city name appears on live page

## Test 2: Add New Content
1. [ ] In CMS, add a new agency to Top Agencies section
2. [ ] Include agency name, rating, and description
3. [ ] Save the changes
4. [ ] Reload admin page to confirm agency was added
5. [ ] Load live region page
6. [ ] Verify new agency appears in Top Agencies section

## Test 3: Section Order Verification
1. [ ] In CMS, reorder sections (drag and drop)
2. [ ] Save the changes
3. [ ] Reload admin page to confirm new order
4. [ ] Load live region page
5. [ ] Verify sections appear in the same order as CMS

## Test 4: All Sections Present
1. [ ] In CMS, ensure all sections are present for a region
2. [ ] Save the content
3. [ ] Load live region page
4. [ ] Verify all sections from CMS appear on live page
5. [ ] Check browser console for any undefined property errors

## Test 5: Country and City Pages
1. [ ] Edit content for a country page (e.g., England)
2. [ ] Edit content for a city page (e.g., London)
3. [ ] Save changes for both
4. [ ] Load respective live pages
5. [ ] Verify edits appear correctly on both pages

## Test 6: Dynamic Lists
1. [ ] In CMS, verify Popular Cities section uses dynamic data
2. [ ] In CMS, verify Top Agencies section uses dynamic data
3. [ ] Add/remove cities in database
4. [ ] Add/remove agencies in database
5. [ ] Load live pages
6. [ ] Verify lists update dynamically without code changes

## Test 7: Error Handling
1. [ ] Delete a section from CMS
2. [ ] Load live page
3. [ ] Verify page still loads without errors
4. [ ] Verify fallback content appears appropriately
5. [ ] Add section back in CMS
6. [ ] Verify it reappears on live page

## Test 8: Keys and Re-render Protection
1. [ ] Make multiple rapid edits in CMS
2. [ ] Save frequently
3. [ ] Verify no data loss occurs
4. [ ] Check browser console for re-render warnings
5. [ ] Verify editing state is properly maintained

## Test 9: Route Priority
1. [ ] Access various location URLs directly
2. [ ] Verify correct pages load (country, region, city)
3. [ ] Verify no routing conflicts occur
4. [ ] Check browser network tab for correct requests

## Test 10: Schema Compatibility
1. [ ] Create content with old schema format
2. [ ] Verify normalizeLocation handles it correctly
3. [ ] Create content with new schema format
4. [ ] Verify both work seamlessly

## Post-Test Verification
- [ ] All sections saved in CMS appear on live pages
- [ ] Section edits reflect immediately after save
- [ ] Dynamic lists (cities, agencies) update from database
- [ ] No console errors on live pages
- [ ] Route priority works correctly
- [ ] Fallback content displays when needed
- [ ] Keys prevent unnecessary re-renders
- [ ] Admin editor bindings work correctly