import { supabase } from '@/integrations/supabase/client';

/**
 * Makes a user an admin by updating their role in the profiles table
 * @param email The email of the user to make an admin
 */
export const makeUserAdmin = async (email: string) => {
  try {
    // First, let's check if the user exists
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      console.error('Error finding user:', userError);
      throw new Error(`Failed to find user: ${userError.message}`);
    }

    if (!userData) {
      throw new Error(`User with email ${email} not found`);
    }

    // Update the user's role to admin
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userData.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user role:', error);
      throw new Error(`Failed to update user role: ${error.message}`);
    }

    console.log(`Successfully made ${email} an admin`);
    return data;
  } catch (error) {
    console.error('Error in makeUserAdmin:', error);
    throw error;
  }
};

// Example usage:
// makeUserAdmin('jodierey.fernandez@ustp.edu.ph')
//   .then(result => console.log('User updated:', result))
//   .catch(error => console.error('Error:', error));