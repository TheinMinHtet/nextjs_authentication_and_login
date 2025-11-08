import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();
    const user = await User.findOne({ email }).select("_id");
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return new Response(JSON.stringify({ error: "Failed to check user existence" }), { status: 500 });
  }
}

        