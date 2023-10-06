import connectMongoDB from "@/libs/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, family, genre, species, cultivar, group } = await request.json();
  await connectMongoDB();
  await Plant.create({ name, family, genre, species, cultivar, group });
  return NextResponse.json({ message: "Plant Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const plants = await Plant.find();
  return NextResponse.json({ plants });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(id)
  await connectMongoDB();
  await Plant.findByIdAndDelete(id);
  return NextResponse.json({ message: "Plant deleted" }, { status: 200 });
}
