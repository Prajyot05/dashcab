import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    console.log("DB URL: ", process.env.DATABASE_URL!);
    const sql = neon(process.env.DATABASE_URL!);
    const { name, email, clerkId } = await request.json();

    console.log("Request: ", name, email, clerkId);

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing Required Fields" },
        { status: 400 }
      );
    }

    const response = await sql`
    INSERT INTO users (
        name,
        email,
        clerk_id
    )
    VALUES (
        ${name},
        ${email},
        ${clerkId}
    )
  `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
