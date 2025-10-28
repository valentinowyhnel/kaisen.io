import React from 'react';
import { portfolioData } from '@/lib/data';

const Header = () => {
  const { profile } = portfolioData;

  return (
    <header className="py-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
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
          <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
