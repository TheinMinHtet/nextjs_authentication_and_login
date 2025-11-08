import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectToDatabase();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with verified=false
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      verified: false, 
      providers: ["credentials"] 
    });

    // Generate verification JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Prepare verification link
    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-success?token=${token}`;

    // Send verification email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Login" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your email",
      html: `<p>Hello ${name},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verifyUrl}">Verify Email</a>`,
    });

    return new Response(JSON.stringify({ message: "Registration successful! Check your email to verify." }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Registration failed" }), { status: 500 });
  }
}

