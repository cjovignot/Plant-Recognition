import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(request) {
  const { pseudo, password } = await request.json();

  await connectMongoDB();

  // Check if pseudo already exists
  const existingUser = await User.findOne({ pseudo });
  if (existingUser) {
      return NextResponse.json({ message: "Pseudo déjà utilisé" }, { status: 400 });
  }

  // Hash the password before saving
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Save the hashed password
  await User.create({ pseudo, password: hashedPassword, role: 'user' });

  return NextResponse.json({ message: "Compte créé avec succès !" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "Compte supprimé.." }, { status: 200 });
}
