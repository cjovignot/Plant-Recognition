import connectMongoDB from "@/libs/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();

    const groupArray = request.url.split("groups=")[1];

    let plants;

    if (groupArray.length === 0 && groupArray === "") {
      console.log("NO CHOICES", groupArray)
      plants = await Plant.find();
    } else if (groupArray.length >= 1 && groupArray !== "") {
      const resultArray = groupArray.split(",");
      console.log("CHOICES", groupArray)
      plants = await Plant.find({ group: { $in: resultArray } });
    }

    return NextResponse.json({ plants });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.serverError('Error fetching plants.');
  }
}
