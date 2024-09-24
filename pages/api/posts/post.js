import multer from 'multer';
import sharp from 'sharp';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import { connect } from 'http2';

const prisma = new PrismaClient();

const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  upload.array('images')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading files' });
    }

    const { author, authorId, title, description, price, phone, instagram } = req.body;

    try {
      const optimizedImages = [];
      const imageRecords = [];

      // Optimize and save each image using Sharp
      for (let file of req.files) {
        const optimizedPath = `uploads/optimized-${Date.now()}-${file.originalname}`;
        await sharp(file.path)
          .resize({ width: 800 })
          .toFormat('jpeg', { quality: 80 })
          .toFile(optimizedPath);

        // Push the optimized image path to an array (you could also save it in MongoDB GridFS)
        optimizedImages.push(optimizedPath);

        imageRecords.push({
            src: optimizedPath,  // Storing the optimized image path
          });
        
        // Clean up the original uploaded file
        fs.unlinkSync(file.path);
      }

      // Save post details and image references in MongoDB
      const newPost = {
        title,
        description,
        phone,
        instagram,
        date: new Date(),
        price,
        author: {
            connect: { id: authorId } 
        },
        images: {
            create: imageRecords, 
          }
      };

      const result = await prisma.post.create({
        data: newPost
      });

      res.status(201).json({ message: 'Post created', postId: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
    }
  });
};

export default handler;