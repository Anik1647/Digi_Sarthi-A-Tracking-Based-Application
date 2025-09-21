import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertUserSchema, type InsertUser } from '@shared/schema';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const signupSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  terms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [accountType, setAccountType] = useState<'passenger' | 'driver'>('passenger');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      accountType: 'passenger',
      licenseNumber: '',
      vehicleNumber: '',
      terms: false,
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: Omit<SignupFormData, 'confirmPassword' | 'terms'>) => {
      const response = await apiRequest('POST', '/api/users', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Account Created Successfully!",
        description: "Your account has been created. You can now start using DigiSaarthi.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    const { confirmPassword, terms, ...userData } = data;
    userData.accountType = accountType;
    signupMutation.mutate(userData);
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Join DigiSaarthi</span>
          </h1>
          <p className="text-xl text-muted-foreground">Create your account to access real-time transportation tracking</p>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Account Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="passenger"
                      checked={accountType === 'passenger'}
                      onChange={(e) => setAccountType(e.target.value as 'passenger')}
                      className="sr-only"
                      data-testid="radio-passenger"
                    />
                    <div className={`glass-card p-4 rounded-lg border-2 cursor-pointer hover:border-primary/50 transition-colors ${
                      accountType === 'passenger' ? 'border-primary' : 'border-transparent'
                    }`}>
                      <div className="text-center">
                        <i className="fas fa-user text-2xl text-primary mb-2"></i>
                        <div className="font-medium">Passenger</div>
                        <div className="text-sm text-muted-foreground">Track buses and plan routes</div>
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="driver"
                      checked={accountType === 'driver'}
                      onChange={(e) => setAccountType(e.target.value as 'driver')}
                      className="sr-only"
                      data-testid="radio-driver"
                    />
                    <div className={`glass-card p-4 rounded-lg border-2 cursor-pointer hover:border-primary/50 transition-colors ${
                      accountType === 'driver' ? 'border-primary' : 'border-transparent'
                    }`}>
                      <div className="text-center">
                        <i className="fas fa-bus text-2xl text-primary mb-2"></i>
                        <div className="font-medium">Driver</div>
                        <div className="text-sm text-muted-foreground">Share location and manage routes</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} data-testid="input-firstName" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} data-testid="input-lastName" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email address" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your phone number" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a strong password" {...field} data-testid="input-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} data-testid="input-confirmPassword" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Driver-specific fields */}
              {accountType === 'driver' && (
                <div className="space-y-4" data-testid="driver-fields">
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your license number" {...field} value={field.value || ''} data-testid="input-licenseNumber" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your vehicle number" {...field} value={field.value ?? ''} data-testid="input-vehicleNumber" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-terms"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-muted-foreground">
                        I agree to the{' '}
                        <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                        and{' '}
                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={signupMutation.isPending}
                data-testid="button-submit"
              >
                {signupMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i>
                    Create Account
                  </>
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <a href="#" className="text-primary hover:underline font-medium">Sign in</a>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
