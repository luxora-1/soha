import type { IntakeProvider } from "./provider";
import { ConsoleIntakeProvider } from "./providers/console";

export type { IntakeProvider } from "./provider";
export type { IntakeContext, IntakeReceipt, IntakeSubmission } from "./types";
export { validateIntake } from "./validate";

/**
 * Resolve the configured intake provider.
 *
 * Set INTAKE_PROVIDER in the environment to switch implementations. Add new
 * providers to the switch below — the API route and the form stay unchanged.
 */
export function getIntakeProvider(): IntakeProvider {
  const name = process.env.INTAKE_PROVIDER ?? "console";
  switch (name) {
    case "console":
      return new ConsoleIntakeProvider();
    // case "ehr-vendor":
    //   return new EhrVendorIntakeProvider({ apiKey: process.env.EHR_API_KEY! });
    default:
      throw new Error(`Unknown INTAKE_PROVIDER: ${name}`);
  }
}
