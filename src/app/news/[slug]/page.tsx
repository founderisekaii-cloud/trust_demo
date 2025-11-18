import { NEWS_ARTICLES } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const article = NEWS_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Vikhyat Foundation',
    };
  }

  return {
    title: `${article.title} | Vikhyat Foundation`,
    description: article.shortDescription,
  };
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function NewsArticlePage({ params }: Props) {
  const article = NEWS_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const image = findImage(article.imageUrl);

  return (
    <article className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8">
            <Button variant="ghost" asChild>
                <Link href="/news" className="text-muted-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to News
                </Link>
            </Button>
        </div>

        <header>
          <h1 className="text-3xl md:text-5xl font-headline font-bold leading-tight">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <Badge variant="secondary">{article.category}</Badge>
            </div>
          </div>
        </header>

        {image && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 shadow-lg">
            <Image
              src={image.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={image.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-foreground/80">
          <p className="lead">{article.shortDescription}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 
          </p>
          <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
          </p>
          <blockquote>
            "This initiative marks a significant step forward in our commitment to the community. We are thrilled about the possibilities."
          </blockquote>
          <p>
            Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien.
          </p>
        </div>
      </div>
    </article>
  );
}
