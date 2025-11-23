
'use client';
import { FOCUS_AREAS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BrainCircuit, HeartHandshake, Users, Leaf, Sprout, BookOpen, Landmark } from 'lucide-react';
import { PageHero } from '@/components/app/page-hero';

const iconMap: { [key: string]: React.ElementType } = {
  'Education & Skill Development': BrainCircuit,
  'Health & Wellness': HeartHandshake,
  'Women Empowerment': Users,
  'Environment & Sustainability': Leaf,
  'Rural Development': Sprout,
  'Cultural & Religious Activities': Landmark,
};

export default function WhatWeDoPage() {
  return (
    <div>
      <PageHero title="Vikhyat Foundation" subtitle="Humanity at Heart, Progress in Action" />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-12">
            {FOCUS_AREAS.map((area) => {
              const Icon = iconMap[area.title] || BookOpen;
              return (
                <Card key={area.title} className="overflow-hidden group w-full">
                  <CardHeader className="bg-secondary">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl md:text-3xl">{area.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h3 className="font-semibold text-xl mb-4">Our Approach</h3>
                        <p className="text-muted-foreground text-base leading-relaxed">
                            {area.description} We are committed to fostering sustainable and impactful change by addressing the root causes of societal challenges. Our approach is holistic and community-centric, ensuring that our interventions are not just effective but also culturally sensitive and long-lasting. We believe in empowering individuals and communities with the knowledge, skills, and resources they need to build a self-reliant and prosperous future. Through strategic partnerships and data-driven strategies, we meticulously plan and execute each project to maximize its positive impact. We engage directly with local stakeholders to co-create solutions that are relevant, scalable, and owned by the community itself, ensuring that our work leaves a legacy of resilience and progress for generations to come.
                        </p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-xl mb-4">Key Activities</h3>
                        <ul className="space-y-3">
                        {area.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
