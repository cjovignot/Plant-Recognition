import connectMongoDB from "@/libs/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, family, genre, species, cultivar, group, imageUrl } = await request.json();
  await connectMongoDB();
  await Plant.create({ name, family, genre, species, cultivar, group, imageUrl });
  return NextResponse.json({ message: "Plant Created" }, { status: 201 });
}

export async function GET() {
  try {
      await connectMongoDB();

      const plants = await Plant.find();
      return NextResponse.json({ plants });
  } catch (error) {
      console.error('Error fetching plants:', error);
      return NextResponse.serverError('Error fetching plants.');
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Plant.findByIdAndDelete(id);
  return NextResponse.json({ message: "Plant deleted" }, { status: 200 });
}
