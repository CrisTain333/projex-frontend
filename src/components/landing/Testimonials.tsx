import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Projex transformed how our team works. We shipped 40% faster in the first month alone.",
    name: "Sarah Chen",
    role: "Engineering Lead at TechCorp",
    avatar: "SC",
  },
  {
    quote:
      "Finally, a project management tool that doesn't feel like a spreadsheet. Clean, fast, and actually enjoyable to use.",
    name: "Marcus Johnson",
    role: "Product Manager at StartupXYZ",
    avatar: "MJ",
  },
  {
    quote:
      "The real-time collaboration features are game-changing. Our remote team feels more connected than ever.",
    name: "Emily Rodriguez",
    role: "CEO at DesignStudio",
    avatar: "ER",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E]">
            Loved by teams everywhere
          </h2>
          <p className="mt-4 text-lg text-[#4A4A68]">
            See what our customers have to say about Projex.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB] hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Quote */}
              <p className="text-[#4A4A68] leading-relaxed mt-2">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A2E]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
