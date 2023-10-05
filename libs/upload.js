import { connectToDatabase } from "../../util/mongodb"; // Adjust path as needed
import axios from "axios";

const uploadImage = async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
  
    const { imageUrl } = req.body;
  
    try {
      // Upload image to Cloudinary
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
        {
          file: imageUrl,
          upload_preset: 'YOUR_UPLOAD_PRESET', // Use unsigned presets for simplicity
        }
      );
  
      const cloudinaryImageUrl = cloudinaryRes.data.url;
  
      // Connect to MongoDB
      const { db } = await connectToDatabase();
  
      // Store the Cloudinary image URL in MongoDB
      const collection = db.collection("images");
      await collection.insertOne({ url: cloudinaryImageUrl });
  
      res.status(200).json({ url: cloudinaryImageUrl });
    } catch (error) {
      res.status(500).json({ error: "Upload failed." });
    }
}

export default uploadImage;