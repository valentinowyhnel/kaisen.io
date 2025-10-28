import React from 'react';
import { portfolioData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const CertificatesView = () => {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{certificate.title}</CardTitle>
                <CardDescription>{certificate.issuer} - {certificate.date}</CardDescription>
              </CardHeader>
              {certificate.link && (
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <a href={certificate.link} target="_blank" rel="noopener noreferrer">
                      View Certificate <ArrowUpRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesView;
