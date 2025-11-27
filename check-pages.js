const { sanityClient } = require('./lib/sanity');

async function checkPages() {
  try {
    const pages = await sanityClient.fetch('*[_type == "page"] { _id, title, slug }');
    console.log('Existing pages:');
    console.log(JSON.stringify(pages, null, 2));
  } catch (error) {
    console.error('Error fetching pages:', error);
  }
}

checkPages();