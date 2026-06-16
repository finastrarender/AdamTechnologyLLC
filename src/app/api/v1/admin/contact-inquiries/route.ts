import { auth } from "@/auth";
import { jsonData, jsonError } from "@/lib/api-response";
import { connectMongo } from "@/lib/mongoose";
import ContactLead from "@/models/ContactLead";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return jsonError("unauthorized", "Sign in required", 401);
  }

  await connectMongo();
  const inquiries = await ContactLead.find({})
    .sort({ createdAt: -1 })
    .lean();

  return jsonData(
    inquiries.map((inquiry) => ({
      id: String(inquiry._id),
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone ?? "",
      company: inquiry.company ?? "",
      inquiryType: inquiry.inquiryType ?? "",
      message: inquiry.message,
      createdAt: inquiry.createdAt,
    })),
  );
}
