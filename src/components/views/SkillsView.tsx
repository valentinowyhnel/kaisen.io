import React from 'react';
import { portfolioData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

const SkillsView = () => {
  const { skills } = portfolioData;
  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Skills</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map(category => (
            <div key={category} className="text-center">
              <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {skills
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <Badge key={skill.name} variant="default">
                      {skill.name}
                    </Badge>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsView;
