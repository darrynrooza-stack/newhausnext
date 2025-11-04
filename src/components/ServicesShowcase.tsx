import { useEffect, useRef, useState } from 'react';
import { Smartphone, ShieldAlert, Smartphone as POS, Globe2, Lock, ShoppingCart, BarChart2, Repeat, ShieldCheck, Shuffle } from 'lucide-react';
import { Button } from './ui/button';
import { MerchantApplicationDialog } from './MerchantApplicationDialog';

const services = [
  {
    icon: Smartphone,
    title: "Mobile Payments",
    subtitle: "Pay Anywhere, Stay Connected",
    description: "Empower your customers with seamless, secure payment experiences wherever they are—whether on the go, curbside, or from the comfort of their home. Our mobile solutions adapt to every context, supporting digital wallets, QR codes, and in-app purchases for ultimate flexibility. Fast, convenient, and designed for today's shopper, it's commerce that fits their lifestyle.",
    stats: ["Over 60% of online shopping is now done via mobile devices", "Supports Apple Pay, Google Pay, Samsung Pay, and more", "PCI-compliant for maximum data security", "Real-time receipts and loyalty integration"],
    gradient: "from-crimson to-red-600",
    shadow: "shadow-crimson/30",
    showTapToPay: true,
  },
  {
    icon: ShieldAlert,
    title: "Advanced Fraud Detection",
    subtitle: "Built-In Vigilance, Zero Guesswork",
    description: "Protect your business and your customers with our multi-layered fraud prevention system. Leveraging machine learning and real-time analysis, we proactively spot and stop suspicious activity—so threats never reach your bottom line. You get peace of mind, fewer disputes, and more time to focus on growth.",
    stats: ["70% of fraud attempts are blocked automatically by our systems", "Includes 3D Secure, custom rules, and velocity checks", "Alerts and auto-responses keep your team ahead of threats", "Chargeback rates drop significantly with AI-driven monitoring"],
    gradient: "from-green-600 to-emerald-700",
    shadow: "shadow-green-900/40",
  },
  {
    icon: POS,
    title: "Modern POS Devices",
    subtitle: "Checkout, Evolved",
    description: "Upgrade your in-person experience with sleek, fast, and future-ready Point-of-Sale solutions. Accept all major payment types—chip, tap, swipe, and mobile—on hardware that just works, or use Tap to Pay to turn your smartphone or tablet into a secure, contactless payment terminal. With reliable connectivity and customizable branding, every transaction is frictionless and every interaction feels premium.",
    stats: ["92% of customers expect contactless options at checkout", "Tap to Pay: Accept cards, phones, and wearables directly on your device—no extra reader needed", "Built-in receipt printing and wireless options", "EMV and PCI-certified for security", "Integrated customer feedback and tipping prompts"],
    gradient: "from-silver-grey to-slate-700",
    shadow: "shadow-gray-900/40",
    showPosOverlay: true,
  },
  {
    icon: Globe2,
    title: "Global Payments",
    subtitle: "Business Without Borders",
    description: "Expand your reach and accept payments from anywhere on the planet. Our global payment solution lets you process in 135+ currencies, handle local methods, and manage international settlements—all from a single dashboard. Grow beyond limits, without the usual global headaches.",
    stats: ["Serve customers in over 200 countries", "Dynamic currency conversion built-in", "Automated compliance for every region", "Local payment methods boost conversion rates up to 25%"],
    gradient: "from-emerald-600 to-green-700",
    shadow: "shadow-emerald-900/40",
  },
  {
    icon: Lock,
    title: "Network Tokenization",
    subtitle: "Security That Stays with Every Card",
    description: "Enhance payment security and approval rates with network tokenization. By replacing sensitive card data with unique, encrypted tokens, you minimize the risk of breaches and keep recurring payments running smoothly—even when cards are updated or replaced.",
    stats: ["Up to 3% increase in transaction approvals", "Reduces PCI compliance burdens", "Automatic card updater—no more failed recurring payments", "Vault-stored tokens for maximum safety"],
    gradient: "from-indigo-600 to-purple-700",
    shadow: "shadow-indigo-900/40",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Solutions",
    subtitle: "Your Storefront, Supercharged",
    description: "Launch and grow your online presence with robust ecommerce tools that keep you agile and secure. From payment gateways to customizable checkouts, we give you everything you need to sell, scale, and connect with customers—without the technical pain.",
    stats: ["Pre-built integrations with top shopping carts", "Customizable checkout pages for any brand", "Secure, PCI-compliant transactions", "Stores with advanced ecommerce tools see 35% faster growth"],
    gradient: "from-crimson to-purple-800",
    shadow: "shadow-purple-900/40",
  },
  {
    icon: BarChart2,
    title: "Data & Analytics",
    subtitle: "See the Story in Your Sales",
    description: "Unlock powerful insights from your transaction data. Our analytics dashboard turns complex numbers into actionable trends, letting you track sales, customer behaviors, and campaign results in real time—no spreadsheets, no guesswork.",
    stats: ["Live dashboards with instant sales and refund metrics", "Custom reporting by product, channel, or region", "Customer segmentation and loyalty analytics", "Merchants with analytics tools make decisions 2x faster"],
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-900/40",
  },
  {
    icon: Repeat,
    title: "Subscription Billing",
    subtitle: "Effortless Recurring Revenue",
    description: "Automate your billing and grow your subscription base with tools that handle the complexity for you. Create, manage, and optimize plans—while smart dunning and card updating keep your revenue steady.",
    stats: ["46% of consumers pay for at least one subscription service", "Flexible trial, renewal, and proration options", "Automated failed payment recovery", "Reduce churn with card updater and retry logic"],
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-orange-900/40",
  },
  {
    icon: ShieldCheck,
    title: "Chargeback Management",
    subtitle: "Win More Disputes, Keep More Revenue",
    description: "Don't let disputes eat into your bottom line. Our automated system tracks, compiles, and submits evidence on your behalf, making it easier to contest chargebacks and reclaim lost revenue.",
    stats: ["Real-time chargeback alerts", "20% higher reversal rates with rapid response", "Integrated evidence templates for major card brands", "Analytics to spot and stop patterns before they repeat"],
    gradient: "from-indigo-700 to-purple-800",
    shadow: "shadow-indigo-900/40",
  },
  {
    icon: Shuffle,
    title: "Payment Orchestration",
    subtitle: "Smart Routing. More Approvals. Less Cost.",
    description: "Connect to multiple payment processors and dynamically route every transaction for the best outcome—lower fees, higher approval rates, fewer declines. Control your entire payment stack without extra IT overhead.",
    stats: ["Lower transaction costs by up to 20%", "Built-in failover for always-on acceptance", "Unified reporting across all channels and providers", "Optimize every payment path, automatically"],
    gradient: "from-teal-600 to-cyan-800",
    shadow: "shadow-teal-900/40",
  },
];

