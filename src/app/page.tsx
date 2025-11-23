
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TESTIMONIALS } from '@/lib/data';

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
        <div className="mt-4 text-sm text-neutral-200 flex flex-wrap justify-center gap-x-4 gap-y-1 px-4">
            <span>MU/0001548/2024</span>
            <span>F-0085513(GBR)</span>
            <span>CSR000005</span>
            <span>80G/12A : AAETV6698MF20251</span>
            <span>MH/2025/0850417</span>
        </div>
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

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <section className="py-8 md:py-10 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">{title}</h2>
                <div className="mt-6 max-w-4xl mx-auto text-left">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {children}
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
      <Section title="Our Purpose">
        The purpose of Vikhyat Foundation is educational, social, cultural, religious, health and sports development.
      </Section>
      <Section title="Our Mission">
        To promote and carry on health care, relief of poverty, medical aid, skill-base education and training, helping the victims of natural calamities and environmental preservation.
      </Section>
      <Section title="Our Vision">
        To establish and maintain welfare hostels, ashrams, dharmshalas, educational and skill
training centers.
      </Section>
      <FinalCta />
    </main>
  );
}
