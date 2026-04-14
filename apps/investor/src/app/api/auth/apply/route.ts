import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const applicationData = await req.json();

    // Validate required fields
    if (!applicationData.name || !applicationData.email) {
      return NextResponse.json(
        { error: "MISSING_FIELDS", message: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!applicationData.verificationMethod) {
      return NextResponse.json(
        { error: "MISSING_VERIFICATION", message: "Verification method is required." },
        { status: 400 }
      );
    }

    if (!applicationData.ndaSigned) {
      return NextResponse.json(
        { error: "NDA_NOT_SIGNED", message: "NDA must be signed." },
        { status: 400 }
      );
    }

    if (!applicationData.investmentAmount || applicationData.investmentAmount < 10000) {
      return NextResponse.json(
        { error: "INVALID_AMOUNT", message: "Minimum investment is $10,000." },
        { status: 400 }
      );
    }

    // In production, save to Supabase
    // const { data, error } = await supabase
    //   .from('investor_applications')
    //   .insert({
    //     email: applicationData.email,
    //     name: applicationData.name,
    //     phone: applicationData.phone,
    //     entity_type: applicationData.entityType,
    //     verification_method: applicationData.verificationMethod,
    //     verification_status: 'pending',
    //     nda_signed: applicationData.ndaSigned,
    //     nda_signature: applicationData.ndaSignature,
    //     nda_signed_at: applicationData.ndaSignedAt,
    //     investment_amount: applicationData.investmentAmount,
    //     payment_status: 'pending',
    //   });

    // For demo, just log and return success
    console.log("New investor application:", {
      name: applicationData.name,
      email: applicationData.email,
      entityType: applicationData.entityType,
      verificationMethod: applicationData.verificationMethod,
      investmentAmount: applicationData.investmentAmount,
      ndaSigned: applicationData.ndaSigned,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: `app-${Date.now()}`,
    });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
