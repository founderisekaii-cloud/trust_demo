import { NEWS_ARTICLES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Media | TrustForward',
  description: 'Stay informed with the latest articles, press releases, and announcements from TrustForward.',
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function NewsPage() {
    const categories = [...new Set(NEWS_ARTICLES.map(a => a.category))];

  return (
    <div>
      <header className="bg-secondary py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">News & Media</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The latest articles, press releases, public announcements, and opinion pieces from TrustForward.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filtering could be added here in a future version */}
          {/* <div className="flex justify-center flex-wrap gap-2 mb-12">
            <Button variant="secondary">All</Button>
            {categories.map(c => <Button key={c} variant="ghost">{c}</Button>)}
          </div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS_ARTICLES.map((article) => {
              const image = findImage(article.imageUrl);
              return (
                <Card key={article.id} className="flex flex-col overflow-hidden group">
                  {image && (
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                            src={image.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <p className="text-sm text-muted-foreground">{article.date}</p>
                    </div>
                    <CardTitle className="font-headline text-xl mt-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{article.shortDescription}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link href={`/news/${article.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
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
