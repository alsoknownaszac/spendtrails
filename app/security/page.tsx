import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/sections/cta-section"
import { AnimatedSection } from "@/components/ui/animated-section"
import {
  Shield,
  Lock,
  Eye,
  Server,
  Key,
  FileCheck,
  ShieldCheck,
  Fingerprint,
  Database,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Security",
  description:
    "Learn how Spendtrails protects your financial data with bank-level encryption, read-only access, and privacy-first practices.",
}

const securityPillars = [
  {
    icon: Shield,
    title: "Bank-Level Encryption",
    description:
      "Your data is protected with 256-bit AES encryption—the same standard used by major banks and financial institutions worldwide. All data is encrypted both in transit and at rest.",
    benefits: ["256-bit AES encryption", "TLS 1.3 for data in transit", "Encrypted database storage"],
  },
  {
    icon: Lock,
    title: "Read-Only Access",
    description:
      "When you connect your accounts, Spendtrails only receives read-only access to view transactions. We can never move money, make transfers, or access your login credentials.",
    benefits: ["No money movement capability", "Credentials never stored", "View-only permissions"],
  },
  {
    icon: Eye,
    title: "Privacy First",
    description:
      "Your financial data belongs to you. We never sell, share, or monetize your personal information. Our business model is built on providing value through our service, not selling your data.",
    benefits: ["No data selling ever", "No third-party data sharing", "Transparent data practices"],
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description:
      "Our systems are hosted on SOC 2 compliant infrastructure with 24/7 monitoring, automated threat detection, and regular penetration testing by independent security firms.",
    benefits: ["SOC 2 compliant hosting", "24/7 security monitoring", "Regular security audits"],
  },
]

const additionalFeatures = [
  {
    icon: Key,
    title: "Two-Factor Authentication",
    description: "Add an extra layer of protection to your account with 2FA support.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Login",
    description: "Use Face ID or fingerprint to securely access your account on mobile.",
  },
  {
    icon: FileCheck,
    title: "Regular Audits",
    description: "Independent security firms regularly test our systems for vulnerabilities.",
  },
  {
    icon: Database,
    title: "Data Residency",
    description: "Your data is stored in secure, geographically distributed data centers.",
  },
]

const trustStats = [
  { value: "2M+", label: "Users trust us" },
  { value: "0", label: "Security breaches" },
  { value: "100%", label: "Data encrypted" },
  { value: "24/7", label: "Security monitoring" },
]

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your security is our foundation
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We understand that trusting an app with your financial information is a significant decision. That's why
                security isn't just a feature—it's the foundation of everything we build.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Security Features */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {securityPillars.map((feature, index) => (
                <AnimatedSection
                  key={feature.title}
                  animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                  delay={100}
                >
                  <div
                    className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Icon Visual */}
                    <div className="flex w-full justify-center lg:w-2/5">
                      <div className="relative">
                        <div className="h-48 w-48 rounded-3xl bg-muted sm:h-56 sm:w-56" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 sm:h-28 sm:w-28">
                            <feature.icon className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-3/5">
                      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{feature.title}</h2>
                      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                      <ul className="mt-6 space-y-3">
                        {feature.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-3 text-muted-foreground">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
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
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-sm text-primary-foreground/80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Additional Security Features */}
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Additional protections</h2>
              <p className="mt-4 text-muted-foreground">
                Multiple layers of security work together to keep your data safe.
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
              {additionalFeatures.map((feature, index) => (
                <AnimatedSection
                  key={feature.title}
                  animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                  delay={index * 100}
                >
                  <div className="flex gap-4 rounded-2xl bg-card p-6 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Common questions</h2>
            </AnimatedSection>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
              <AnimatedSection animation="slide-in-left" delay={100}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">Can Spendtrails access my money?</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    No. We only have read-only access to view your transactions. We cannot move money, make payments, or
                    access your banking credentials.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slide-in-right" delay={200}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">Do you sell my data?</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Never. We don't sell, share, or monetize your personal financial data. Our revenue comes from
                    providing valuable services, not from your information.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slide-in-left" delay={300}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">What happens if I delete my account?</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    When you delete your account, we permanently remove all your data from our systems. No backups, no
                    archives—it's completely gone.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slide-in-right" delay={400}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">How do you connect to my bank?</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    We use secure, industry-standard connections through trusted financial data providers. Your bank
                    credentials are never stored on our servers.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          headline="Ready to take control securely?"
          subheadline="Join millions who trust Spendtrails with their financial data."
        />
      </main>

      <Footer />
    </div>
  )
}
