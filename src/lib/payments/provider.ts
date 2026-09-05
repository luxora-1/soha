/**
 * Payments seam (pre-launch: nothing is wired).
 *
 * When live payments are added, implement this interface for the chosen
 * processor and resolve it from `getPaymentsProvider()`. Prices come only
 * from `src/config/pricing.ts`; the provider receives a cycle and returns a
 * checkout URL or session — pages never talk to the processor directly.
 */
import type { CycleDays } from "@/config/pricing";

export type CheckoutRequest = {
  cycle: CycleDays;
  /** Intake / lead id from the intake provider, to link the two records. */
  intakeId?: string;
};

export type CheckoutSession = {
  provider: string;
  /** Where to send the customer to pay. */
  url: string;
};

export interface PaymentsProvider {
  readonly name: string;
  createCheckout(request: CheckoutRequest): Promise<CheckoutSession>;
}

/** Placeholder used until a processor is configured. */
export class NotConfiguredPaymentsProvider implements PaymentsProvider {
  readonly name = "not-configured";
  async createCheckout(): Promise<CheckoutSession> {
    throw new Error("Payments are not configured (pre-launch).");
  }
}

export function getPaymentsProvider(): PaymentsProvider {
  const name = process.env.PAYMENTS_PROVIDER ?? "not-configured";
  switch (name) {
    case "not-configured":
      return new NotConfiguredPaymentsProvider();
    default:
      throw new Error(`Unknown PAYMENTS_PROVIDER: ${name}`);
  }
}
