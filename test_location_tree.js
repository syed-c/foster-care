const { getLocationTree } = require('./services/locationService');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testLocationTree() {
  try {
    console.log('Testing location tree API...');
    
    const tree = await getLocationTree(true);
    
    console.log('Tree structure:');
    console.log(JSON.stringify(tree, null, 2));
    
    // Check specific examples
    console.log('\n=== Sample Countries ===');
    tree.slice(0, 3).forEach(country => {
      console.log(`${country.name}: ${country.canonical_slug}`);
    });
    
    console.log('\n=== Sample Regions ===');
    if (tree[0] && tree[0].children) {
      tree[0].children.slice(0, 3).forEach(region => {
        console.log(`${region.name}: ${region.canonical_slug}`);
      });
    }
    
    console.log('\n=== Sample Cities ===');
    if (tree[0] && tree[0].children && tree[0].children[0] && tree[0].children[0].children) {
      tree[0].children[0].children.slice(0, 3).forEach(city => {
        console.log(`${city.name}: ${city.canonical_slug}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing location tree:', error);
    process.exit(1);
  }
}

testLocationTree();