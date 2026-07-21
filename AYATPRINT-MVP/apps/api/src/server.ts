import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from '@ayatstudio/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'AyatStudio Core API',
    timestamp: new Date().toISOString(),
  });
});

// Designs API
app.get('/api/designs', async (req: Request, res: Response) => {
  try {
    const designs = await db.design.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, count: designs.length, data: designs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/designs', async (req: Request, res: Response) => {
  try {
    const { productId, title, material, frame, size, price, canvasObjects, previewUrl } = req.body;
    const design = await db.design.create({
      data: {
        productId: productId || 'prod_default',
        title: title || 'Custom Calligraphy Design',
        material: material || 'Canvas',
        frame: frame || 'Gold Frame',
        size: size || '80x120cm',
        price: price || 199.0,
        canvasObjects: canvasObjects || [],
        previewUrl: previewUrl || '',
      },
    });
    res.status(201).json({ success: true, data: design });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AyatStudio Core API server listening on http://localhost:${PORT}`);
});

export default app;
