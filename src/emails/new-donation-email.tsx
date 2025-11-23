import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface NewDonationEmailProps {
  donorName?: string;
  amount?: number;
  orderId?: string;
}

const NewDonationEmail = ({ donorName = "A generous donor", amount, orderId }: NewDonationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for your generous donation to the Vikhyat Foundation!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank You, {donorName}!</Heading>
        <Text style={paragraph}>
            We are incredibly grateful for your generous donation to the Vikhyat Foundation. Your support is vital to our mission and helps us continue our work in empowering communities and driving social change.
        </Text>
        
        {amount && (
            <Text style={highlight}>
                Your contribution of ₹{amount.toLocaleString()} will make a real difference.
            </Text>
        )}

        <Text style={paragraph}>
            Your belief in our cause fuels our commitment. Together, we are building a more just, equitable, and prosperous society.
        </Text>

        {orderId && (
            <Text style={paragraph}>
                For your records, your donation transaction ID is: {orderId}
            </Text>
        )}

        <Hr style={hr} />

        <Text style={paragraph}>
            We invite you to learn more about the impact of your gift and stay connected with our work by visiting our website.
        </Text>
        
        <Button style={button} href="https://www.vikhyatfoundation.com">
          Visit Our Website
        </Button>
        
        <Hr style={hr} />

        <Text style={footer}>
          With heartfelt thanks,
          <br />
          The Vikhyat Foundation Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewDonationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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

const highlight = {
    ...paragraph,
    backgroundColor: '#e6f9ff',
    borderLeft: '4px solid #00b0f0',
    padding: '16px',
    margin: '16px 24px',
    fontWeight: 'bold',
};

const hr = {
  borderColor: '#e9ecef',
  margin: '20px 0',
};

const button = {
    backgroundColor: '#3399cc',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '14px',
    margin: '16px auto',
    width: '200px',
};

const footer = {
  color: '#6c757d',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 24px',
};
