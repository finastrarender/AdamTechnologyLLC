import { Resend } from "resend";
import { jsonData, jsonError } from "@/lib/api-response";
import { validateContactForm } from "@/lib/contact-form-validation";
import { connectMongo } from "@/lib/mongoose";
import ContactLead from "@/models/ContactLead";
import { env } from "@/env";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("bad_request", "Invalid JSON", 400);
  }

  const validation = validateContactForm(body);
  if (!validation.success) {
    return jsonError("validation_error", validation.message, 422, {
      fieldErrors: validation.errors,
    });
  }

  await connectMongo();
  await ContactLead.create({
    name: validation.data.name,
    email: validation.data.email,
    phone: validation.data.phone,
    company: validation.data.company,
    inquiryType: validation.data.inquiryType,
    message: validation.data.message,
  });

  if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL) {
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      const from =
        process.env.CONTACT_FROM_EMAIL?.trim() || "OWTC Contact <onboarding@resend.dev>";
      await resend.emails.send({
        from,
        to: env.CONTACT_TO_EMAIL,
        subject: `Website contact from ${validation.data.name}`,
        html: `
          <p><strong>From:</strong> ${validation.data.name} &lt;${validation.data.email}&gt;</p>
          <p><strong>Phone:</strong> ${validation.data.phone || "-"}</p>
          <p><strong>Company:</strong> ${validation.data.company || "-"}</p>
          <p><strong>Inquiry Type:</strong> ${validation.data.inquiryType || "-"}</p>
          <p>${validation.data.message.replace(/</g, "&lt;")}</p>
        `,
      });
    } catch (e) {
      console.error("Resend error", e);
    }
  }

  return jsonData({ received: true });
}
