'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Droplet, History, Mic, PlusCircle, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HealthStatCard } from "@/components/blood-donation/HealthStatCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import SosRequestFlow from "@/components/blood-donation/SosRequestFlow";

function SchedulingTab() {
    return (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <PlusCircle className="text-primary"/>
                    Create a Future Blood Request
                </CardTitle>
                <CardDescription>Schedule requests for planned procedures. We prioritize recurring needs for patients with conditions like Thalassemia or those undergoing dialysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Patient Name" />
                <Input type="date" placeholder="Date of Procedure" />
                 <Textarea placeholder="Additional context (e.g., Hospital, required time)" />
                <Button className="w-full">Schedule Request</Button>
            </CardContent>
        </Card>
    );
}

function HistoryTab() {
    const history = [
        { date: "1 week ago", from: "Priya S.", status: "Fulfilled" },
        { date: "1 month ago", from: "Amit K.", status: "Fulfilled" },
        { date: "3 months ago", from: "Community Drive", status: "Fulfilled" },
    ];
     return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Request History</h3>
            {history.map((item, index) => (
                <Card key={index} className="bg-secondary/30">
                    <CardContent className="pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <History className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold">Received blood from {item.from}</p>
                                <p className="text-sm text-muted-foreground">{item.date}</p>
                            </div>
                        </div>
                        <p className={`text-sm font-bold text-green-600`}>{item.status}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function HealthTab() {
     return (
        <div className="space-y-4">
             <h3 className="font-semibold text-lg">Your Health Summary</h3>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <HealthStatCard title="Condition" value="Thalassemia" status="Chronic" />
                <HealthStatCard title="Last Transfusion" value="1 week ago" status="Recent" />
                <HealthStatCard title="Next Session" value="In 2 weeks" status="Scheduled" />
             </div>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Blood Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your recent health reports will be displayed here.</p>
                </CardContent>
             </Card>
        </div>
    )
}

function AiAssistantTab() {
     return (
        <div className="text-center py-10">
            <Mic className="h-16 w-16 mx-auto text-primary animate-pulse"/>
            <h3 className="mt-4 text-xl font-semibold">AI Voice Assistance</h3>
            <p className="text-muted-foreground mt-2">Speak your request, and I'll handle the rest.</p>
            <p className="text-sm text-muted-foreground mt-4 italic">"I need B+ blood urgently at Apollo Hospital!"</p>
            <Button className="mt-6">Tap to Speak</Button>
        </div>
    )
}

export default function PatientDashboardPage() {
    const { user } = useUser();
    const avatarImage = PlaceHolderImages.find(p => p.id === 'user-avatar-2');
    const [isRequestingSos, setIsRequestingSos] = useState(false);

    if (isRequestingSos) {
        return <SosRequestFlow onCancel={() => setIsRequestingSos(false)} />;
    }

    return (
        <div className="container mx-auto py-8">
             <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold text-red-600 flex items-center gap-3">
                        <Droplet /> Patient Dashboard
                    </h1>
                    <p className="text-muted-foreground">Manage your blood requests and health profile.</p>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-12 w-12 cursor-pointer border-2 border-red-500/50">
                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} />}
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><User className="mr-2 h-4 w-4"/> Full Profile</DropdownMenuItem>
                        <DropdownMenuItem><History className="mr-2 h-4 w-4"/> Request History</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <Card className="mb-8 bg-red-600 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Emergency SOS</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center gap-4">
                    <p className="flex-grow">Press this button to instantly notify nearby donors of your emergency need.</p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="lg" variant="destructive" className="bg-white text-red-600 hover:bg-white/90 font-bold text-lg w-full md:w-auto">
                            SEND SOS REQUEST
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Emergency SOS</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will send an alert to all available donors in a 5km radius.
                            Please confirm this is a genuine emergency.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => setIsRequestingSos(true)} className="bg-red-600 hover:bg-red-700">
                            Confirm & Send Alert
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>

            <Tabs defaultValue="scheduling" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="health">Health</TabsTrigger>
                    <TabsTrigger value="ai">AI Assistance</TabsTrigger>
                </TabsList>
                <TabsContent value="scheduling" className="mt-6">
                    <SchedulingTab />
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                    <HistoryTab />
                </TabsContent>
                <TabsContent value="health" className="mt-6">
                    <HealthTab />
                </TabsContent>
                <TabsContent value="ai" className="mt-6">
                    <AiAssistantTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
