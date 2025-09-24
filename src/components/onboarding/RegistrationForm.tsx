'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BLOOD_GROUPS, DIABETES_STATUSES, LAST_CHECKUPS, WILLING_TO_DONATE_OPTIONS } from '@/lib/constants';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  age: z.coerce.number().min(1, 'Age is required.').max(120),
  gender: z.enum(['Male', 'Female', 'Other']),
  location: z.string().min(2, 'Location is required.'),
  hasDiabetes: z.enum(DIABETES_STATUSES),
  bloodGroup: z.enum(BLOOD_GROUPS),
  lastEyeCheckup: z.enum(LAST_CHECKUPS),
  willingToDonateBlood: z.enum(WILLING_TO_DONATE_OPTIONS),
});

export default function RegistrationForm() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      age: user?.age || undefined,
      gender: user?.gender || 'Male',
      location: user?.location || '',
      hasDiabetes: user?.hasDiabetes || "Don't Know",
      bloodGroup: user?.bloodGroup || 'A+',
      lastEyeCheckup: user?.lastEyeCheckup || 'Never',
      willingToDonateBlood: user?.willingToDonateBlood || 'Maybe',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUser({ ...user, ...values });
    toast({
      title: `Welcome, ${values.name}!`,
      description: "Your profile has been created successfully.",
    });
    router.push('/dashboard');
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg border-none bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center text-center">
          <UserPlus className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-3xl">Create Your Profile</CardTitle>
          <CardDescription>This helps us personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-headline text-lg text-primary">Basic Info</h3>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="35" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Bangalore, India" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-headline text-lg text-primary">Health Profile</h3>
                   <FormField control={form.control} name="hasDiabetes" render={({ field }) => (
                    <FormItem><FormLabel>Do you have diabetes?</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Don't Know" /></FormControl><FormLabel className="font-normal">Don't Know</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                    <FormItem><FormLabel>Blood Group</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger></FormControl><SelectContent>{BLOOD_GROUPS.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="lastEyeCheckup" render={({ field }) => (
                    <FormItem><FormLabel>Last eye checkup</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl><SelectContent>{LAST_CHECKUPS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="willingToDonateBlood" render={({ field }) => (
                    <FormItem><FormLabel>Willing to donate blood?</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Maybe" /></FormControl><FormLabel className="font-normal">Maybe</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>
              <Button type="submit" className="w-full font-headline text-lg" size="lg">Complete Registration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
