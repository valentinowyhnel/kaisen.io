'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useDoc } from '@/hooks/useDoc';
import { PortfolioData, updatePortfolio } from '@/lib/portfolio';
import { generateBio } from '@/lib/aiGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, Sparkles, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const { data: portfolio, loading: dataLoading } = useDoc<PortfolioData>('portfolio', 'main');

  const [formData, setFormData] = useState<Partial<PortfolioData>>({
    name: '',
    title: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (portfolio) {
      setFormData({
        name: portfolio.name || '',
        title: portfolio.title || '',
        bio: portfolio.bio || '',
        email: portfolio.email || '',
        github: portfolio.github || '',
        linkedin: portfolio.linkedin || '',
        twitter: portfolio.twitter || '',
        skills: portfolio.skills || [],
      });
    }
  }, [portfolio]);

  const handleInputChange = (field: keyof PortfolioData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills?.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((s) => s !== skill) || [],
    }));
  };

  const handleGenerateBio = async () => {
    if (!formData.name || !formData.title || !formData.skills?.length) {
      setMessage('Please fill in name, title, and at least one skill before generating bio');
      return;
    }

    setGenerating(true);
    setMessage('');

    try {
      const bio = await generateBio({
        name: formData.name,
        title: formData.title,
        skills: formData.skills,
      });
      setFormData((prev) => ({ ...prev, bio }));
      setMessage('Bio generated successfully!');
    } catch (error) {
      console.error('Error generating bio:', error);
      setMessage('Error generating bio. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      await updatePortfolio(formData);
      setMessage('Portfolio saved successfully!');
    } catch (error) {
      console.error('Error saving portfolio:', error);
      setMessage('Error saving portfolio. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Admin Dashboard</span>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">View Portfolio</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {message && (
          <div className={`mb-4 p-4 rounded-lg ${message.includes('Error') ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
            {message}
          </div>
        )}

        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Your personal and professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Cybersecurity Professional"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Connect your professional profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">GitHub</label>
              <Input
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">LinkedIn</label>
              <Input
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Twitter</label>
              <Input
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Add your technical skills and expertise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter a skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <Button onClick={handleAddSkill} type="button">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-primary/60 hover:text-primary"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Bio</CardTitle>
                <CardDescription>Your professional biography</CardDescription>
              </div>
              <Button
                onClick={handleGenerateBio}
                disabled={generating}
                variant="outline"
                size="sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {generating ? 'Generating...' : 'AI Generate'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Write about yourself and your expertise..."
              className="min-h-[200px]"
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
