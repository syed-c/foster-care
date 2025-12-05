// Sanity Schema for Foster Care Directory UK
// Save this as schema.js in your Sanity studio project

import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import page from './documents/page'
import location from './documents/location'
import post from './documents/post'
import author from './documents/author'

// Object types
import seo from './objects/seo'
import cta from './objects/cta'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Document types
    page,
    location,
    post,
    author,
    
    // Object types
    seo,
    cta
  ])
})