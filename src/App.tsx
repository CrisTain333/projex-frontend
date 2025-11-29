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

const App = () => {
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
};

export default App;