const ServicesShowcase = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isContactOpen, setIsContactOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const cardRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRef.current.forEach((card) => {
      if (card && observerRef.current) {
        observerRef.current.observe(card);
      }
    });
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const section = cardRef.current[index];
    if (!section) return;

    const gradientCard = section.querySelector('.gradient-card') as HTMLElement;
    const posImage = section.querySelector('.pos-image') as HTMLElement;
    if (!gradientCard) return;

    const rect = gradientCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;

    gradientCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    if (posImage) {
      posImage.style.transform = 'scale(2)';
    }
  };

  const handleCardMouseLeave = (index: number) => {
    const section = cardRef.current[index];
    if (!section) return;
    
    const gradientCard = section.querySelector('.gradient-card') as HTMLElement;
    const posImage = section.querySelector('.pos-image') as HTMLElement;
    
    if (gradientCard) {
      gradientCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    
    if (posImage) {
      posImage.style.transform = 'scale(1)';
    }
  };

  return (
    <section className="container mx-auto px-6 py-12 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img 
            src="/redshield.webp" 
            alt="MerchantHaus Security Shield" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
          <h2 className="text-5xl md:text-6xl font-bold font-ubuntu tracking-tight">MerchantHaus Core Services</h2>
        </div>
        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">Innovative solutions designed to power modern commerce safely and efficiently across the globe.</p>
      </div>

      {/* Services Grid */}
      <div className="space-y-20 md:space-y-24">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;
          const isVisible = visibleCards.has(index);

          return (
            <div
              key={index}
              data-index={index}
              ref={(el) => (cardRef.current[index] = el)}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-12 md:gap-16 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
            >
              {/* Gradient Card */}
              <div
                className={`gradient-card flex-shrink-0 w-72 h-96 rounded-2xl bg-gradient-to-br ${service.gradient} p-8 shadow-2xl ${service.shadow} flex items-center justify-center transition-transform duration-200 ease-out relative overflow-hidden`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Icon className="w-24 h-24 text-white drop-shadow-[0_8px_6px_rgb(0,0,0,0.55)] relative z-10" style={{ transform: 'translateZ(40px)' }} />
              </div>

              {/* Text Content */}
              <div className="max-w-xl text-center md:text-left space-y-6">
                <div className="flex items-start justify-center md:justify-start gap-4">
                  <div>
                    <h3 className="text-3xl font-bold font-montserrat mb-2">{service.title}</h3>
                    <p className="text-lg text-primary font-semibold italic">{service.subtitle}</p>
                  </div>
                  {service.showPosOverlay && (
                    <img 
                      src="/blog-images/opos-terminal.png" 
                      alt="POS Terminal" 
                      className="pos-image w-20 h-20 object-contain flex-shrink-0 transition-transform duration-300"
                    />
                  )}
                </div>
                
                {service.showTapToPay && (
                  <div 
                    className="inline-block animate-in slide-in-from-left duration-700"
                    style={{ animationDelay: '300ms' }}
                  >
                    <div className="px-6 py-3 rounded-full border-2 border-blue-700 bg-blue-700/10 backdrop-blur-sm">
                      <p className="text-lg font-bold text-blue-700 text-center mb-1">
                        Now featuring Tap to Pay
                      </p>
                      <p className="text-sm text-blue-600 text-center leading-snug">
                        Accept contactless cards and wallets directly on your mobile device.
                      </p>
                    </div>
                  </div>
                )}
                
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">{service.description}</p>
                <ul className="space-y-2 text-muted-foreground">
                  {service.stats.map((stat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm leading-relaxed">{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="mt-24 md:mt-32">
        <div className="max-w-4xl mx-auto bg-crimson text-white text-center py-12 px-6 rounded-2xl shadow-2xl shadow-crimson/40">
          <h2 className="text-3xl md:text-4xl font-bold font-ubuntu">Ready to Elevate Your Payments?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-white/90">
            Join the top merchants who trust MerchantHaus to deliver secure, reliable, and innovative payment solutions. Let's build the future of commerce together.
          </p>
          <Button 
            onClick={() => setIsContactOpen(true)}
            className="mt-8 bg-white text-crimson font-bold py-6 px-8 rounded-lg text-lg hover:bg-white/90 hover:scale-105 transition-transform duration-300"
          >
            Apply Now
          </Button>
        </div>
      </div>

      <MerchantApplicationDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
    </section>
  );
};

export default ServicesShowcase;
