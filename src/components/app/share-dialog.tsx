
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SHARE_PLATFORMS } from '@/lib/data';
import { Check, Copy } from 'lucide-react';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';

export function ShareDialog({ children }: { children: React.ReactNode }) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const { toast } = useToast();

  const [shareUrl, setShareUrl] = React.useState('');
  React.useEffect(() => {
    // Ensure window is defined (runs only on client)
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.origin);
    }
  }, []);

  const getShareLink = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const text = encodeURIComponent("Join me in supporting Vikhyat Foundation's mission to empower communities!");
    
    switch (platform) {
      case 'Facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case 'Twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
      case 'LinkedIn':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
      case 'WhatsApp':
        return `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setHasCopied(true);
    toast({ title: 'Success!', description: 'Link copied to clipboard.' });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Our Mission</DialogTitle>
          <DialogDescription>
            Help us grow our movement by sharing our cause with your network.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {SHARE_PLATFORMS.map((platform) => {
                    const Icon = platform.icon;
                    return (
                        <a
                            key={platform.name}
                            href={getShareLink(platform.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <Button variant="outline" className={`w-full text-white hover:opacity-90 ${platform.color} hover:bg-inherit`}>
                                <Icon className="mr-2 h-4 w-4" />
                                {platform.name}
                            </Button>
                        </a>
                    )
                })}
            </div>

            <div className="relative">
                <Input value={shareUrl} readOnly className="pr-12" />
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={handleCopy}
                >
                    {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy link</span>
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
