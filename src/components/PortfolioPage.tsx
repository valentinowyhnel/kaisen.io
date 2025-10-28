'use client';

import { useDoc } from '@/hooks/useDoc';
import { PortfolioData } from '@/lib/portfolio';
import { Shield, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { data: portfolio, loading } = useDoc<PortfolioData>('portfolio', 'main');
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Portfolio Not Found</h1>
          <p className="text-muted-foreground mb-4">Please initialize your portfolio data.</p>
          {user && (
            <Link href="/admin">
              <Button>Go to Admin Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Kaisen.io</span>
          </div>
          <nav className="flex gap-4">
            {user && (
              <Link href="/admin">
                <Button variant="outline" size="sm">Admin Dashboard</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center mb-4">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {portfolio.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            {portfolio.title}
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            )}
            {portfolio.github && (
              <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-6 w-6" />
              </a>
            )}
            {portfolio.linkedin && (
              <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {portfolio.twitter && (
              <a href={portfolio.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Bio Section */}
      {portfolio.bio && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {portfolio.bio}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>Technical skills and competencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            View Project
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {portfolio.certifications && portfolio.certifications.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Certifications</h2>
            <div className="space-y-4">
              {portfolio.certifications.map((cert) => (
                <Card key={cert.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <CardDescription>
                      {cert.issuer} • {cert.date}
                    </CardDescription>
                  </CardHeader>
                  {cert.credential && (
                    <CardContent>
                      <a
                        href={cert.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        View Credential
                      </a>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
          <p className="text-sm mt-2">Last updated: {new Date(portfolio.updatedAt).toLocaleDateString()}</p>
        </div>
      </footer>
    </div>
  );
}
