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
  Link
} from '@react-email/components';
import * as React from 'react';

interface NewVolunteerEmailProps {
  name: string;
  email: string;
  skills: string;
  interests: string;
  availability: string;
  inquiryType: 'volunteer' | 'partner';
}

const NewVolunteerEmail = ({ name, email, skills, interests, inquiryType }: NewVolunteerEmailProps) => {
  const title = inquiryType === 'volunteer' ? 'New Volunteer Application' : 'New Partnership Inquiry';
  
  return (
    <Html>
      <Head />
      <Preview>{title}: {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{title}</Heading>
          <Text style={paragraph}>
            A new inquiry has been submitted through the website's Get Involved form.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>{inquiryType === 'volunteer' ? 'Applicant Name:' : 'Organization/Individual Name:'}</Text>
            <Text style={value}>{name}</Text>
            <Text style={label}>Email:</Text>
            <Text style={value}><Link href={`mailto:${email}`}>{email}</Link></Text>
            {inquiryType === 'volunteer' && (
              <>
                <Text style={label}>Skills:</Text>
                <Text style={value}>{skills || 'Not provided'}</Text>
              </>
            )}
            <Text style={label}>{inquiryType === 'volunteer' ? 'Interests & Motivations:' : 'Partnership Proposal:'}</Text>
            <Text style={value}>{interests}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This is an automated notification from the Vikhyat Foundation website.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default NewVolunteerEmail;

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

const footer = {
  color: '#6c757d',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 24px',
  textAlign: 'center' as const,
};
