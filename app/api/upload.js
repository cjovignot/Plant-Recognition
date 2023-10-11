import cloudinary from '../utils/cloudinary';

const uploadImage = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'ml_default'
      });

      if (uploadedResponse) {
        return res.json({ url: uploadedResponse.secure_url });
      } else {
        return res.status(500).json({ err: 'Upload failed.' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'Something went wrong.' });
    }
  } else {
    res.status(405).json({ err: 'Method not supported.' });
  }
};

export default uploadImage;
