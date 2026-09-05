"use client";

import { useState } from "react";
import { CycleToggle } from "@/components/pricing/CycleToggle";
import { PricingCard } from "@/components/pricing/PricingCard";
import type { CycleDays } from "@/config/pricing";
import { getCycle, pricingConfig } from "@/config/pricing";

type PricingSectionProps = {
  toggleLabel: string;
  pendingNote: string;
};

/** Holds the selected cycle; everything else is config-driven. */
export function PricingSection({ toggleLabel, pendingNote }: PricingSectionProps) {
  const [cycle, setCycle] = useState<CycleDays>(pricingConfig.defaultCycle);
  const option = getCycle(cycle);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center gap-3 text-center">
        <CycleToggle
          options={pricingConfig.cycles}
          value={cycle}
          onChange={setCycle}
          label={toggleLabel}
        />
        <p className="text-base text-ink-muted" aria-live="polite">
          {option.framing}
        </p>
      </div>
      <div className="mt-10">
        <PricingCard
          option={option}
          includes={pricingConfig.includes}
          currency={pricingConfig.currency}
          pendingNote={pendingNote}
        />
      </div>
    </div>
  );
}
