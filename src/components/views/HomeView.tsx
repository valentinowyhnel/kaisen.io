import React from 'react';
import { portfolioData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

const HomeView = () => {
  const { profile } = portfolioData;

  return (
    <section id="home" className="py-20 md:py-32">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{profile.name}</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">{profile.title}</h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-12">{profile.bio}</p>
        <div className="flex justify-center items-center space-x-4">
          <Button asChild variant="outline" size="icon">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon">
            <a href={`mailto:${profile.email}`}>
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeView;
