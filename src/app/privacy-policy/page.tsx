
import { PageHero } from '@/components/app/page-hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vikhyat Foundation',
  description: 'Learn how Vikhyat Foundation collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero title="Privacy Policy" subtitle="Your trust is important to us" />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none text-foreground/80">
            <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>Introduction</h2>
            <p>
              Vikhyat Foundation ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make a donation, or volunteer with us. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2>Collection of Your Information</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the site, make a donation, or when you choose to participate in various activities related to the site.
              </li>
              <li>
                <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you donate. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Razorpay, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
              </li>
            </ul>

            <h2>Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
            <ul>
              <li>Process donations and send you receipts.</li>
              <li>Send you a newsletter or other information about our foundation.</li>
              <li>Respond to your comments and questions and provide customer service.</li>
              <li>Comply with legal and regulatory requirements.</li>
              <li>Contact you regarding your volunteer application.</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to others. We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <ul>
              <li>
                <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.
              </li>
            </ul>
            
            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
              <br />
              Vikhyat Foundation
              <br />
              Govind building, station road, thane west 400601
              <br />
              vikhyatfoundation@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
