
'use client';
import { PageHero } from "@/components/app/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const activities = [
    {
        heading: "Seminar",
        description: "Some of the officials of the \"Vikhyat foundation\" guiding college students in Pune.",
        subheading: "Topics",
        subdescription: "Students and our officials interacted with each other on topics such as overall development of students, interest in education, career guidance, skills-based occupations, job opportunities in various sectors, environmental balance, importance of water, etc.",
        image: { src: "/images/activity1.jpg", alt: "Vikhyat Foundation official guiding college students in Pune." }
    },
    {
        heading: "Welfare Activity",
        description: "Representatives of our board while informing the families of workers in mining-affected areas about various developmental and welfare projects.",
        image: { src: "/images/activity2.jpg", alt: "Informing families in mining-affected areas about welfare projects." }
    },
    {
        heading: "Women's Self-Help Group",
        description: "Our board office bearers guiding the various schemes and activities of the women's self-help group.",
        image: { src: "/images/activity3.jpg", alt: "Guiding a women's self-help group." }
    },
    {
        heading: "Women Empowerment",
        description: "Our office bearers are guiding to create awareness about women empowerment and menstrual hygiene.",
        image: { src: "/images/activity4.jpg", alt: "Women empowerment and menstrual hygiene awareness session." }
    },
    {
        heading: "Public Awareness",
        description: "Our representatives guide the people of the slums towards collective development, cleanliness drive, education and adult education self-reliance.",
        image: { src: "/images/activity5.jpg", alt: "Public awareness session in a slum area." }
    }
];

export default function OurActivityPage() {
    return (
        <div>
            <PageHero title="Vikhyat Foundation" subtitle="Humanity at Heart, Progress in Action" />
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    {activities.map((activity, index) => (
                        <Card key={index} className="overflow-hidden shadow-lg">
                            <CardHeader className="bg-secondary">
                                <CardTitle className="font-headline text-3xl">{activity.heading}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-4">
                                        <p className="text-lg text-muted-foreground">{activity.description}</p>
                                        
                                        {activity.subheading && (
                                            <div className="pl-4 border-l-4 border-primary">
                                                <h3 className="font-headline text-xl font-semibold">{activity.subheading}</h3>
                                                <p className="text-muted-foreground mt-2">{activity.subdescription}</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image 
                                            src={activity.image.src} 
                                            alt={activity.image.alt} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
