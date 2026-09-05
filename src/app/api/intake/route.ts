import { NextResponse } from "next/server";
import { getIntakeProvider, validateIntake } from "@/lib/intake";

export const runtime = "nodejs";

/**
 * POST /api/intake
 *
 * Accepts the pre-launch intake form and hands it to the configured intake
 * provider (see src/lib/intake). Swap providers via INTAKE_PROVIDER; this
 * route does not change.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const result = validateIntake((body ?? {}) as Record<string, unknown>);
  if (result.errors) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  try {
    const provider = getIntakeProvider();
    const receipt = await provider.submit(result.data, {
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") ?? undefined,
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    });
    return NextResponse.json({ ok: true, receipt }, { status: 201 });
  } catch (error) {
    console.error("[intake] provider error", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your details just now. Please try again." },
      { status: 502 },
    );
  }
}
