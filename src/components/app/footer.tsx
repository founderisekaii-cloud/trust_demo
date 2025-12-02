'use client';

import Link from 'next/link';
import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import * as React from 'react';
import { Logo } from './logo';
import { Loader2 } from 'lucide-react';

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('./api/send-email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email,
          subject: 'New Newsletter Subscription',
          message: `Please add ${email} to the mailing list.`,
          isSubscription: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      toast({
        title: 'Success!',
        description: 'Thank you for joining our movement!',
      });
      setEmail('');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not subscribe.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const policyLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/refund-policy', label: 'Refund Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Logo className="h-20 w-auto" />
                <div className="flex flex-col">
                    <span className="font-headline text-xl font-bold">Vikhyat Foundation</span>
                    <span className="text-xs text-muted-foreground">Humanity at Heart, Progress in Action</span>
                </div>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering communities, driving social change, and building a better future together.
            </p>
            <div className="mt-6 flex space-x-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="sr-only">{social.label}</span>
                  </a>
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
                  disabled={isSubmitting}
                />
                <Button type="submit" variant="default" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
           <div className="flex justify-center gap-4 mb-4">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} Vikhyat Foundation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
