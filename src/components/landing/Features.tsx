import {
  Layers,
  Kanban,
  Map,
  MessageCircle,
  Bell,
  Search,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Spaces & Projects",
    description: "Organize work hierarchically with flexible spaces and projects.",
  },
  {
    icon: Kanban,
    title: "Kanban & Scrum Boards",
    description: "Visualize progress your way with customizable board views.",
  },
  {
    icon: Map,
    title: "Epics & Roadmaps",
    description: "Plan big picture initiatives and track long-term goals.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Collaboration",
    description: "Comments, mentions, and updates that keep everyone in sync.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed, not overwhelmed with intelligent alerts.",
  },
  {
    icon: Search,
    title: "Fast Search",
    description: "Find anything in milliseconds with powerful global search.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E]">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
              ship
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#4A4A68]">
            All the tools your team needs to plan, track, and deliver great work.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#F97316]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#1A1A2E] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#4A4A68] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
