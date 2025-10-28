/**
 * Generate a professional bio using AI
 * This function integrates with an AI service (OpenAI, Anthropic, etc.)
 * to generate a cybersecurity-focused professional bio
 */
export async function generateBio(params: {
  name: string;
  title: string;
  skills: string[];
  experience?: string;
}): Promise<string> {
  const { name, title, skills, experience } = params;
  
  // Prepare the prompt
  const prompt = `Generate a professional and engaging bio for a cybersecurity portfolio.
  
Name: ${name}
Title: ${title}
Skills: ${skills.join(', ')}
${experience ? `Experience: ${experience}` : ''}

The bio should:
- Be 2-3 paragraphs
- Highlight cybersecurity expertise
- Sound professional yet approachable
- Emphasize technical skills and passion for security
- Be written in third person`;

  try {
    // Use environment variable to determine which AI service to use
    const aiProvider = process.env.NEXT_PUBLIC_AI_PROVIDER || 'mock';
    
    if (aiProvider === 'openai') {
      return await generateWithOpenAI(prompt);
    } else if (aiProvider === 'anthropic') {
      return await generateWithAnthropic(prompt);
    } else {
      // Mock implementation for development
      return generateMockBio(name, title, skills);
    }
  } catch (error) {
    console.error('Error generating bio:', error);
    return generateMockBio(name, title, skills);
  }
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional bio writer specializing in cybersecurity profiles.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateWithAnthropic(prompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 500,
      messages: [
        { role: 'user', content: prompt }
      ],
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}

function generateMockBio(name: string, title: string, skills: string[]): string {
  return `${name} is a dedicated ${title} with expertise in ${skills.slice(0, 3).join(', ')}. With a passion for securing digital infrastructures and protecting sensitive data, they bring a comprehensive approach to cybersecurity challenges.

Throughout their career, ${name} has demonstrated proficiency in ${skills.slice(3, 6).join(', ')}, contributing to the development of robust security frameworks and incident response strategies. Their commitment to staying ahead of emerging threats and vulnerabilities makes them a valuable asset in the ever-evolving landscape of cybersecurity.

When not securing networks or analyzing potential vulnerabilities, ${name} enjoys sharing knowledge with the security community and contributing to open-source security projects.`;
}
