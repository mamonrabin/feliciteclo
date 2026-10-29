import { LucideIcon, RotateCw, ShieldCheck, Sparkles, Truck } from "lucide-react";

const benefits: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Truck,
    title: "Express Delivery",
    description:
      "Inside Dhaka in 24–48 hrs (৳80). All districts across Bangladesh in 3–5 days (৳150).",
  },
  {
    icon: ShieldCheck,
    title: "Cash on Delivery",
    description:
      "Pay when your order arrives. Check our delivery and payment policies before ordering.",
  },
  {
    icon: RotateCw,
    title: "3-Day Exchange Guarantee",
    description:
      "Simple size and fit exchanges for eligible unworn pieces with tags intact.",
  },
  {
    icon: Sparkles,
    title: "Heavyweight Craft",
    description:
      "Premium cotton, heavyweight fleece, and contemporary architectural silhouettes.",
  },
];

const ServiceBenefits = () => {
    return (
        <div className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4"
              >
                <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                  <Icon className="size-5 text-neutral-200" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold tracking-[0.14em] text-white uppercase">
                    {title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-neutral-400">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ServiceBenefits;