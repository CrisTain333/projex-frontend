const companies = [
  "Vercel",
  "Stripe",
  "Notion",
  "Linear",
  "Figma",
  "Slack",
];

export function SocialProof() {
  return (
    <section className="py-12 bg-[#F8F9FC] dark:bg-[#1A1A2E] border-y border-[#E5E7EB] dark:border-[#2D2D44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-[#6B7280] mb-8">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {companies.map((company) => (
            <div
              key={company}
              className="text-2xl font-bold text-[#9CA3AF] dark:text-[#4A4A68] hover:text-[#6B7280] dark:hover:text-[#6B7280] transition-colors cursor-default"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
