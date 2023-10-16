import connectMongoDB from "@/libs/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();

    const groupArray = request.url.split("groups=")[1];
    const resultArray = groupArray.split(",");
    const plants = await Plant.find({ group: { $in: resultArray } });

    return NextResponse.json({ plants });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.serverError('Error fetching plants.');
  }
}