import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateApplicationId } from "@/lib/utils";
import { analyzeCandidateWithAI } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rollNumber = body.rollNumber ? String(body.rollNumber).trim() : "";
    const email = body.email ? String(body.email).trim().toLowerCase() : "";
    const phoneNumber = body.phoneNumber ? String(body.phoneNumber).trim() : "";

    if (!rollNumber || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Roll Number, Email, and Phone Number are required fields." },
        { status: 400 }
      );
    }

    // 1. Strict Duplicate Check: Roll Number OR Email OR Phone Number
    const existing = await prisma.application.findFirst({
      where: {
        OR: [
          ...(rollNumber ? [{ rollNumber }] : []),
          ...(email ? [{ email }] : []),
          ...(phoneNumber ? [{ phoneNumber }] : []),
        ],
      },
    });

    if (existing) {
      let duplicateField = "Roll Number, Email, or Phone Number";
      if (existing.rollNumber === rollNumber) duplicateField = `Roll Number (${rollNumber})`;
      else if (existing.email === email) duplicateField = `Email (${email})`;
      else if (existing.phoneNumber === phoneNumber) duplicateField = `Phone Number (${phoneNumber})`;

      return NextResponse.json(
        {
          error: `An application has already been submitted with this ${duplicateField}. Duplicate applications are strictly prohibited.`,
          existingId: existing.id,
        },
        { status: 400 }
      );
    }

    // 2. Count total applications to generate sequential ID
    const count = await prisma.application.count();
    const applicationId = generateApplicationId(count + 1);

    // 3. Compute AI candidate summary and skill gap suggestions
    const aiResult = analyzeCandidateWithAI({
      fullName: body.fullName,
      rollNumber,
      email,
      primaryDomain: body.primaryDomain,
      skills: body.skills || "",
      programmingLanguages: body.programmingLanguages || "",
      frameworks: body.frameworks || "",
      experience: body.achievements || body.experience || "",
      leadership: body.leadership || "",
      achievements: body.achievements || "",
      technicalAnswers: JSON.stringify(body.technicalAnswers || {}),
    });

    // 4. Save to Database
    const application = await prisma.application.create({
      data: {
        id: applicationId,
        fullName: body.fullName,
        rollNumber,
        department: body.department,
        year: body.year,
        section: body.section || "A",
        gender: body.gender || "Male",
        dob: body.dob || "",
        phoneNumber,
        email,
        address: body.address || "",
        city: body.city || "",
        linkedin: body.linkedin || "",
        github: body.github || "",
        portfolio: body.portfolio || "",
        resumeUrl: body.resumeUrl || "",
        photoUrl: body.photoUrl || "",
        primaryDomain: body.primaryDomain,
        secondaryDomain: body.secondaryDomain || "",
        skills: body.skills || "",
        programmingLanguages: body.programmingLanguages || "",
        frameworks: body.frameworks || "",
        designTools: body.designTools || "",
        technicalAnswers: JSON.stringify(body.technicalAnswers || {}),
        experience: body.achievements || body.experience || "",
        achievements: body.achievements || "",
        leadership: body.leadership || "",
        hoursPerWeek: Number(body.hoursPerWeek) || 10,
        reasonToJoin: body.reasonToJoin,
        strengths: body.strengths || "",
        weaknesses: body.weaknesses || "",
        goals: body.goals || "",
        status: "RECEIVED",
        aiSummary: aiResult.summary,
        aiSkillAnalysis: JSON.stringify(aiResult.skillGaps),
        aiSuggestions: aiResult.recommendation,
        aiQuestionSuggestions: JSON.stringify(aiResult.suggestedQuestions),
        score: aiResult.matchScore,
      },
    });

    // 5. Create Audit Log
    try {
      await prisma.auditLog.create({
        data: {
          user: {
            connectOrCreate: {
              where: { email: "system@scrs.in" },
              create: { email: "system@scrs.in", name: "System Automation", role: "ADMIN" },
            },
          },
          action: "APPLICATION_SUBMITTED",
          details: `Application ${application.id} submitted for ${application.fullName} (${application.primaryDomain})`,
        },
      });
    } catch (auditErr) {
      console.warn("Audit log creation bypassed:", auditErr);
    }

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      data: application,
    });
  } catch (error: any) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id && id.trim()) {
      const queryStr = id.trim();
      const app = await prisma.application.findFirst({
        where: {
          OR: [
            { id: queryStr.toUpperCase() },
            { rollNumber: queryStr },
            { email: queryStr.toLowerCase() },
            { phoneNumber: queryStr },
          ],
        },
      });
      if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });
      return NextResponse.json(app);
    }

    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(applications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Application ID and status are required fields." },
        { status: 400 }
      );
    }

    const updatedApp = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      data: updatedApp,
    });
  } catch (error: any) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update application status" },
      { status: 500 }
    );
  }
}
