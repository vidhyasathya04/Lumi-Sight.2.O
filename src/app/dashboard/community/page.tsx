import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MessageSquare, CalendarDays, ShieldCheck, BookOpen } from "lucide-react";
import Image from "next/image";

export default function CommunityPage() {
    const communityBanner = PlaceHolderImages.find(p => p.id === 'community-banner');
    const avatar1 = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
    const avatar2 = PlaceHolderImages.find(p => p.id === 'user-avatar-2');
    const avatar3 = PlaceHolderImages.find(p => p.id === 'user-avatar-3');

    const activities = [
        { avatar: avatar1, text: "Priya S. donated at Apollo (2 hrs ago) ❤️" },
        { avatar: null, text: "Emergency fulfilled: B+ found! (4 hrs ago)", icon: "✅" },
        { avatar: avatar2, text: "Rajesh completed eye screening ✅ (1 day ago)" },
    ];
    
    const heroes = [
        { avatar: avatar3, name: "Amit K.", achievement: "2 donations 🥇" },
        { avatar: avatar1, name: "Sneha M.", achievement: "1 donation + 5 referrals 🥈" },
        { avatar: null, name: "You", achievement: "Eye screening champion! 🥉" },
    ];

    return (
        <div className="container mx-auto py-8">
            <Card className="w-full max-w-5xl mx-auto shadow-2xl overflow-hidden">
                {communityBanner && (
                    <div className="relative h-48 w-full">
                        <Image src={communityBanner.imageUrl} alt="Community Banner" layout="fill" objectFit="cover" data-ai-hint="community group" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4">
                            <h1 className="text-4xl font-headline font-bold">Your Local Blood Hero Community</h1>
                            <p className="text-lg">Bangalore South Donors (2,847 members)</p>
                        </div>
                    </div>
                )}
                <div className="grid md:grid-cols-3 gap-px bg-border">
                    <Card className="md:col-span-2 rounded-none border-none">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">🔥 Recent Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {activities.map((activity, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <Avatar>
                                            {activity.avatar ? <AvatarImage src={activity.avatar.imageUrl} /> : null}
                                            <AvatarFallback>{activity.icon || '🎉'}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-sm text-muted-foreground">{activity.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none border-none">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">🏆 This Month's Heroes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                               {heroes.map((hero, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            {hero.avatar && <AvatarImage src={hero.avatar.imageUrl} />}
                                            <AvatarFallback>{hero.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{hero.name}</p>
                                            <p className="text-xs text-muted-foreground">{hero.achievement}</p>
                                        </div>
                                    </li>
                               ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div className="p-6 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="flex-col h-20 gap-1"><MessageSquare /> Community Chat</Button>
                        <Button variant="outline" className="flex-col h-20 gap-1"><CalendarDays /> Group Drives</Button>
                        <Button variant="outline" className="flex-col h-20 gap-1"><ShieldCheck /> Challenges</Button>
                        <Button variant="outline" className="flex-col h-20 gap-1"><BookOpen /> Success Stories</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
