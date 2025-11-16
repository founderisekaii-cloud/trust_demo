import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FOCUS_AREAS, INITIATIVES, NEWS_ARTICLES, TESTIMONIALS } from '@/lib/data';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, HeartHandshake, Landmark, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
          Empowering Communities, Driving Social Change
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-sm">
          TrustForward is a dedicated political and social trust committed to building a more just, equitable, and prosperous society for all.
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
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Mission & Vision</h2>
        <div className="mt-6 max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground">
            We believe in the power of collective action to create lasting change. Our mission is to identify critical social challenges, foster community-led solutions, and advocate for policies that promote fairness and opportunity. We envision a world where every individual has the chance to thrive.
          </p>
        </div>
      </div>
    </section>
  );
}

const iconMap = {
  Education: BookOpen,
  Healthcare: HeartHandshake,
  'Community Development': Users,
  'Policy Advocacy': Landmark,
};

function FocusAreas() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Focus Areas</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We concentrate our efforts on four key pillars to maximize our impact and drive systemic change.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FOCUS_AREAS.map((area) => {
            const Icon = iconMap[area.title as keyof typeof iconMap] || BookOpen;
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
                   <Link href={`/initiatives/${area.slug}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                 </Button>
              </CardFooter>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
}

function FeaturedInitiative() {
    const featured = INITIATIVES.find(i => i.slug === 'urban-renewal-project');
    if (!featured) return null;
    const image = findImage('featured-initiative');

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className='relative aspect-video rounded-lg overflow-hidden shadow-lg'>
                        {image && <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />}
                    </div>
                    <div>
                        <Badge variant="outline">Featured Initiative</Badge>
                        <h2 className="mt-4 text-3xl md:text-4xl font-headline font-bold">{featured.title}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">{featured.shortDescription}</p>
                        <p className="mt-2 text-muted-foreground">{featured.longDescription.substring(0, 150)}...</p>
                        <Button asChild size="lg" className="mt-6">
                            <Link href={`/initiatives/${featured.slug}`}>Support Our Campaign</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function LatestNews() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
            <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Latest News & Updates</h2>
                <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                    Stay informed about our work and impact.
                </p>
            </div>
            <Button variant="outline" asChild>
                <Link href="/news">View All News</Link>
            </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {NEWS_ARTICLES.map((article) => {
            const image = findImage(article.imageUrl);
            return (
              <Card key={article.id} className="flex flex-col overflow-hidden group">
                {image && 
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={image.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={image.imageHint} />
                  </div>
                }
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <p className="text-sm text-muted-foreground">{article.date}</p>
                  </div>
                  <CardTitle className="font-headline text-lg mt-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{article.shortDescription}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={`/news/${article.slug}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Voices of Our Community</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear from the people whose lives have been changed through our collective efforts.
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
                    <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
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
      <FeaturedInitiative />
      <LatestNews />
      <Testimonials />
      <FinalCta />
    </main>
  );
}
