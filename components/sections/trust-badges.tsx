import { Shield, Lock, Eye, CheckCircle } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "256-bit Encryption",
    description: "Bank-level security",
  },
  {
    icon: Lock,
    title: "Read-Only Access",
    description: "We never move your money",
  },
  {
    icon: Eye,
    title: "Privacy First",
    description: "We never sell your data",
  },
  {
    icon: CheckCircle,
    title: "2M+ Users",
    description: "Trusted worldwide",
  },
]

interface TrustBadgesProps {
  variant?: "default" | "compact" | "inline"
}

export function TrustBadges({ variant = "default" }: TrustBadgesProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-2">
            <badge.icon className="h-4 w-4 text-primary" />
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <badge.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{badge.title}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {badges.map((badge) => (
        <div key={badge.title} className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <badge.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-foreground">{badge.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}
