import { FolderPlus, Users, Rocket } from "lucide-react";

const steps = [
  {
    icon: FolderPlus,
    number: "01",
    title: "Create your space",
    description:
      "Set up your workspace in seconds. Organize projects, invite your team, and customize everything to fit your workflow.",
  },
  {
    icon: Users,
    number: "02",
    title: "Invite your team",
    description:
      "Bring your whole team together. Collaborate in real-time with comments, mentions, and instant updates.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Start shipping",
    description:
      "Track progress, hit deadlines, and deliver great work. Everything you need to move fast and stay organized.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-[#F8F9FC] dark:bg-[#0F0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] dark:text-white">
            How it works
          </h2>
          <p className="mt-4 text-lg text-[#4A4A68] dark:text-[#9CA3AF]">
            Get started in minutes, not hours. Here's how simple it is.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#F97316] to-[#EC4899] opacity-30" />
              )}

              <div className="text-center">
                {/* Icon Circle */}
                <div className="relative inline-flex">
                  <div className="w-32 h-32 rounded-full bg-white dark:bg-[#2D2D44] shadow-lg flex items-center justify-center border border-[#E5E7EB] dark:border-[#3D3D54]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#1A1A2E] dark:bg-white flex items-center justify-center">
                    <span className="text-white dark:text-[#1A1A2E] font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-[#1A1A2E] dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[#4A4A68] dark:text-[#9CA3AF] leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
