
'use client';
import { VolunteerForm } from '@/components/app/volunteer-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GET_INVOLVED_OPTIONS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageHero } from '@/components/app/page-hero';
import { DonationForm } from '@/components/app/donation-form';


export default function GetInvolvedPage() {
  const getInvolvedCards = GET_INVOLVED_OPTIONS.filter(option => option.title !== 'Donate');

  return (
    <div>
      <PageHero title="Vikhyat Foundation" subtitle="Humanity at Heart, Progress in Action" />
      
      <section id="donate-section" className="py-16 md:py-24 bg-secondary scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <DonationForm />
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getInvolvedCards.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.title} className="flex flex-col text-center items-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl mt-4">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{option.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="default" className="w-full">
                      <Link href={option.link}>{option.cta}</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="volunteer-form" className="py-16 md:py-24 bg-secondary scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </div>
  );
}
