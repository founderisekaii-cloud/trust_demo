import { VolunteerForm } from '@/components/app/volunteer-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GET_INVOLVED_OPTIONS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Involved | TrustForward',
  description: 'Join our movement. Volunteer, donate, or partner with us to make a difference.',
};

export default function GetInvolvedPage() {
  return (
    <div>
      <header className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Get Involved</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            You have the power to create change. Discover the many ways you can contribute to our mission and make a lasting impact.
          </p>
        </div>
      </header>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GET_INVOLVED_OPTIONS.map((option) => {
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

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </div>
  );
}
