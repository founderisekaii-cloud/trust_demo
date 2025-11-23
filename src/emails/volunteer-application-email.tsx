import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Button
} from '@react-email/components';
import * as React from 'react';

interface VolunteerApplicationEmailProps {
  name: string;
  skills: string;
  interests: string;
  inquiryType: 'volunteer' | 'partner';
}

const VolunteerApplicationEmail = ({ name, skills, interests, inquiryType }: VolunteerApplicationEmailProps) => {
    const title = inquiryType === 'volunteer' ? 'Thank You For Your Volunteer Application!' : 'Thank You For Your Partnership Inquiry!';
    const preview = `We've received your ${inquiryType} inquiry.`;

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Thank You, {name}!</Heading>
          <Text style={paragraph}>
            We have received your {inquiryType} inquiry and are thrilled to see your interest in joining our mission. Our team will review your information and get in touch with you soon regarding the next steps.
          </Text>
          <Text style={paragraph}>
            For your reference, here is a copy of your application:
          </Text>

          <Hr style={hr} />

          <Section style={section}>
             {inquiryType === 'volunteer' && (
              <>
                <Text style={label}>Your Skills:</Text>
                <Text style={value}>{skills || 'Not provided'}</Text>
              </>
            )}
            <Text style={label}>{inquiryType === 'volunteer' ? 'Your Interests & Motivations:' : 'Your Partnership Proposal:'}</Text>
            <Text style={value}>{interests}</Text>
          </Section>

          <Hr style={hr} />

           <Text style={paragraph}>
            In the meantime, feel free to explore more about our work on our website.
          </Text>
          
          <Button style={button} href="https://www.vikhyatfoundation.com">
            Explore Our Initiatives
          </Button>

          <Hr style={hr} />

          <Text style={footer}>
            Thank you again for your passion and commitment.
            <br />
            The Vikhyat Foundation Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default VolunteerApplicationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '32px',
  textAlign: 'center' as const,
  color: '#212529',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 24px',
  color: '#495057',
};

const section = {
    padding: '0 24px',
};

const label = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#495057',
  marginTop: '12px',
  marginBottom: '4px',
};

const value = {
  fontSize: '16px',
  color: '#212529',
  margin: 0,
  padding: '8px',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap' as const,
  wordWrap: 'break-word' as const,
};

const hr = {
  borderColor: '#e9ecef',
  margin: '20px 0',
};

const button = {
    backgroundColor: '#3399cc',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px 20px',
    margin: '16px auto',
    width: 'fit-content'
};

const footer = {
  color: '#6c757d',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 24px',
};
