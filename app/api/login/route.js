import User from "@/models/user";
import bcrypt from 'bcrypt';
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { pseudo, password } = await request.json();

    await connectMongoDB();

    const user = await User.findOne({ pseudo });

    if (!user) {
        return NextResponse.json({ message: "Compte introuvable" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return NextResponse.json({ message: "Mauvais mot de passe..." }, { status: 401 });
    }

    // You can also add logic here to generate JWT or set session, etc. for user authentication

    return NextResponse.json({ message: "Connexion réussie", role: user.role });
}
