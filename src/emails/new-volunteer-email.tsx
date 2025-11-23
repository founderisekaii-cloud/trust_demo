
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
  suggestions?: Array<{
    projectName: string;
    projectDescription: string;
    relevanceScore: number;
  }>;
}

const NewVolunteerEmail = ({ name, email, skills, interests, availability, suggestions }: NewVolunteerEmailProps) => (
  <Html>
    <Head />
    <Preview>New Volunteer Application: {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Volunteer Application</Heading>
        <Text style={paragraph}>
          A new volunteer application has been submitted through the website.
        </Text>

        <Hr style={hr} />

        <Section style={section}>
          <Text style={label}>Name:</Text>
          <Text style={value}>{name}</Text>
          <Text style={label}>Email:</Text>
          <Text style={value}><Link href={`mailto:${email}`}>{email}</Link></Text>
          <Text style={label}>Skills:</Text>
          <Text style={value}>{skills || 'Not provided'}</Text>
          <Text style={label}>Interests & Motivations:</Text>
          <Text style={value}>{interests}</Text>
          <Text style={label}>Availability:</Text>
          <Text style={value}>{availability || 'Not provided'}</Text>
        </Section>
        
        {suggestions && suggestions.length > 0 && (
            <>
                <Hr style={hr} />
                <Heading style={subHeading}>AI-Suggested Projects</Heading>
                <Text style={paragraph}>The following projects were suggested as a good fit for this applicant:</Text>
                {suggestions.map((proj) => (
                    <Section key={proj.projectName} style={projectSection}>
                        <Text style={projectTitle}>{proj.projectName} ({Math.round(proj.relevanceScore * 100)}% Match)</Text>
                        <Text style={projectDescription}>{proj.projectDescription}</Text>
                    </Section>
                ))}
            </>
        )}

        <Hr style={hr} />

        <Text style={footer}>
          This is an automated notification from the Vikhyat Foundation website.
        </Text>
      </Container>
    </Body>
  </Html>
);

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
  whiteSpace: 'pre-wrap' as const,
  wordWrap: 'break-word' as const,
};

const projectSection = {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #e9ecef',
    margin: '12px 0',
};

const projectTitle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
};

const projectDescription = {
    fontSize: '14px',
    margin: '4px 0 0 0',
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
