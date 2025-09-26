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
            <CardTitle className="text-2xl font-bold">Breaking Math Registration</CardTitle>
            <CardDescription>Sign in to access</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fullname">Full Name *</Label>
                    <Input id="signup-fullname" type="text" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Student Email *</Label>
                    <Input id="signup-email" type="email" placeholder="your.email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <Input id="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-grade">Grade *</Label>
                    <select id="signup-grade" className="w-full p-2 border border-input rounded-md bg-background" value={grade} onChange={e => setGrade(e.target.value)} required>
                      <option value="">Select your grade</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-why">Why do you want to join the Math Club? *</Label>
                    <textarea id="signup-why" className="w-full p-2 border border-input rounded-md bg-background min-h-[80px]" placeholder="Tell us why you're interested..." value={whyJoinClub} onChange={e => setWhyJoinClub(e.target.value)} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Are you free on Thursdays at lunch for meetings? *</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="thursdays" value="yes" checked={availableThursdays === 'yes'} onChange={e => setAvailableThursdays(e.target.value)} required />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="thursdays" value="no" checked={availableThursdays === 'no'} onChange={e => setAvailableThursdays(e.target.value)} required />
                        No
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Are you interested in competing in tournaments? *</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="competitions" value="yes" checked={interestedCompetitions === 'yes'} onChange={e => setInterestedCompetitions(e.target.value)} required />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="competitions" value="no" checked={interestedCompetitions === 'no'} onChange={e => setInterestedCompetitions(e.target.value)} required />
                        No
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-accessibility">Is there anything we should know to make the club more welcoming or accessible for you?</Label>
                    <textarea id="signup-accessibility" className="w-full p-2 border border-input rounded-md bg-background min-h-[60px]" placeholder="Optional - let us know if you have any needs..." value={accessibilityNeeds} onChange={e => setAccessibilityNeeds(e.target.value)} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Are you interested in participating in inter-school math activities? *</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="interschool" value="yes" checked={interestedInterschool === 'yes'} onChange={e => setInterestedInterschool(e.target.value)} required />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="interschool" value="no" checked={interestedInterschool === 'no'} onChange={e => setInterestedInterschool(e.target.value)} required />
                        No
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="interschool" value="not sure" checked={interestedInterschool === 'not sure'} onChange={e => setInterestedInterschool(e.target.value)} required />
                        Not sure
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-prizes">What types of gifts or prizes would you like to receive in Math Club competitions or activities?</Label>
                    <textarea id="signup-prizes" className="w-full p-2 border border-input rounded-md bg-background min-h-[60px]" placeholder="Gift cards, books, math tools, etc..." value={preferredPrizes} onChange={e => setPreferredPrizes(e.target.value)} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-experience">Have you participated in any math competitions or clubs before?</Label>
                    <textarea id="signup-experience" className="w-full p-2 border border-input rounded-md bg-background min-h-[60px]" placeholder="Describe your previous experience..." value={previousExperience} onChange={e => setPreviousExperience(e.target.value)} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-mathgrade">What was your final grade in your most recent math course? *</Label>
                    <select id="signup-mathgrade" className="w-full p-2 border border-input rounded-md bg-background" value={recentMathGrade} onChange={e => setRecentMathGrade(e.target.value)} required>
                      <option value="">Select your grade range</option>
                      <option value="90 - 100%">90 - 100%</option>
                      <option value="75 - 89%">75 - 89%</option>
                      <option value="60 - 74%">60 - 74%</option>
                      <option value="Below 60%">Below 60%</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-start gap-2">
                      <input type="checkbox" checked={agreedToRules} onChange={e => setAgreedToRules(e.target.checked)} required className="mt-1" />
                      <span className="text-sm">
                        I agree to follow club rules and participate respectfully in all activities *
                      </span>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Auth;