
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
  Button
} from '@react-email/components';
import * as React from 'react';

interface VolunteerApplicationEmailProps {
  name: string;
  skills: string;
  interests: string;
  availability: string;
  suggestions?: Array<{
    projectName: string;
    projectDescription: string;
    relevanceScore: number;
  }>;
}

const VolunteerApplicationEmail = ({ name, skills, interests, availability, suggestions }: VolunteerApplicationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for your interest in volunteering with Vikhyat Foundation!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank You, {name}!</Heading>
        <Text style={paragraph}>
          We have received your volunteer application and are thrilled to see your interest in joining our mission. Our team will review your information and get in touch with you soon regarding the next steps.
        </t>
        <Text style={paragraph}>
          For your reference, here is a copy of your application:
        </t>

        <Hr style={hr} />

        <Section style={section}>
          <Text style={label}>Your Skills:</Text>
          <Text style={value}>{skills}</Text>
          <Text style={label}>Your Interests & Motivations:</Text>
          <Text style={value}>{interests}</Text>
          <Text style={label}>Your Availability:</Text>
          <Text style={value}>{availability}</Text>
        </Section>
        
        {suggestions && suggestions.length > 0 && (
            <>
                <Hr style={hr} />
                <Heading style={subHeading}>Suggested Projects For You</Heading>
                <Text style={paragraph}>Based on your profile, our AI assistant identified a few projects where you could make a great impact:</Text>
                {suggestions.map((proj) => {
                    const slug = proj.projectName.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <Section key={proj.projectName} style={projectSection}>
                            <Text style={projectTitle}>{proj.projectName} ({Math.round(proj.relevanceScore * 100)}% Match)</Text>
                            <Text style={projectDescription}>{proj.projectDescription}</Text>
                            <Button style={button} href={`https://yourwebsite.com/initiatives/${slug}`}>
                                Learn More
                            </Button>
                        </Section>
                    )
                })}
            </>
        )}

        <Hr style={hr} />

        <Text style={footer}>
          Thank you again for your passion and commitment.
          <br />
          The Vikhyat Foundation Team
        </t>
      </Container>
    </Body>
  </Html>
);

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

const subHeading = {
    ...heading,
    fontSize: '22px',
    marginTop: '24px',
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

const projectSection = {
    padding: '16px',
    margin: '16px 24px',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
};

const projectTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
};

const projectDescription = {
    fontSize: '14px',
    margin: '4px 0 12px 0',
    color: '#6c757d',
};

const hr = {
  borderColor: '#e9ecef',
  margin: '20px 0',
};

const button = {
    backgroundColor: '#007bff',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '14px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '8px 16px',
};

const footer = {
  color: '#6c757d',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 24px',
};
