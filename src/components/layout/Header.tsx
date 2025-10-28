import React from 'react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/lib/data';

const Header = () => {
  const { profile } = portfolioData;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-xl font-bold">
            {profile.name}
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
            Skills
          </a>
          <a href="#certificates" className="text-muted-foreground hover:text-foreground transition-colors">
            Certificates
          </a>
        </nav>
        <div className="flex items-center">
          <Button asChild>
            <a href={`mailto:${profile.email}`}>Contact Me</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
