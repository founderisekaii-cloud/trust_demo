import { INITIATIVES } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const initiative = INITIATIVES.find((i) => i.slug === params.slug);

  if (!initiative) {
    return {
      title: 'Initiative Not Found | TrustForward',
    };
  }

  return {
    title: `${initiative.title} | TrustForward`,
    description: initiative.shortDescription,
  };
}

export async function generateStaticParams() {
  return INITIATIVES.map((initiative) => ({
    slug: initiative.slug,
  }));
}

export default function InitiativeDetailPage({ params }: Props) {
  const initiative = INITIATIVES.find((i) => i.slug === params.slug);

  if (!initiative) {
    notFound();
  }

  const image = findImage(initiative.imageUrl);
  const relatedInitiatives = INITIATIVES.filter(i => i.slug !== initiative.slug).slice(0, 2);

  return (
    <div>
        <header className="bg-secondary py-16 text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Badge variant="outline">{initiative.category}</Badge>
                <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold">{initiative.title}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    {initiative.shortDescription}
                </p>
            </div>
        </header>

        <article className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {image && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
                                <Image
                                src={image.imageUrl}
                                alt={initiative.title}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                                />
                            </div>
                        )}
                        <div className="prose prose-lg max-w-none">
                            <h2 className="font-headline text-2xl font-semibold">About the Project</h2>
                            <p className="text-muted-foreground">{initiative.longDescription}</p>

                            <h2 className="font-headline text-2xl font-semibold mt-8">Goals and Objectives</h2>
                            <ul className="text-muted-foreground space-y-2">
                                {initiative.goals.map((goal, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Target className="h-6 w-6 text-primary mt-1 shrink-0" />
                                        <span>{goal}</span>
                                    </li>
                                ))}
                            </ul>

                            <h2 className="font-headline text-2xl font-semibold mt-8">Impact Achieved</h2>
                            <p className="text-muted-foreground">{initiative.impact}</p>
                        </div>
                    </div>
                    <aside className="lg:col-span-1 space-y-8">
                        <Card className="bg-secondary">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">How You Can Help</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{initiative.howToHelp}</p>
                                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Link href="/get-involved">Get Involved Now</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">Other Initiatives</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {relatedInitiatives.map(related => (
                                    <Link key={related.id} href={`/initiatives/${related.slug}`} className="block group">
                                        <p className="font-semibold group-hover:text-primary transition-colors">{related.title}</p>
                                        <p className="text-sm text-muted-foreground">{related.shortDescription}</p>
                                    </Link>
                                ))}
                                <Button variant="link" asChild className="p-0 h-auto">
                                    <Link href="/initiatives">View All Initiatives <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </article>
    </div>
  );
}
