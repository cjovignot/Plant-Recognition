import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(request) {
    const { pseudo, password } = await request.json();

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await connectMongoDB();

    // Save the hashed password
    await User.create({ pseudo, password: hashedPassword });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
