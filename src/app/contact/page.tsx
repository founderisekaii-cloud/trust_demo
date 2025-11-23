
'use client';
import Image from 'next/image';
import { ContactForm } from '@/components/app/contact-form';
import { CONTACT_METHODS, SOCIAL_LINKS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { PageHero } from '@/components/app/page-hero';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export default function ContactPage() {
  return (
    <div>
      <PageHero title="Vikhyat Foundation" subtitle="Humanity at Heart, Progress in Action" />

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
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d235.50961929715052!2d72.97666752704521!3d19.188478923788903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s6th%20Floor%20Govind%20Smruti%20Building%2C%20Opposite%20Patel%20Basta%20Bazaar%2C%20Lohar%20Ali%2C%20Thane%20400601!5e0!3m2!1shi!2sin!4v1763491956385!5m2!1shi!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
            ></iframe>
        </div>
      </section>
    </div>
  );
}
