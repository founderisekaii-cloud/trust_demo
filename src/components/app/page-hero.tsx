
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export function PageHero({ title, subtitle }: { title: string, subtitle: string }) {
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
          {title}
        </h1>
        <p className="mt-2 text-lg md:text-xl text-neutral-100 drop-shadow-sm">{subtitle}</p>
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
