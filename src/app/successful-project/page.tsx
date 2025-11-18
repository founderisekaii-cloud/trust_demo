'use client';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessfulProjectPage() {
    const router = useRouter();

    return (
        <div>
            <header className="bg-primary text-primary-foreground py-16 md:py-24 text-center relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Button variant="ghost" onClick={() => router.back()} className="absolute top-6 left-4 text-primary-foreground hover:bg-primary/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Successful Projects</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                        Highlights of our impactful work and the positive change we've driven in communities.
                    </p>
                </div>
            </header>
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
