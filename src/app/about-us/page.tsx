import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TEAM_MEMBERS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | TrustForward',
  description: 'Learn about the story, team, and values that drive TrustForward.',
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const OurStory = () => {
  const storyImage = findImage('about-story');
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Story</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              TrustForward was born from a simple yet powerful idea: that real, lasting change comes from the ground up. Founded in 2015 by a group of passionate community organizers, academics, and concerned citizens, we saw a disconnect between the people in power and the communities they serve.
            </p>
            <p className="mt-4 text-muted-foreground">
              We started with a single local initiative, listening to the needs of one neighborhood and empowering its residents to take charge. The success of that project became the blueprint for our mission. Today, TrustForward has grown into a formidable force for good, championing causes across education, healthcare, and policy, but our core philosophy remains the same: listen, empower, and act. Our journey is a testament to the belief that when people come together, anything is possible.
            </p>
          </div>
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            {storyImage && (
              <Image 
                src={storyImage.imageUrl} 
                alt={storyImage.description} 
                fill 
                className="object-cover"
                data-ai-hint={storyImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const OurTeam = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Leadership</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Meet the dedicated individuals guiding our mission and steering our efforts toward a better future.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => {
            const teamImage = findImage(member.imageUrl);
            return (
              <Card key={member.id} className="text-center border-0 shadow-none bg-transparent">
                <CardHeader className="p-0">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mx-auto shadow-md">
                    {teamImage && (
                      <Image 
                        src={teamImage.imageUrl} 
                        alt={member.name} 
                        fill 
                        className="object-cover"
                        data-ai-hint={teamImage.imageHint}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="mt-4 p-0">
                  <h3 className="text-lg font-headline font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const OurValues = () => {
    const values = [
        { title: 'Integrity', description: 'We operate with unwavering honesty, transparency, and accountability in all that we do.' },
        { title: 'Community-Centric', description: 'We listen to and are led by the communities we serve, ensuring solutions are relevant and sustainable.' },
        { title: 'Collaboration', description: 'We believe in the power of partnership and work with others to amplify our collective impact.' },
        { title: 'Equity', description: 'We are committed to dismantling systemic barriers and creating a just and fair society for all.' },
        { title: 'Innovation', description: 'We embrace creative solutions and data-driven approaches to solve complex social problems.' },
        { title: 'Resilience', description: 'We are persistent and determined in our pursuit of long-term, meaningful change.' },
    ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Values & Principles</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The principles that guide every decision, project, and partnership.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(value => (
                <div key={value.title} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="text-lg font-headline font-semibold">{value.title}</h3>
                        <p className="mt-1 text-muted-foreground">{value.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};


export default function AboutUsPage() {
  return (
    <div>
        <header className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">About TrustForward</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                    The story, people, and principles behind our commitment to social progress.
                </p>
            </div>
        </header>
        <OurStory />
        <OurTeam />
        <OurValues />
    </div>
  );
}
