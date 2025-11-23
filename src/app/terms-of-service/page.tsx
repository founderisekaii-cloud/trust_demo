
import { PageHero } from '@/components/app/page-hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Vikhyat Foundation',
  description: 'Read the terms and conditions for using the Vikhyat Foundation website.',
};

export default function TermsOfServicePage() {
  return (
    <div>
      <PageHero title="Terms of Service" subtitle="Guidelines for using our website" />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none text-foreground/80">
            <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our website. We reserve the right to modify these terms at any time. All changes will be effective immediately upon posting to the website.
            </p>

            <h2>2. Use of Website</h2>
            <p>
              You agree to use this website only for lawful purposes. You may not use this website for any purpose that is prohibited by these terms, conditions, and notices. You agree not to use the site to solicit others, to violate any international, federal, or state regulations, or to infringe upon our intellectual property rights.
            </p>
            
            <h2>3. Donations</h2>
            <p>
              All donations made through our website are voluntary. We use a third-party payment processor (Razorpay) to handle all transactions. We are not responsible for any errors or issues that may arise from the use of the payment processor. Please refer to our Cancellation and Refund Policy for information about donation refunds.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Vikhyat Foundation or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any content on this website without our express written permission.
            </p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              This website is provided on an "as is" and "as available" basis. Vikhyat Foundation makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall Vikhyat Foundation or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Vikhyat Foundation
              <br />
              vikhyatfoundation@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
