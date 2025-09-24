'use client';
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Heart, Loader2, MapPin, Weight, Droplet, Search, History, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function DonorFlow() {
    const { user } = useUser();
    const [isChecking, setIsChecking] = useState(true);
    const [isEligible, setIsEligible] = useState(false);
    
    useEffect(() => {
        setIsChecking(true);
        const timer = setTimeout(() => {
            if (user?.age && user.age >= 18 && user.age <= 65) {
                setIsEligible(true);
            }
            setIsChecking(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [user]);

    const eligibilityCriteria = [
        { label: "Age: 18-65", value: user?.age ? `${user.age} years` : "N/A", met: user?.age ? user.age >= 18 && user.age <= 65 : false, icon: Clock },
        { label: "Weight: >50kg", value: "58kg", met: true, icon: Weight },
        { label: "Last donation: >3mo", value: "4 months ago", met: true, icon: Heart },
    ];
    
    return (
         <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <CheckCircle className="text-accent"/>
                        Eligibility Quick Check
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isChecking ? (
                        <div className="flex items-center justify-center h-40">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                             <div className="flex items-center gap-2 bg-background p-3 rounded-lg">
                                <div className="flex-shrink-0">
                                    <p className="font-bold text-sm">🤖 AI Assistant:</p>
                                </div>
                                <p className="text-sm italic text-muted-foreground">"Let me check your eligibility based on your profile..."</p>
                            </div>

                            <ul className="space-y-3">
                            {eligibilityCriteria.map(({ label, value, met, icon: Icon }) => (
                                <li key={label} className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground"><Icon className="w-4 h-4"/> {label}</span>
                                    <span className={`font-bold ${met ? 'text-green-600' : 'text-red-600'}`}>{value} ({met ? '✓' : '✗'})</span>
                                </li>
                            ))}
                            </ul>
                            {isEligible ? (
                                <p className="text-center font-bold text-green-600 text-lg pt-4">🎉 You're eligible to donate!</p>
                            ) : (
                                <p className="text-center font-bold text-red-600 pt-4">You may not be eligible at this time.</p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
             <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold">Location & Availability</h3>
                <p className="text-muted-foreground">Once confirmed eligible, you can schedule your donation.</p>
                <Button size="lg" className="w-full" disabled={!isEligible || isChecking}>
                    <MapPin className="mr-2 h-5 w-5"/> Show Nearby Donation Centers
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-headline">Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">How should we contact you for urgent requests?</p>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">SMS</Button>
                            <Button variant="outline" size="sm">Push</Button>
                            <Button variant="outline" size="sm">Call</Button>
                            <Button variant="outline" size="sm">WhatsApp</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


function PatientFlow() {
    return (
        <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <PlusCircle className="text-primary"/>
                        Create a Blood Request
                    </CardTitle>
                    <CardDescription>Post a request for blood that nearby donors can see.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Need blood for yourself or a loved one? Fill out a request form with the required details.</p>
                    <Button className="w-full">Create New Request</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Search className="text-accent"/>
                        Blood Bank & Request Status
                    </CardTitle>
                    <CardDescription>Search for blood banks or check the status of your requests.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                        <Search className="mr-2 h-5 w-5"/> Search Blood Banks
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <History className="mr-2 h-5 w-5"/> View My Request History
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default function DonateBloodPage() {
    const { user } = useUser();
    
    // Determine the default tab based on user type or history
    const defaultTab = user?.userType === 'Patient' ? 'patient' : 'donor';

    return (
        <div className="container mx-auto py-8">
             <Card className="w-full max-w-4xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-primary flex items-center gap-3">
                        <Droplet/>
                        Blood Services
                    </CardTitle>
                    <CardDescription>Your hub for donating blood or making a request.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue={defaultTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="donor">I want to Donate</TabsTrigger>
                            <TabsTrigger value="patient">I need Blood</TabsTrigger>
                        </TabsList>
                        <TabsContent value="donor">
                           <DonorFlow />
                        </TabsContent>
                        <TabsContent value="patient">
                           <PatientFlow />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
