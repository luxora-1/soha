import type { IntakeContext, IntakeReceipt, IntakeSubmission } from "./types";

/**
 * The seam for a real EHR / intake vendor.
 *
 * To integrate a provider (e.g. an EHR's patient-intake API), add a file in
 * `./providers/` that implements this interface and register it in
 * `getIntakeProvider()`. Nothing in the form or the route needs to change.
 */
export interface IntakeProvider {
  readonly name: string;
  submit(submission: IntakeSubmission, context: IntakeContext): Promise<IntakeReceipt>;
}
