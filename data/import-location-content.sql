-- Location Content Import SQL
-- Generated on 2025-11-29T07:36:00.302Z

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'country-england',
  'england',
  'england',
  NULL,
  NULL,
  'country',
  '/foster-agency/england',
  '{"title":"Foster Agencies in England","meta_title":"Foster Agencies in England | UK Foster Care Directory","meta_description":"Find accredited foster agencies in England. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in England","subheading":"Find accredited foster agencies in England","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Regions","link":"#regions"}},"overview":{"title":"About Fostering in England","body":"Welcome to our directory of foster agencies in England. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in England offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/england'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'country-scotland',
  'scotland',
  'scotland',
  NULL,
  NULL,
  'country',
  '/foster-agency/scotland',
  '{"title":"Foster Agencies in Scotland","meta_title":"Foster Agencies in Scotland | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Scotland. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Scotland","subheading":"Find accredited foster agencies in Scotland","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Regions","link":"#regions"}},"overview":{"title":"About Fostering in Scotland","body":"Welcome to our directory of foster agencies in Scotland. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in Scotland offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/scotland'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'country-wales',
  'wales',
  'wales',
  NULL,
  NULL,
  'country',
  '/foster-agency/wales',
  '{"title":"Foster Agencies in Wales","meta_title":"Foster Agencies in Wales | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Wales. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Wales","subheading":"Find accredited foster agencies in Wales","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Regions","link":"#regions"}},"overview":{"title":"About Fostering in Wales","body":"Welcome to our directory of foster agencies in Wales. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in Wales offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/wales'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'country-northern-ireland',
  'northern-ireland',
  'northern-ireland',
  NULL,
  NULL,
  'country',
  '/foster-agency/northern-ireland',
  '{"title":"Foster Agencies in Northern Ireland","meta_title":"Foster Agencies in Northern Ireland | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Northern Ireland. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Northern Ireland","subheading":"Find accredited foster agencies in Northern Ireland","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Regions","link":"#regions"}},"overview":{"title":"About Fostering in Northern Ireland","body":"Welcome to our directory of foster agencies in Northern Ireland. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in Northern Ireland offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/northern-ireland'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'region-greater-london',
  'greater-london',
  'england',
  'greater-london',
  NULL,
  'region',
  '/foster-agency/england/greater-london',
  '{"title":"Foster Agencies in Greater London","meta_title":"Foster Agencies in Greater London | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Greater London. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Greater London","subheading":"Find accredited foster agencies in Greater London","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Cities","link":"#cities"}},"about":{"title":"About Fostering in Greater London","body":"Welcome to our directory of foster agencies in Greater London. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Greater London offers diverse fostering opportunities with strong community support networks."}}'::jsonb,
  '/england/greater-london'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'region-west-midlands',
  'west-midlands',
  'england',
  'west-midlands',
  NULL,
  'region',
  '/foster-agency/england/west-midlands',
  '{"title":"Foster Agencies in West Midlands","meta_title":"Foster Agencies in West Midlands | UK Foster Care Directory","meta_description":"Find accredited foster agencies in West Midlands. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in West Midlands","subheading":"Find accredited foster agencies in West Midlands","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Cities","link":"#cities"}},"about":{"title":"About Fostering in West Midlands","body":"Welcome to our directory of foster agencies in West Midlands. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. West Midlands offers diverse fostering opportunities with strong community support networks."}}'::jsonb,
  '/england/west-midlands'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'region-greater-manchester',
  'greater-manchester',
  'england',
  'greater-manchester',
  NULL,
  'region',
  '/foster-agency/england/greater-manchester',
  '{"title":"Foster Agencies in Greater Manchester","meta_title":"Foster Agencies in Greater Manchester | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Greater Manchester. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Greater Manchester","subheading":"Find accredited foster agencies in Greater Manchester","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Cities","link":"#cities"}},"about":{"title":"About Fostering in Greater Manchester","body":"Welcome to our directory of foster agencies in Greater Manchester. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Greater Manchester offers diverse fostering opportunities with strong community support networks."}}'::jsonb,
  '/england/greater-manchester'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'region-glasgow-city',
  'glasgow-city',
  'scotland',
  'glasgow-city',
  NULL,
  'region',
  '/foster-agency/scotland/glasgow-city',
  '{"title":"Foster Agencies in Glasgow City","meta_title":"Foster Agencies in Glasgow City | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Glasgow City. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Glasgow City","subheading":"Find accredited foster agencies in Glasgow City","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Cities","link":"#cities"}},"about":{"title":"About Fostering in Glasgow City","body":"Welcome to our directory of foster agencies in Glasgow City. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Glasgow City offers diverse fostering opportunities with strong community support networks."}}'::jsonb,
  '/scotland/glasgow-city'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'region-cardiff',
  'cardiff',
  'wales',
  'cardiff',
  NULL,
  'region',
  '/foster-agency/wales/cardiff',
  '{"title":"Foster Agencies in Cardiff","meta_title":"Foster Agencies in Cardiff | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Cardiff. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Cardiff","subheading":"Find accredited foster agencies in Cardiff","cta_primary":{"text":"Get Foster Agency Support","link":"/contact"},"cta_secondary":{"text":"Explore Cities","link":"#cities"}},"about":{"title":"About Fostering in Cardiff","body":"Welcome to our directory of foster agencies in Cardiff. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Cardiff offers diverse fostering opportunities with strong community support networks."}}'::jsonb,
  '/wales/cardiff'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'city-london',
  'london',
  'england',
  'greater-london',
  'london',
  'city',
  '/foster-agency/england/greater-london/london',
  '{"title":"Foster Agencies in London","meta_title":"Foster Agencies in London | UK Foster Care Directory","meta_description":"Find accredited foster agencies in London. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in London","subheading":"Find accredited foster agencies in London","cta_primary":{"text":"Talk to a Foster Advisor","link":"/contact"},"cta_secondary":{"text":"View Agencies","link":"#agencies"}},"about":{"title":"About Fostering in London","body":"Welcome to our directory of foster agencies in London. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in London offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/england/greater-london/london'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'city-birmingham',
  'birmingham',
  'england',
  'west-midlands',
  'birmingham',
  'city',
  '/foster-agency/england/west-midlands/birmingham',
  '{"title":"Foster Agencies in Birmingham","meta_title":"Foster Agencies in Birmingham | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Birmingham. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Birmingham","subheading":"Find accredited foster agencies in Birmingham","cta_primary":{"text":"Talk to a Foster Advisor","link":"/contact"},"cta_secondary":{"text":"View Agencies","link":"#agencies"}},"about":{"title":"About Fostering in Birmingham","body":"Welcome to our directory of foster agencies in Birmingham. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in Birmingham offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/england/west-midlands/birmingham'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'city-manchester',
  'manchester',
  'england',
  'greater-manchester',
  'manchester',
  'city',
  '/foster-agency/england/greater-manchester/manchester',
  '{"title":"Foster Agencies in Manchester","meta_title":"Foster Agencies in Manchester | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Manchester. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Manchester","subheading":"Find accredited foster agencies in Manchester","cta_primary":{"text":"Talk to a Foster Advisor","link":"/contact"},"cta_secondary":{"text":"View Agencies","link":"#agencies"}},"about":{"title":"About Fostering in Manchester","body":"Welcome to our directory of foster agencies in Manchester. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in Manchester offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/england/greater-manchester/manchester'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'city-glasgow',
  'glasgow',
  'scotland',
  'glasgow-city',
  'glasgow',
  'city',
  '/foster-agency/scotland/glasgow-city/glasgow',
  '{"title":"Foster Agencies in Glasgow","meta_title":"Foster Agencies in Glasgow | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Glasgow. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Glasgow","subheading":"Find accredited foster agencies in Glasgow","cta_primary":{"text":"Talk to a Foster Advisor","link":"/contact"},"cta_secondary":{"text":"View Agencies","link":"#agencies"}},"about":{"title":"About Fostering in Glasgow","body":"Welcome to our directory of foster agencies in Glasgow. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in Glasgow offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/scotland/glasgow-city/glasgow'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  'city-cardiff-city',
  'cardiff-city',
  'wales',
  'cardiff',
  'cardiff-city',
  'city',
  '/foster-agency/wales/cardiff/cardiff',
  '{"title":"Foster Agencies in Cardiff","meta_title":"Foster Agencies in Cardiff | UK Foster Care Directory","meta_description":"Find accredited foster agencies in Cardiff. Expert support and guidance for prospective foster carers.","hero":{"heading":"Foster Agencies in Cardiff","subheading":"Find accredited foster agencies in Cardiff","cta_primary":{"text":"Talk to a Foster Advisor","link":"/contact"},"cta_secondary":{"text":"View Agencies","link":"#agencies"}},"about":{"title":"About Fostering in Cardiff","body":"Welcome to our directory of foster agencies in Cardiff. We''ve compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in Cardiff offers a rewarding opportunity to make a positive impact on a child''s life while being part of a supportive community."}}'::jsonb,
  '/wales/cardiff/cardiff-city'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

