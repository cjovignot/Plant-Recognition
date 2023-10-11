import User from "@/models/user";
import bcrypt from 'bcrypt';
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { pseudo, password } = await request.json();

    await connectMongoDB();

    const user = await User.findOne({ pseudo });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // You can also add logic here to generate JWT or set session, etc. for user authentication

    return NextResponse.json({ message: "Successfully logged in" });
}
