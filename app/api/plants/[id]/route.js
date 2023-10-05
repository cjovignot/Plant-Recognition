import connectMongoDB from "@/libs/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description, newGenre: genre, newSpecies: species, newCultivar: cultivar } = await request.json();
  await connectMongoDB();
  await Plant.findByIdAndUpdate(id, { title, description, genre, species, cultivar });
  return NextResponse.json({ message: "Plant updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const plant = await Plant.findOne({ _id: id });
  return NextResponse.json({ plant }, { status: 200 });
}
