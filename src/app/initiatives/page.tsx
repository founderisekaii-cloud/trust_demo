
import { INITIATIVES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/app/page-hero';

export const metadata: Metadata = {
  title: 'What We Do | Vikhyat Foundation',
  description: 'Explore our ongoing and past initiatives, from community development to policy advocacy.',
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function InitiativesPage() {
  const categories = [...new Set(INITIATIVES.map(i => i.category))];
  
  return (
    <div>
      <PageHero title="What We Do" subtitle="A comprehensive overview of our programs and projects, each designed to tackle critical social challenges and create a better tomorrow." />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtering could be added here in a future version */}
          {/* <div className="flex justify-center flex-wrap gap-2 mb-12">
            <Button variant="secondary">All</Button>
            {categories.map(c => <Button key={c} variant="ghost">{c}</Button>)}
          </div> */}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIATIVES.map((initiative) => {
              const image = findImage(initiative.imageUrl);
              return (
                <Card key={initiative.id} className="flex flex-col overflow-hidden group">
                  {image && (
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                            src={image.imageUrl}
                            alt={initiative.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                  )}
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">{initiative.category}</Badge>
                    <CardTitle className="font-headline text-xl mt-2">{initiative.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{initiative.shortDescription}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link href={`/initiatives/${initiative.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
