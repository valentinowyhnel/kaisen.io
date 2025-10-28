import React from 'react';
import { portfolioData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const CertificatesView = () => {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <div key={index} className="border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
              <p className="text-muted-foreground mb-4">{certificate.issuer} - {certificate.date}</p>
              {certificate.link && (
                <Button asChild variant="outline" size="sm">
                  <a href={certificate.link} target="_blank" rel="noopener noreferrer">
                    View Certificate <ArrowUpRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesView;
