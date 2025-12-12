import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Fetch CMS page content by slug
 * @param {string} slug - The page slug
 * @returns {Promise<Object>} The page content with sections and fields
 */
export async function fetchCMSPageContent(slug) {
  try {
    // Fetch the page
    const { data: page, error: pageError } = await supabase
      .from('cms_pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (pageError) {
      console.error('Error fetching CMS page:', pageError);
      return null;
    }

    if (!page) {
      return null;
    }

    // Fetch sections for this page
    const { data: sections, error: sectionsError } = await supabase
      .from('cms_page_sections')
      .select(`
        *,
        cms_section_fields(*)
      `)
      .eq('page_id', page.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (sectionsError) {
      console.error('Error fetching CMS sections:', sectionsError);
      return { ...page, sections: [] };
    }

    // Transform sections to match the expected format
    const transformedSections = sections.map(section => ({
      id: section.id,
      type: section.section_type,
      key: section.section_key,
      data: {
        ...section.content,
        // Add individual fields as properties
        ...Object.fromEntries(
          section.cms_section_fields.map(field => [field.field_key, field.field_value])
        )
      }
    }));

    return {
      ...page,
      sections: transformedSections
    };
  } catch (error) {
    console.error('Error in fetchCMSPageContent:', error);
    return null;
  }
}

/**
 * Fetch location page content (fallback to existing system)
 * @param {string} canonicalSlug - The canonical slug for the location
 * @returns {Promise<Object>} The location content
 */
export async function fetchLocationContent(canonicalSlug) {
  try {
    // Try to fetch from CMS first
    const cmsContent = await fetchCMSPageContent(canonicalSlug.replace('/foster-agency/', ''));
    
    if (cmsContent) {
      return cmsContent;
    }

    // Fallback to existing location_content table
    const { data: content, error } = await supabase
      .from('location_content')
      .select('content_json')
      .eq('canonical_slug', canonicalSlug)
      .single();

    if (error) {
      console.error('Error fetching location content:', error);
      return null;
    }

    return content?.content_json || null;
  } catch (error) {
    console.error('Error in fetchLocationContent:', error);
    return null;
  }
}

/**
 * Update a CMS field value
 * @param {string} fieldId - The field ID
 * @param {string} value - The new value
 * @returns {Promise<boolean>} Success status
 */
export async function updateCMSField(fieldId, value) {
  try {
    const { error } = await supabase
      .from('cms_section_fields')
      .update({ 
        field_value: value,
        updated_at: new Date().toISOString()
      })
      .eq('id', fieldId);

    if (error) {
      console.error('Error updating CMS field:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateCMSField:', error);
    return false;
  }
}