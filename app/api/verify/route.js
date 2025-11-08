import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) return new Response("Missing token", { status: 400 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return new Response("Invalid token: user not found", { status: 400 });

    user.verified = true;
    await user.save();

    return new Response(JSON.stringify({ message: "Email verified successfully!" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Invalid or expired token.", { status: 400 });
  }
}
