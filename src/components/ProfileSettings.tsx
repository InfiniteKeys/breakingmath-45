import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface ProfileData {
  display_name: string | null;
  full_name: string | null;
  grade: number | null;
  why_join_club: string | null;
  available_thursdays: boolean | null;
  interested_competitions: boolean | null;
  accessibility_needs: string | null;
  interested_interschool: string | null;
  preferred_prizes: string | null;
  previous_experience: string | null;
  recent_math_grade: string | null;
  agreed_to_rules: boolean | null;
}

export const ProfileSettings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    display_name: null,
    full_name: null,
    grade: null,
    why_join_club: null,
    available_thursdays: null,
    interested_competitions: null,
    accessibility_needs: null,
    interested_interschool: null,
    preferred_prizes: null,
    previous_experience: null,
    recent_math_grade: null,
    agreed_to_rules: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, full_name, grade, why_join_club, available_thursdays, interested_competitions, accessibility_needs, interested_interschool, preferred_prizes, previous_experience, recent_math_grade, agreed_to_rules')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // Not found error
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data || {
          display_name: null,
          full_name: null,
          grade: null,
          why_join_club: null,
          available_thursdays: null,
          interested_competitions: null,
          accessibility_needs: null,
          interested_interschool: null,
          preferred_prizes: null,
          previous_experience: null,
          recent_math_grade: null,
          agreed_to_rules: null
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
        <p className="text-muted-foreground">
          Your registration information (read-only)
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={profile.full_name || 'Not set'} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ''} disabled className="bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Grade</Label>
                <Input value={profile.grade ? `Grade ${profile.grade}` : 'Not set'} disabled className="bg-muted" />
              </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Why do you want to join the Math Club?</Label>
              <textarea 
                value={profile.why_join_club || 'Not provided'} 
                disabled 
                className="w-full p-2 border border-input rounded-md bg-muted min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Available Thursdays at lunch?</Label>
                <Input 
                  value={profile.available_thursdays === null ? 'Not set' : (profile.available_thursdays ? 'Yes' : 'No')} 
                  disabled 
                  className="bg-muted" 
                />
              </div>
              <div className="space-y-2">
                <Label>Interested in competitions?</Label>
                <Input 
                  value={profile.interested_competitions === null ? 'Not set' : (profile.interested_competitions ? 'Yes' : 'No')} 
                  disabled 
                  className="bg-muted" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Accessibility needs</Label>
              <textarea 
                value={profile.accessibility_needs || 'None specified'} 
                disabled 
                className="w-full p-2 border border-input rounded-md bg-muted min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Interested in inter-school activities?</Label>
              <Input 
                value={profile.interested_interschool || 'Not set'} 
                disabled 
                className="bg-muted" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred prizes</Label>
              <textarea 
                value={profile.preferred_prizes || 'Not specified'} 
                disabled 
                className="w-full p-2 border border-input rounded-md bg-muted min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Previous experience</Label>
              <textarea 
                value={profile.previous_experience || 'None specified'} 
                disabled 
                className="w-full p-2 border border-input rounded-md bg-muted min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Recent math course grade</Label>
              <Input 
                value={profile.recent_math_grade || 'Not set'} 
                disabled 
                className="bg-muted" 
              />
            </div>
            <div className="space-y-2">
              <Label>Agreed to club rules</Label>
              <Input 
                value={profile.agreed_to_rules ? 'Yes' : 'No'} 
                disabled 
                className="bg-muted" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};