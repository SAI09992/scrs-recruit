const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // 1. Create Default Users (Bypass Accounts)
  const defaultUsers = [
    {
      email: "admin@scrs.in",
      name: "SCRS Administrator",
      role: "ADMIN",
    },
    {
      email: "panel@scrs.in",
      name: "Dr. A. Kumar (ML Mentor)",
      role: "PANEL",
    },
    {
      email: "candidate@scrs.in",
      name: "Sanjay Kumar",
      role: "CANDIDATE",
    },
  ];

  for (const u of defaultUsers) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role, name: u.name },
      create: u,
    });
    console.log(`Upserted user: ${user.name} (${user.role})`);
  }

  // 2. Create Recruitment Settings
  const settings = [
    { key: "whatsapp_link", value: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW" },
    { key: "telegram_link", value: "https://t.me/scrs_kalasalingam" },
    { key: "discord_link", value: "https://discord.gg/scrs-recruitment" },
    { key: "registration_open", value: "2026-07-20T00:00:00.000Z" },
    { key: "registration_close", value: "2026-08-15T23:59:59.000Z" },
    { key: "interview_start", value: "2026-08-17" },
    { key: "interview_end", value: "2026-08-22" },
    { key: "contact_phone_1", value: "+91 98765 43210" },
    { key: "contact_phone_2", value: "+91 87654 32109" },
    { key: "contact_email", value: "scrs@kalasalingam.ac.in" },
    { key: "recruitment_year", value: "2026" },
  ];

  for (const s of settings) {
    const setting = await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
    console.log(`Upserted setting: ${setting.key} = ${setting.value}`);
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
