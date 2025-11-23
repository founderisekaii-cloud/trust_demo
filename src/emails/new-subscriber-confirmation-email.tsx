
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Button
} from '@react-email/components';
import * as React from 'react';

interface NewSubscriberConfirmationEmailProps {
  subscriberEmail: string;
}

const NewSubscriberConfirmationEmail = ({ subscriberEmail }: NewSubscriberConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to the Vikhyat Foundation!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Welcome to the Movement!</Heading>
        <Text style={paragraph}>
          Thank you for subscribing to the Vikhyat Foundation newsletter. We're thrilled to have you with us.
        </Text>
        <Text style={paragraph}>
          You'll now be among the first to hear about our latest initiatives, success stories, and opportunities to make a difference. We're excited to share our journey with you as we work towards a more just and equitable society.
        </Text>
        
        <Button style={button} href="https://www.vikhyatfoundation.com">
          Explore Our Work
        </Button>

        <Hr style={hr} />

        <Text style={footer}>
          Sincerely,
          <br />
          The Vikhyat Foundation Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewSubscriberConfirmationEmail;

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

const button = {
    backgroundColor: '#FF9800',
    borderRadius: '5px',
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '14px',
    margin: '16px auto',
    width: '200px',
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
};
