
'use client';

import Link from 'next/link';
import { HandHeart } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Logo } from './logo';

export function Footer() {
  
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribing ${email}`);
    toast({
      title: 'Success!',
      description: 'Thank you for joining our movement!',
    });
    setEmail('');
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold">
              <Logo className="h-10 w-10 text-primary" />
              <div className="flex flex-col">
                <span>Vikhyat Foundation</span>
                <span className="text-xs font-normal text-muted-foreground mt-1">Humanity at Heart, Progress in Action</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering communities, driving social change, and building a better future together.
            </p>
            <div className="mt-6 flex space-x-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-primary">
                    <Icon className="h-6 w-6" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-headline font-semibold tracking-wider uppercase">Navigation</h3>
              <ul className="mt-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>{CONTACT_INFO.address}</li>
                <li>{CONTACT_INFO.email}</li>
                <li>{CONTACT_INFO.phone}</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-headline font-semibold tracking-wider uppercase">Join Our Movement</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Be the first to know about our latest initiatives and how you can make a difference.
              </p>
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 rounded-md border-input bg-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="default">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vikhyat Foundation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
