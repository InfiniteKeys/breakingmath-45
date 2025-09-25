import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isOverseer: boolean;
  loading: boolean;
  displayName: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  isOverseer: false,
  loading: true,
  displayName: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOverseer, setIsOverseer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if user is admin and overseer, and fetch display name
          setTimeout(async () => {
            try {
              const [adminResult, overseerResult, profileResult] = await Promise.all([
                supabase.rpc('is_admin'),
                supabase.rpc('is_overseer'),
                supabase.from('profiles').select('display_name').eq('user_id', session.user.id).maybeSingle()
              ]);
              
              if (!adminResult.error) {
                setIsAdmin(adminResult.data || false);
              }
              if (!overseerResult.error) {
                setIsOverseer(overseerResult.data || false);
              }
              if (!profileResult.error && profileResult.data) {
                setDisplayName(profileResult.data.display_name);
              }
            } catch (error) {
              console.error('Error checking user roles:', error);
              setIsAdmin(false);
              setIsOverseer(false);
              setDisplayName(null);
            }
            setLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsOverseer(false);
          setDisplayName(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check admin and overseer status for existing session, and fetch display name
        setTimeout(async () => {
          try {
            const [adminResult, overseerResult, profileResult] = await Promise.all([
              supabase.rpc('is_admin'),
              supabase.rpc('is_overseer'),
              supabase.from('profiles').select('display_name').eq('user_id', session.user.id).maybeSingle()
            ]);
            
            if (!adminResult.error) {
              setIsAdmin(adminResult.data || false);
            }
            if (!overseerResult.error) {
              setIsOverseer(overseerResult.data || false);
            }
            if (!profileResult.error && profileResult.data) {
              setDisplayName(profileResult.data.display_name);
            }
          } catch (error) {
            console.error('Error checking user roles:', error);
            setIsAdmin(false);
            setIsOverseer(false);
            setDisplayName(null);
          }
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isOverseer, loading, displayName }}>
      {children}
    </AuthContext.Provider>
  );
};