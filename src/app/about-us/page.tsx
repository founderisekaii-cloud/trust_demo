'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TEAM_MEMBERS, TESTIMONIALS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const OurStory = () => {
  const storyImage = findImage('about-story');
  const chairpersonImage = findImage('team-1');
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Story & Chairperson</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              The Vikhyat Foundation was born from a simple yet powerful idea: that real, lasting change comes from the ground up, nurtured by a deep-seated commitment to community and compassion. Founded in 2015 by a group of passionate community organizers, visionary academics, and dedicated citizens, we identified a critical disconnect between those in power and the communities they are meant to serve. We saw untapped potential, unheard voices, and unmet needs, and we were moved to act. Our journey began not with a grand gesture, but with a single, focused local initiative. We immersed ourselves in one neighborhood, taking the time to listen intently to the hopes, challenges, and aspirations of its residents. 
            </p>
            <p className="mt-4 text-muted-foreground">
              This process of deep listening became the cornerstone of our philosophy. Rather than imposing solutions, we worked to empower residents, providing them with the tools, resources, and platform to take charge of their own development. The resounding success of that pilot project—a flourishing community garden that became a hub for social connection and healthy living—became the blueprint for our expanding mission. Today, the Vikhyat Foundation has grown from that single seed of an idea into a formidable force for good, championing causes across education, healthcare, environmental sustainability, and policy advocacy. Yet, our core philosophy remains unchanged: listen with empathy, empower with dignity, and act with conviction. Our journey is a living testament to the extraordinary power that is unleashed when people come together with a shared purpose and an unwavering belief in a better tomorrow.
            </p>
             <div className="mt-12 bg-secondary p-6 rounded-lg">
                <h3 className="text-2xl font-headline font-semibold mb-4">The Chairman's Vision</h3>
                 <div className="flex items-center gap-6">
                    {chairpersonImage && (
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg shrink-0">
                        <Image 
                            src={chairpersonImage.imageUrl} 
                            alt="Chairperson" 
                            fill 
                            className="object-cover"
                            data-ai-hint={chairpersonImage.imageHint}
                        />
                    </div>
                    )}
                    <p className="text-muted-foreground italic">
                        "Our vision is one of holistic empowerment. We strive to create a world where every individual has the opportunity not just to survive, but to thrive. By focusing on education, health, and sustainable development, we are planting the seeds for a future where communities are self-reliant, resilient, and filled with hope. Our work is driven by the belief that compassion, when combined with strategic action, can move mountains."
                    </p>
                </div>
            </div>
          </div>
          <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
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
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Our values are the bedrock of our identity and the compass that guides every decision, project, and partnership we undertake. They are not merely words on a page, but deeply ingrained principles that we live by every day. They compel us to act with unwavering integrity, to place the needs of the community at the heart of our work, and to champion equity in all its forms. We believe that true progress is only possible through collaboration, and we are committed to fostering innovative, resilient solutions that create a just, fair, and sustainable world for all.
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

const BestWishers = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">From Our Best Wishers</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Words of encouragement and support from leaders and partners who believe in our vision.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.slice(0, 2).map((testimonial) => {
            const image = findImage(testimonial.imageUrl);
            return (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <blockquote className="italic text-muted-foreground">"{testimonial.quote}"</blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    {image && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image src={image.imageUrl} alt={testimonial.name} fill className="object-cover" data-ai-hint={image.imageHint} />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-primary">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/successful-project">See Our Successful Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};


export default function AboutUsPage() {
  const router = useRouter();

  return (
    <div>
        <header className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Button variant="ghost" onClick={() => router.back()} className="absolute top-20 left-4 text-primary-foreground hover:bg-primary/50">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="text-4xl md:text-5xl font-headline font-bold">About Vikhyat Foundation</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                    The story, people, and principles behind our commitment to social progress.
                </p>
            </div>
        </header>
        <OurStory />
        <OurTeam />
        <OurValues />
        <BestWishers />
    </div>
  );
}
