"use client"

import { Suspense } from "react"
import ArticleContent from "@/components/article-content"

// Mock article data
const ARTICLE_DATA = {
  title: "The Evolution of Proof of Stake: From Ethereum 2.0 to Shanghai",
  date: "2024-12-15",
  category: "Technology Deep Dive",
  readTime: "12 min read",
  author: "Crypto Intelligence Team",

  sections: [
    {
      id: 1,
      heading: "Introduction: The Consensus Layer Revolution",
      content: `The transition from Proof of Work (PoW) to Proof of Stake (PoS) represents one of the most significant technological achievements in cryptocurrency history. Ethereum's shift to PoS, culminated in the Shanghai upgrade of April 2023, fundamentally changed how blockchain networks validate transactions and secure their systems.`,
    },
    {
      id: 2,
      heading: "Historical Context: Mining Era",
      content: `Before the Merge, Ethereum relied on energy-intensive Proof of Work consensus. Miners competed to solve complex mathematical puzzles, consuming vast amounts of electricity. This system, while secure, created environmental concerns and barriers to entry for validators.`,
    },
    {
      id: 3,
      heading: "The Beacon Chain: Laying Foundation",
      content: `Launched in December 2020, the Beacon Chain introduced Proof of Stake to Ethereum. It ran parallel to the existing PoW chain, allowing developers and validators to test the system without risking the main network. This gradual approach proved crucial for smooth transition.`,
    },
    {
      id: 4,
      heading: "The Merge: Integration Complete",
      content: `On September 15, 2022, Ethereum successfully merged the Beacon Chain with the main network. This event reduced energy consumption by 99.95% and eliminated the need for mining. The security model shifted from hardware competition to economic stake.`,
    },
    {
      id: 5,
      heading: "Shanghai: Enabling Withdrawals",
      content: `The Shanghai upgrade completed the transition by enabling staking withdrawals. Validators could now withdraw their staked ETH and earned rewards, transforming Ethereum's validator experience from beta to production.`,
    },
    {
      id: 6,
      heading: "Market Impact and Implications",
      content: `The transition reduced ETH supply growth from ~4.3M per year to ~0.55M. This deflationary pressure, combined with EIP-1559 burning mechanisms, made ETH increasingly scarce. The upgrade opened discussion about staking yields and network sustainability.`,
    },
  ],

  signals: [
    { event: "ETH Supply Reduction", date: "Jan 2023", impact: "High" },
    { event: "Staking Rewards", date: "Apr 2023", impact: "High" },
    { event: "Institutional Adoption", date: "Jun 2023", impact: "Medium" },
  ],
}

export default function ArticlePage() {
  return (
    <Suspense fallback={null}>
      <ArticleContent />
    </Suspense>
  )
}
