
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
        <p className="mt-2 text-lg md:text-xl text-neutral-100 drop-shadow-sm">Humanity at Heart, Progress in Action</p>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-sm">
          The purpose of Vikhyat Foundation is educational, social, cultural, religious, health and sports development.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/get-involved">Get Involved</Link>
          </Button>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/about-us#best-wishers">Well Wisher</Link>
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
        <div className="mt-6 max-w-4xl mx-auto text-left space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At the heart of the Vikhyat Foundation lies a profound and multifaceted purpose: to be a catalyst for holistic development across society. Our core objective is to drive meaningful progress in the educational, social, cultural, religious, health, and sports sectors. We believe that a thriving community is one where every individual has the opportunity to flourish in all aspects of life. This foundational purpose guides every initiative we undertake, ensuring that our efforts are always directed towards creating a more equitable, knowledgeable, and vibrant world for all. We are committed to nurturing talent, preserving culture, promoting well-being, and fostering a spirit of unity and progress.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To empower vulnerable communities in underprivileged, remote and ultra-remote areas across India by providing quality education, skill development training and development opportunities, compassionate care for the elderly and inclusive support to marginalized communities so that they can break the cycle of poverty and lead self-reliant, meaningful lives. Also in unserved areas, we provide medical assistance, awareness, camps and access to essential health services so that their families can lead healthy and safe lives.
          </p>
           <p className="text-lg text-muted-foreground leading-relaxed">
            Our vision is to build the infrastructure of compassion and opportunity. We aim to establish and maintain a network of institutions that serve as pillars of support for the community. This includes creating welfare hostels that provide safe and nurturing homes for the vulnerable, ashrams and dharmshalas that offer spiritual solace and shelter, and state-of-the-art educational and skill training centers that serve as hubs of innovation and learning. Through these establishments, we envision a future where every person, regardless of their background, has access to the resources they need to reach their full potential. Our vision is not just about building structures, but about creating enduring ecosystems of support, empowerment, and holistic development that will benefit generations to come.
          </p>
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
      <FinalCta />
    </main>
  );
}
