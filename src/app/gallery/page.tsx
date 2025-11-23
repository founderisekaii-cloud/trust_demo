
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GALLERY_IMAGES } from '@/lib/data';
import type { Metadata } from 'next';
import { PageHero } from '@/components/app/page-hero';

export const metadata: Metadata = {
  title: 'Gallery | Vikhyat Foundation',
  description: 'A visual journey through our events, community work, and impact stories.',
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function GalleryPage() {
  return (
    <div>
      <PageHero title="Vikhyat Foundation" subtitle="Humanity at Heart, Progress in Action" />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {GALLERY_IMAGES.map((galleryImage) => {
              const image = findImage(galleryImage.imageUrl);
              if (!image) return null;

              return (
                <div key={galleryImage.id} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid group">
                  <div className="relative w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={image.imageUrl.includes('800') ? 800 : 400}
                      className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={image.imageHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="absolute bottom-0 left-0 p-4 text-white text-sm">{image.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
