-- SQL script to add admin user to the database
-- Note: You'll need to hash the password manually or use the Node.js script

-- First, check if the user already exists
-- SELECT * FROM users WHERE email = 'syedrayyan7117@gmail.com';

-- If the user doesn't exist, insert the new admin user
-- Note: The password needs to be hashed with bcrypt. This is just a placeholder.
INSERT INTO users (email, password, name, role) 
VALUES ('syedrayyan7117@gmail.com', '$2a$10$placeholder_hash', 'Admin User', 'admin')
ON CONFLICT (email) 
DO UPDATE SET 
  password = '$2a$10$placeholder_hash',
  role = 'admin';

-- If you want to create the user without a password hash initially (for testing only):
-- INSERT INTO users (email, name, role) 
-- VALUES ('syedrayyan7117@gmail.com', 'Admin User', 'admin')
-- ON CONFLICT (email) 
-- DO UPDATE SET 
--   role = 'admin';