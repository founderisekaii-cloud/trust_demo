
'use client';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/components/app/page-hero";

export default function OurActivityPage() {
    const router = useRouter();

    return (
        <div>
            <PageHero title="Our Activity" subtitle="Highlights of our impactful work and the positive change we've driven in communities." />
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-semibold">Content Coming Soon</h2>
                    <p className="mt-4 text-muted-foreground">
                        We are currently compiling stories and data from our successful projects. Please check back later to see the incredible impact our foundation is making.
                    </p>
                </div>
            </section>
        </div>
    );
}
