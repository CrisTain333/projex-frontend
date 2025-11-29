import { Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F8F9FC] to-white py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23E5E7EB%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A2E] tracking-tight">
            Manage projects,{" "}
            <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
              ship faster
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-[#4A4A68] max-w-2xl mx-auto leading-relaxed">
            The modern project management tool for teams who want clarity,
            speed, and simplicity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start for Free
            </a>
            <a
              href="#demo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-[#4A4A68] font-semibold rounded-lg border-2 border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F8F9FC] transition-all"
            >
              <Play size={20} className="text-[#F97316]" />
              See how it works
            </a>
          </div>
        </div>

        {/* Hero Image / Dashboard Mockup */}
        <div className="mt-16 lg:mt-24 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#F97316]/20 to-[#EC4899]/20 rounded-2xl blur-3xl" />
          <div className="relative bg-white rounded-xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F8F9FC] border-b border-[#E5E7EB]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-md mx-auto bg-white rounded-md px-3 py-1.5 text-sm text-[#6B7280] border border-[#E5E7EB]">
                  app.projex.io/board/main
                </div>
              </div>
            </div>

            {/* Dashboard Content Placeholder */}
            <div className="p-6 bg-[#F8F9FC] min-h-[400px]">
              <div className="grid grid-cols-4 gap-4">
                {/* Kanban Columns */}
                {["To Do", "In Progress", "Review", "Done"].map((col, i) => (
                  <div key={col} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-[#1A1A2E] text-sm">{col}</h3>
                      <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded">
                        {3 - i}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {[...Array(3 - i)].map((_, j) => (
                        <div
                          key={j}
                          className="bg-[#F8F9FC] rounded-lg p-3 border border-[#E5E7EB]"
                        >
                          <div className="h-3 bg-[#E5E7EB] rounded w-3/4 mb-2" />
                          <div className="h-2 bg-[#E5E7EB] rounded w-1/2" />
                          <div className="flex items-center gap-2 mt-3">
                            <div
                              className="h-5 w-5 rounded-full"
                              style={{
                                background: `linear-gradient(135deg, #F97316 0%, #EC4899 100%)`,
                              }}
                            />
                            <div className="h-2 bg-[#E5E7EB] rounded w-16" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
