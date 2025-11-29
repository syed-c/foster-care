// Migration to create location_content table for CMS content
exports.up = async function(knex) {
  // Create location_content table
  await knex.schema.createTableIfNotExists('location_content', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('location_id').notNullable();
    table.enu('template_type', ['country', 'region', 'city']).notNullable();
    table.text('canonical_slug').unique().notNullable();
    table.jsonb('content_json');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // Create indexes for better performance
  await knex.schema.table('location_content', function(table) {
    table.index('canonical_slug');
    table.index('location_id');
    table.index('template_type');
  });

  // Add foreign key constraint
  await knex.schema.table('location_content', function(table) {
    table.foreign('location_id').references('id').inTable('locations');
  });

  // Create trigger for updated_at
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS update_location_content_updated_at ON location_content;
  `);

  await knex.raw(`
    CREATE TRIGGER update_location_content_updated_at 
    BEFORE UPDATE ON location_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
  `);
};

exports.down = async function(knex) {
  // Drop trigger
  await knex.raw(`
    DROP TRIGGER IF EXISTS update_location_content_updated_at ON location_content;
  `);

  // Drop table
  await knex.schema.dropTableIfExists('location_content');
};