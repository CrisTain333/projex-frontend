import {
  Navbar,
  Hero,
  SocialProof,
  Features,
  HowItWorks,
  Testimonials,
  CTA,
  Footer,
} from "@/components/landing";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
