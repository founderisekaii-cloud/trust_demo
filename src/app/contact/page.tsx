
'use client';
import Image from 'next/image';
import { ContactForm } from '@/components/app/contact-form';
import { CONTACT_METHODS, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function ContactPage() {
  const heroImage = findImage('contact-hero');
  const router = useRouter();

  return (
    <div>
      <header className="relative h-64 md:h-80 w-full flex items-center justify-center text-white">
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
        <div className="absolute inset-0 bg-black/60" />
        <Button variant="ghost" onClick={() => router.back()} className="absolute top-6 left-4 text-white hover:bg-white/10 z-10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="relative text-center p-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
          <p className="mt-2 text-lg md:text-xl text-neutral-200">We're here to answer your questions.</p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-headline font-bold">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">
                Have a question, a proposal, or just want to say hello? Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-headline font-semibold">Contact Information</h3>
                <p className="mt-2 text-muted-foreground">
                  Reach out to us through any of the following methods.
                </p>
                <div className="mt-6 space-y-4">
                  {CONTACT_METHODS.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div key={method.title} className="flex items-start gap-4">
                        <Icon className="h-6 w-6 text-primary mt-1 shrink-0"/>
                        <div>
                          <h4 className="font-semibold">{method.title}</h4>
                          <p className="text-muted-foreground">{method.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-headline font-semibold">Follow Us</h3>
                 <p className="mt-2 text-muted-foreground">
                  Stay connected and up-to-date with our work.
                </p>
                <div className="mt-4 flex space-x-4">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-primary transition-colors p-2 bg-secondary rounded-full">
                        <Icon className="h-6 w-6" />
                        <span className="sr-only">{social.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <div className="w-full h-96">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.282998399583!2d-73.98784168459384!3d40.75583397932709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c65a2527%3A0x1d64115433625773!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={false} 
                loading="lazy"
                title="Google Maps Location"
            ></iframe>
        </div>
      </section>
    </div>
  );
}

    