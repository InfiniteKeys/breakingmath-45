-- Create function to automatically assign overseer role to new admin users
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create basic profile
  INSERT INTO public.profiles (user_id, display_name, full_name)
  VALUES (new.id, 'Admin User', 'Admin User');
  
  -- Assign overseer role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'overseer'::app_role);
  
  RETURN new;
END;
$$;