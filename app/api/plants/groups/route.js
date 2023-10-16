import connectMongoDB from "@/libs/mongodb";
import Plant from "@/models/plant";
import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     const groupArray = request.url.split("groups=")[1];
//     const resultArray = groupArray.split(",");
//     const plants = await Plant.find({ group: { $in: resultArray } });

//     return NextResponse.json({ plants });
//   } catch (error) {
//     console.error('Error fetching plants:', error);
//     return NextResponse.serverError('Error fetching plants.');
//   }
// }

export async function GET(request) {
  try {
    await connectMongoDB();

    // Get the 'groups' query parameter from the request
    const groupsParam = request.query.get("groups");

    // If 'groups' is provided, split it into an array
    const groups = groupsParam ? groupsParam.split(",") : [];

    // Create a filter object to filter plants by groups
    const filter = groups.length > 0 ? { group: { $in: groups } } : {};

    const plants = await Plant.find(filter);
    return NextResponse.json({ plants });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.serverError('Error fetching plants.');
  }
}