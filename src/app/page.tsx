
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FOCUS_AREAS, TESTIMONIALS } from '@/lib/data';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, BookOpen, HeartHandshake, Landmark, Users, Sprout, BrainCircuit, Leaf, Award } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

function Hero() {
  const heroImage = findImage('hero-1');
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
      {heroImage && 
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      }
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative text-center p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-md">
          Vikhyat Foundation
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-sm">
          The purpose of Vikhyat Foundation is educational, social, cultural, religious, health and sports development.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/get-involved">Get Involved</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <Link href="/about-us">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Purpose, Mission & Vision</h2>
        <div className="mt-6 max-w-4xl mx-auto text-left">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At the heart of the Vikhyat Foundation lies a profound and multifaceted purpose: to be a catalyst for holistic development across society. Our core objective is to drive meaningful progress in the educational, social, cultural, religious, health, and sports sectors. We believe that a thriving community is one where every individual has the opportunity to flourish in all aspects of life. This foundational purpose guides every initiative we undertake, ensuring that our efforts are always directed towards creating a more equitable, knowledgeable, and vibrant world for all. We are committed to nurturing talent, preserving culture, promoting well-being, and fostering a spirit of unity and progress.
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our mission translates this purpose into tangible action. We are dedicated to promoting and carrying on comprehensive health care, making medical aid accessible to those in need, and working tirelessly for the relief of poverty. A cornerstone of our work is the provision of skill-based education and training, empowering individuals with the practical tools they need to achieve economic independence and personal growth. In times of crisis, we extend our hand to help the victims of natural calamities, providing immediate relief and long-term support to rebuild their lives. Furthermore, we are deeply committed to environmental preservation, understanding that a healthy planet is the bedrock of a healthy society. Our mission is one of active service, addressing immediate needs while building a foundation for sustainable, long-term community upliftment.
          </p>
           <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our vision is to build the infrastructure of compassion and opportunity. We aim to establish and maintain a network of institutions that serve as pillars of support for the community. This includes creating welfare hostels that provide safe and nurturing homes for the vulnerable, ashrams and dharmshalas that offer spiritual solace and shelter, and state-of-the-art educational and skill training centers that serve as hubs of innovation and learning. Through these establishments, we envision a future where every person, regardless of their background, has access to the resources they need to reach their full potential. Our vision is not just about building structures, but about creating enduring ecosystems of support, empowerment, and holistic development that will benefit generations to come.
          </p>
        </div>
      </div>
    </section>
  );
}

const iconMap: { [key: string]: React.ElementType } = {
  'Education & Skill Development': BrainCircuit,
  'Health & Wellness': HeartHandshake,
  'Women Empowerment': Users,
  'Environment & Sustainability': Leaf,
  'Rural Development': Sprout,
};

function FocusAreas() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Areas of Impact</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We concentrate our efforts on key pillars to maximize our impact and drive systemic change.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FOCUS_AREAS.slice(0, 5).map((area) => {
            const Icon = iconMap[area.title] || BookOpen;
            return(
            <Card key={area.title} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{area.description}</p>
              </CardContent>
              <CardFooter className="justify-center">
                 <Button variant="ghost" asChild>
                   <Link href={`/what-we-do`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                 </Button>
              </CardFooter>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
}


function WellWishers() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">From Our Well Wishers</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear from the people who believe in our mission and witness the change we create together.
          </p>
        </div>
        <Carousel className="mt-12 w-full max-w-4xl mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {TESTIMONIALS.map((testimonial) => {
              const image = findImage(testimonial.imageUrl);
              return (
              <CarouselItem key={testimonial.id}>
                <div className="p-1">
                  <Card className="border-none shadow-none">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-xl font-light italic">"{testimonial.quote}"</p>
                      <div className="mt-6 flex items-center gap-4">
                        {image && 
                          <Avatar>
                            <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        }
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )})}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/successful-project">View Successful Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
    return (
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Join Our Movement Today</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                    Become a part of a community dedicated to making a real, tangible difference. Your support, time, and voice are invaluable.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/get-involved#volunteer-form">Volunteer With Us</Link>
                    </Button>
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/get-involved">Donate Now</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Mission />
      <FocusAreas />
      <WellWishers />
      <FinalCta />
    </main>
  );
}
