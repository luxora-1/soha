/**
 * Intake domain types. These are the contract between the form, the API
 * route, and whichever intake / EHR provider is configured.
 */

export type IntakeSubmission = {
  name: string;
  email: string;
  /** ISO date string, YYYY-MM-DD. */
  dateOfBirth: string;
  /** Two-letter US state code. */
  state: string;
  /**
   * Client-generated key, stable across retries of the same submission, so
   * a provider can de-duplicate. Optional until a provider requires it.
   */
  idempotencyKey?: string;
};

export type IntakeReceipt = {
  /** Provider-issued identifier for the created intake / lead. */
  id: string;
  provider: string;
  receivedAt: string;
};

export type IntakeContext = {
  /** Where the submission came from, for audit / attribution. */
  userAgent?: string;
  ip?: string;
  submittedAt: string;
  /**
   * Reserved for the consent record a real provider will need (policy
   * version, timestamp). Nothing collects it yet — LEGAL_PLACEHOLDER.
   */
  consent?: { policyVersion: string; acceptedAt: string };
};
