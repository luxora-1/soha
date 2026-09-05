import { FactsBar } from "@/components/ui/FactsBar";
import { siteConfig } from "@/config/site";

/** Trust signals: two stacked lines of two on phones, one dotted row from md. */
export function TrustBar() {
  return <FactsBar items={siteConfig.trustBar} label="Service details" variant="two-up" />;
}
