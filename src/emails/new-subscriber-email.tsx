
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NewSubscriberEmailProps {
  subscriberEmail: string;
}

const NewSubscriberEmail = ({ subscriberEmail }: NewSubscriberEmailProps) => (
  <Html>
    <Head />
    <Preview>New subscriber to the Vikhyat Foundation newsletter</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Newsletter Subscriber</Heading>
        <Text style={paragraph}>
          You have a new subscriber to your movement.
        </Text>
        <Text style={highlight}>
          {subscriberEmail}
        </Text>
        <Text style={footer}>
          You can reply to this email directly to get in touch with them.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewSubscriberEmail;

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
  textAlign: 'center' as const,
  padding: '0 24px',
  color: '#495057',
};

const highlight = {
  backgroundColor: '#e6f9ff',
  borderRadius: '4px',
  border: '1px solid #b3ecff',
  color: '#007bff',
  fontSize: '18px',
  fontWeight: 'bold',
  lineHeight: '24px',
  textAlign: 'center' as const,
  padding: '12px 24px',
  margin: '16px auto',
  maxWidth: 'fit-content',
};

const footer = {
  color: '#6c757d',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 24px',
  textAlign: 'center' as const,
};
