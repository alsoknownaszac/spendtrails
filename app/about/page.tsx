import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/sections/cta-section"
import { MissionCardsSection } from "@/components/sections/mission-cards-section"
import { VisionCardsSection } from "@/components/sections/vision-cards-section"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Shield, Lock, Eye, Server, Heart, Users, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Spendtrails mission to bring financial clarity to everyone. Discover our commitment to security, privacy, and user-first values.",
}

const values = [
  {
    icon: Heart,
    title: "User-First Design",
    description:
      "Every decision we make starts with a simple question: does this help our users understand their finances better?",
  },
  {
    icon: Users,
    title: "Accessibility for All",
    description:
      "Financial tools shouldn't be complicated. We build features that anyone can use, regardless of financial expertise.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Improvement",
    description: "We listen to our users and constantly evolve. Your feedback shapes the future of Spendtrails.",
  },
]

const securityFeatures = [
  {
    icon: Shield,
    title: "256-bit Encryption",
    description:
      "Your data is protected with the same encryption standards used by major financial institutions. All data in transit and at rest is fully encrypted.",
  },
  {
    icon: Lock,
    title: "Read-Only Access",
    description:
      "When you connect your accounts, we only have read-only access. We can see your transactions, but we can never move, transfer, or access your money.",
  },
  {
    icon: Eye,
    title: "We Never Sell Your Data",
    description:
      "Your financial information is yours. We will never sell, share, or monetize your personal data. Our business model is built on subscriptions, not your data.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description:
      "Our systems are hosted on secure, compliant infrastructure with continuous monitoring, regular security audits, and strict access controls.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Financial clarity for everyone
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We believe that understanding your money shouldn't require a finance degree. Spendtrails was built to
                give everyone the tools they need to take control of their financial lives.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission Section */}
        <MissionCardsSection />

        {/* Vision Section */}
        <VisionCardsSection />

        {/* Values Section */}
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">What We Stand For</h2>
            </AnimatedSection>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
              {values.map((value, index) => (
                <AnimatedSection
                  key={value.title}
                  animation={index === 0 ? "slide-in-left" : index === 2 ? "slide-in-right" : "fade-in-up"}
                  delay={index * 150}
                >
                  <div className="rounded-2xl bg-card p-6 shadow-sm h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Your Security is Our Priority</h2>
              <p className="mt-4 text-muted-foreground">
                We know that trusting an app with your financial information is a big decision. Here's how we protect
                you.
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
              {securityFeatures.map((feature, index) => (
                <AnimatedSection
                  key={feature.title}
                  animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                  delay={index * 100}
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Stats */}
        <AnimatedSection animation="scale-in">
          <section className="bg-primary py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16 lg:gap-24">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">2M+</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">Users trust us</p>
                </div>
                <div className="hidden h-10 w-px bg-primary-foreground/20 sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">0</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">Security incidents</p>
                </div>
                <div className="hidden h-10 w-px bg-primary-foreground/20 sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">100%</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">Encrypted data</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact / Support */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Questions?</h2>
              <p className="mt-4 text-muted-foreground">
                Our support team is here to help. Whether you have questions about features, security, or anything else,
                we're happy to assist.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild variant="outline">
                  <Link href="mailto:support@spendtrails.com">Contact Support</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          headline="Join millions who trust Spendtrails"
          subheadline="Start your journey to financial clarity today."
        />
      </main>

      <Footer />
    </div>
  )
}
