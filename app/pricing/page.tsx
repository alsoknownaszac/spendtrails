import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/sections/cta-section"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Check, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for Spendtrails. Start free and upgrade when you're ready for more features.",
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to get started with your finances.",
    features: [
      "Connect up to 2 accounts",
      "Basic spending insights",
      "Monthly budget tracking",
      "Bill reminders",
      "Mobile app access",
    ],
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Plus",
    price: "$4.99",
    period: "per month",
    description: "Advanced features for those serious about financial clarity.",
    features: [
      "Unlimited account connections",
      "Advanced spending analytics",
      "Custom budget categories",
      "Subscription tracking",
      "Savings goals",
      "Investment tracking",
      "Priority support",
    ],
    cta: "Start Free Trial",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "Family",
    price: "$9.99",
    period: "per month",
    description: "Shared finances made simple for households.",
    features: [
      "Everything in Plus",
      "Up to 5 family members",
      "Shared budgets & goals",
      "Household spending insights",
      "Individual & combined views",
      "Rent reporting for all members",
      "Premium support",
    ],
    cta: "Start Free Trial",
    ctaVariant: "outline" as const,
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I try Plus features before paying?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "Can I change plans anytime?",
    answer: "Absolutely. Upgrade, downgrade, or cancel anytime. Changes take effect at your next billing cycle.",
  },
  {
    question: "Is there a yearly discount?",
    answer: "Yes, paying annually saves you 20%. That's $47.90/year for Plus instead of $59.88.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and PayPal for subscription payments.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Simple, transparent pricing
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Start free and upgrade when you're ready. No hidden fees, no surprises—just the features you need to
                take control of your finances.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <AnimatedSection
                  key={plan.name}
                  animation={index === 0 ? "slide-in-left" : index === 2 ? "slide-in-right" : "fade-in-up"}
                  delay={index * 150}
                >
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border ${
                      plan.popular ? "border-primary bg-card shadow-lg ring-1 ring-primary" : "border-border bg-card"
                    } p-8`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                          <Sparkles className="h-4 w-4" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
                    </div>

                    <ul className="mt-8 flex-1 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button asChild variant={plan.ctaVariant} className="w-full">
                        <Link href="/download">{plan.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Annual Savings Callout */}
        <AnimatedSection animation="scale-in">
          <section className="bg-primary py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
                <div>
                  <p className="text-2xl font-bold text-primary-foreground sm:text-3xl">Save 20% with annual billing</p>
                  <p className="mt-1 text-primary-foreground/80">Pay yearly and keep more money in your pocket.</p>
                </div>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/download">Get Started</Link>
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Feature Comparison */}
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">What's included in each plan</h2>
              <p className="mt-4 text-muted-foreground">A detailed breakdown of features across all plans.</p>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={200} className="mt-12">
              <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Free</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-primary">Plus</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Family</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Connected accounts</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">2</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Unlimited</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Spending insights</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Basic</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Advanced</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Advanced</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Budget categories</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">5</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Unlimited</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Subscription tracking</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-muted-foreground">—</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Savings goals</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-muted-foreground">—</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Investment tracking</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-muted-foreground">—</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Family members</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">1</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">1</td>
                        <td className="px-6 py-4 text-center text-sm text-foreground">Up to 5</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-muted-foreground">Rent reporting</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-muted-foreground">—</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Frequently asked questions</h2>
            </AnimatedSection>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
              {faqs.map((faq, index) => (
                <AnimatedSection
                  key={faq.question}
                  animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                  delay={index * 100}
                >
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection headline="Ready to take control?" subheadline="Start free today. No credit card required." />
      </main>

      <Footer />
    </div>
  )
}
