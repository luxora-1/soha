import type { IntakeProvider } from "../provider";
import type { IntakeContext, IntakeReceipt, IntakeSubmission } from "../types";

/**
 * Pre-launch stub: logs the submission and returns a synthetic receipt.
 * Replace via INTAKE_PROVIDER when a real EHR / intake vendor is wired up.
 */
export class ConsoleIntakeProvider implements IntakeProvider {
  readonly name = "console";

  async submit(submission: IntakeSubmission, context: IntakeContext): Promise<IntakeReceipt> {
    const id = `stub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    // Deliberately does not log email/DOB in full — treat intake as sensitive.
    console.info("[intake:console]", {
      id,
      name: submission.name,
      email: maskEmail(submission.email),
      dateOfBirth: "••••-••-••",
      state: submission.state,
      submittedAt: context.submittedAt,
    });
    return { id, provider: this.name, receivedAt: new Date().toISOString() };
  }
}

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "•••";
  return `${user.slice(0, 1)}•••@${domain}`;
}
