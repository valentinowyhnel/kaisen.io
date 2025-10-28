import Header from "@/components/layout/Header";
import CertificatesView from "@/components/views/CertificatesView";
import HomeView from "@/components/views/HomeView";
import ProjectsView from "@/components/views/ProjectsView";
import SkillsView from "@/components/views/SkillsView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="mt-16">
        <HomeView />
        <ProjectsView />
        <SkillsView />
        <CertificatesView />
      </div>
    </main>
  );
}
