import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Signup form fields
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('');
  const [whyJoinClub, setWhyJoinClub] = useState('');
  const [availableThursdays, setAvailableThursdays] = useState('');
  const [interestedCompetitions, setInterestedCompetitions] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [interestedInterschool, setInterestedInterschool] = useState('');
  const [preferredPrizes, setPreferredPrizes] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [recentMathGrade, setRecentMathGrade] = useState('');
  const [agreedToRules, setAgreedToRules] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const {
      data,
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    if (error) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive"
      });
    } else if (data.user) {
      // Create profile with all the form data
      const {
        error: profileError
      } = await supabase.from('profiles').insert({
        user_id: data.user.id,
        full_name: fullName,
        grade: parseInt(grade),
        why_join_club: whyJoinClub,
        available_thursdays: availableThursdays === 'yes',
        interested_competitions: interestedCompetitions === 'yes',
        accessibility_needs: accessibilityNeeds,
        interested_interschool: interestedInterschool,
        preferred_prizes: preferredPrizes,
        previous_experience: previousExperience,
        recent_math_grade: recentMathGrade,
        agreed_to_rules: agreedToRules
      });
      if (profileError) {
        toast({
          title: "Profile Creation Error",
          description: profileError.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Check Your Email",
          description: "We've sent you a confirmation link to complete your registration."
        });
      }
    }
    setLoading(false);
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      });
      navigate('/');
    }
    setLoading(false);
  };
  return <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Notice</CardTitle>
            <CardDescription>Student registration is currently closed</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Student registration is temporarily disabled. Only administrators can access the system.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Are you an administrator?</p>
              <Link to="/admins">
                <Button variant="outline" className="w-full">
                  Admin Login
                </Button>
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              If you need to register as a student, please contact your club administrator.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Auth;