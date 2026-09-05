import type { IntakeProvider } from "../provider";
import type { IntakeContext, IntakeReceipt, IntakeSubmission } from "../types";

/**
 * Pre-launch stub: logs a masked summary and returns a synthetic receipt.
 * Replace via INTAKE_PROVIDER when a real EHR / intake vendor is wired up.
 */
export class ConsoleIntakeProvider implements IntakeProvider {
  readonly name = "console";

  async submit(submission: IntakeSubmission, context: IntakeContext): Promise<IntakeReceipt> {
    const id = `stub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    // Intake is sensitive: never log PII in full, even pre-launch.
    console.info("[intake:console]", {
      id,
      name: maskName(submission.name),
      email: maskEmail(submission.email),
      dateOfBirth: "••••-••-••",
      state: submission.state,
      idempotencyKey: submission.idempotencyKey ?? null,
      submittedAt: context.submittedAt,
    });
    return { id, provider: this.name, receivedAt: new Date().toISOString() };
  }
}

function maskName(name: string): string {
  return name
    .split(" ")
    .map((part) => (part ? `${part[0]}•••` : ""))
    .join(" ");
}

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "•••";
  return `${user.slice(0, 1)}•••@${domain}`;
}
