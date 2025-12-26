export interface MissionCardData {
  iconName: string
  title: string
  description: string
}

export interface VisionCardData {
  iconName: string
  title: string
  description: string
  highlight?: string
}

export const missionCards: MissionCardData[] = [
  {
    iconName: "Eye",
    title: "Financial Clarity",
    description: "We bring all your financial information together in one place, presenting it clearly without jargon or complexity."
  },
  {
    iconName: "Users",
    title: "User Empowerment", 
    description: "We give everyone the tools they need to make confident financial decisions, regardless of their expertise level."
  },
  {
    iconName: "Heart",
    title: "Accessibility First",
    description: "Understanding your money shouldn't require a finance degree. We make financial tools simple for everyone."
  }
]

export const visionCards: VisionCardData[] = [
  {
    iconName: "Brain",
    title: "AI-Powered Insights",
    description: "Intelligent recommendations that learn from your spending patterns to help optimize your financial health.",
    highlight: "Coming 2025"
  },
  {
    iconName: "Globe",
    title: "Global Expansion", 
    description: "Bringing financial clarity to users worldwide with multi-currency support and local banking integrations."
  },
  {
    iconName: "GraduationCap",
    title: "Financial Education",
    description: "Interactive learning modules and personalized guidance to build financial literacy for all users."
  }
]