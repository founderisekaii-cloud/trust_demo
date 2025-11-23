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
  Link,
} from '@react-email/components';
import * as React from 'react';

interface NewContactInquiryEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const NewContactInquiryEmail = ({ name, email, subject, message }: NewContactInquiryEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission: {subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Inquiry Received</Heading>
        <Text style={paragraph}>
          A new message has been submitted through the website's contact form.
        </Text>

        <Hr style={hr} />

        <Section style={submissionSection}>
            <Text style={label}>From</Text>
            <Text style={submissionValue}>{name} (<Link href={`mailto:${email}`}>{email}</Link>)</Text>

            <Text style={label}>Subject</Text>
            <Text style={submissionValue}>{subject}</Text>
            
            <Text style={label}>Message</Text>
            <Text style={submissionValue}>{message}</Text>
        </Section>
        
        <Hr style={hr} />

        <Text style={footer}>
          This is an automated notification from the Vikhyat Foundation website.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewContactInquiryEmail;

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

const submissionSection = {
    padding: '0 24px',
};

const label = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: '4px',
};

const submissionValue = {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #e9ecef',
    fontSize: '15px',
    color: '#333',
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
