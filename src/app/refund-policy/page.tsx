
import { PageHero } from '@/components/app/page-hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Vikhyat Foundation',
  description: 'Read the cancellation and refund policy for donations made to Vikhyat Foundation.',
};

export default function RefundPolicyPage() {
  return (
    <div>
      <PageHero title="Cancellation & Refund Policy" subtitle="Our commitment to transparency" />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none text-foreground/80">
            <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>Our Policy</h2>
            <p>
              Vikhyat Foundation is grateful for all donations received in support of our social and community work. As a non-profit organization, we rely on this support to continue our mission. We are committed to transparency and clarity in all our operations, including how we handle donations.
            </p>

            <h2>Donation Refunds</h2>
            <p>
              We understand that errors can happen. If you have made an error in your donation or change your mind, we are happy to honor your request for a refund.
            </p>
            <p>
              A refund will be processed under the following conditions:
            </p>
            <ul>
              <li>The request for a refund is made in writing within 7 days of the donation.</li>
              <li>You provide the donation receipt or proof of deduction (e.g., bank statement).</li>
              <li>You provide a valid reason for the refund request.</li>
            </ul>

            <h2>Cancellation Policy</h2>
             <p>
              For recurring donations, you can cancel your plan at any time. To cancel, please contact us at least 15 days prior to your next scheduled donation date. Your recurring donation will be stopped from the subsequent billing cycle.
            </p>

            <h2>How to Request a Refund or Cancellation</h2>
            <p>
              To request a refund or cancel a recurring donation, please send an email to <a href="mailto:vikhyatfoundation@gmail.com">vikhyatfoundation@gmail.com</a> with the subject line "Donation Refund/Cancellation Request". Please include your full name, contact information, donation amount, date of donation, and the reason for your request. Our team will get back to you within 5-7 business days.
            </p>
            
            <h2>Processing</h2>
            <p>
              Once your request is approved, the refund will be processed and credited back to the original method of payment within 10-15 business days. Please note that certain payment gateways may have their own processing times, which are beyond our control.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our Cancellation and Refund Policy, please contact us at:
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
