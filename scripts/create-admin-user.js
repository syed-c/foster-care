// Script to create an admin user in the database
const bcrypt = require('bcryptjs');
const { supabaseAdmin } = require('../lib/supabase-server');

async function createAdminUser() {
  try {
    const email = 'syedrayyan7117@gmail.com';
    const password = 'aDMIN@8899';
    const name = 'Admin User';
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (existingUser) {
      console.log('Admin user already exists. Updating password...');
      
      // Update the existing user's password and role
      const { data, error: updateError } = await supabaseAdmin
        .from('users')
        .update({ 
          password: hashedPassword,
          role: 'admin'
        })
        .eq('email', email);
      
      if (updateError) {
        console.error('Error updating admin user:', updateError);
        return;
      }
      
      console.log('Admin user password updated successfully!');
    } else {
      console.log('Creating new admin user...');
      
      // Create new admin user
      const { data, error: insertError } = await supabaseAdmin
        .from('users')
        .insert({
          email: email,
          password: hashedPassword,
          name: name,
          role: 'admin'
        });
      
      if (insertError) {
        console.error('Error creating admin user:', insertError);
        return;
      }
      
      console.log('Admin user created successfully!');
    }
    
    console.log('Admin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role: admin');
    
  } catch (error) {
    console.error('Error in createAdminUser:', error);
  }
}

createAdminUser();