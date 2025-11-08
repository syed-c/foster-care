// Migration to add canonical_slug column and backfill data
exports.up = async function(knex) {
  // Add canonical_slug column to countries, regions, and cities tables
  await knex.schema.table('countries', function(table) {
    table.string('canonical_slug').unique();
  });
  
  await knex.schema.table('regions', function(table) {
    table.string('canonical_slug').unique();
  });
  
  await knex.schema.table('cities', function(table) {
    table.string('canonical_slug').unique();
  });
  
  // Backfill canonical_slug for countries
  const countries = await knex('countries').select('id', 'slug');
  for (const country of countries) {
    const canonicalSlug = `/foster-agency/${country.slug}`;
    await knex('countries')
      .where('id', country.id)
      .update({ canonical_slug: canonicalSlug });
  }
  
  // Backfill canonical_slug for regions
  const regions = await knex('regions')
    .select('regions.id', 'regions.slug', 'countries.slug as country_slug')
    .join('countries', 'regions.country_id', '=', 'countries.id');
  for (const region of regions) {
    const canonicalSlug = `/foster-agency/${region.country_slug}/${region.slug}`;
    await knex('regions')
      .where('id', region.id)
      .update({ canonical_slug: canonicalSlug });
  }
  
  // Backfill canonical_slug for cities
  const cities = await knex('cities')
    .select(
      'cities.id', 
      'cities.slug', 
      'regions.slug as region_slug', 
      'countries.slug as country_slug'
    )
    .join('regions', 'cities.region_id', '=', 'regions.id')
    .join('countries', 'cities.country_id', '=', 'countries.id');
  for (const city of cities) {
    const canonicalSlug = `/foster-agency/${city.country_slug}/${city.region_slug}/${city.slug}`;
    await knex('cities')
      .where('id', city.id)
      .update({ canonical_slug: canonicalSlug });
  }
};

exports.down = async function(knex) {
  // Remove canonical_slug columns
  await knex.schema.table('countries', function(table) {
    table.dropColumn('canonical_slug');
  });
  
  await knex.schema.table('regions', function(table) {
    table.dropColumn('canonical_slug');
  });
  
  await knex.schema.table('cities', function(table) {
    table.dropColumn('canonical_slug');
  });
};