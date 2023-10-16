import connectMongoDB from "@/libs/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();

    console.log('Request URL:', request.url);

    const groupArray = request.url.split("groups=")[1];
    console.log('Parsed groupArray:', groupArray);

    let plants;

    if (groupArray.length === 0 && groupArray === "") {
      plants = await Plant.find();
    } else if (groupArray.length >= 1 && groupArray !== "") {
      const resultArray = groupArray.split(",");
      plants = await Plant.find({ group: { $in: resultArray } });
    }

    return NextResponse.json({ plants });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.error(`Error fetching plants: ${error.message}`);
  }
}
