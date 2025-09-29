import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive"
      });
    } else if (data.user) {
      setShowVerification(true);
      toast({
        title: "Check Your Email",
        description: "We've sent you a verification code. Please check your email and enter the code below."
      });
    }
    setLoading(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: verificationCode,
      type: 'signup'
    });
    
    if (error) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive"
      });
    } else if (data.user) {
      toast({
        title: "Admin Account Created!",
        description: "Your admin account has been successfully created and verified."
      });
      navigate('/admin');
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
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
        title: "Welcome back, Admin!",
        description: "You have successfully signed in."
      });
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            </div>
            <CardDescription>Authorized personnel only</CardDescription>
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
                    <Label htmlFor="signin-email">Admin Email</Label>
                    <Input 
                      id="signin-email" 
                      type="email" 
                      placeholder="admin@example.com" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input 
                      id="signin-password" 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                {!showVerification ? (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <Shield className="h-4 w-4 inline mr-1" />
                        Admin registration creates an account with overseer privileges.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Admin Email *</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="your.admin@example.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        minLength={6} 
                        placeholder="Minimum 6 characters"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating admin account...' : 'Create Admin Account'}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div className="text-center mb-4">
                      <Mail className="h-12 w-12 mx-auto text-primary mb-2" />
                      <h3 className="text-lg font-semibold">Check Your Email</h3>
                      <p className="text-sm text-muted-foreground">
                        We've sent a verification code to {email}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="verification-code">Verification Code *</Label>
                      <Input 
                        id="verification-code" 
                        type="text" 
                        placeholder="Enter 6-digit code" 
                        value={verificationCode} 
                        onChange={e => setVerificationCode(e.target.value)} 
                        required 
                        maxLength={6}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify & Create Admin Account'}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full" 
                      onClick={() => setShowVerification(false)}
                    >
                      Back to Sign Up
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;