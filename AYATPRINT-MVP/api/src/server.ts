import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ─── In-Memory Stores ──────────────────────────────────────────────────────────
interface Design {
  id: string;
  artworkId: string;
  previewImage: string;
  material: string;
  frame: string;
  size: string;
  language: string;
  price: number;
  createdAt: string;
  metadata: Record<string, unknown>;
}

interface PrintJob {
  id: string;
  designId: string;
  orderId: string;
  status: 'pending' | 'queued' | 'in_production' | 'shipped' | 'delivered';
  provider: string;
  printSpecUrl: string | null;
  trackingNumber: string | null;
  createdAt: string;
}

const designs = new Map<string, Design>();
const printJobs = new Map<string, PrintJob>();

// ─── Health ─────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    designsCount: designs.size,
    printJobsCount: printJobs.size,
    timestamp: new Date().toISOString(),
  });
});

// ─── Designs API ────────────────────────────────────────────────────────────────

// POST /api/designs — Save a customization payload from Ayat Studio
app.post('/api/designs', (req, res) => {
  const { artworkId, previewImage, material, frame, size, language, price, metadata } = req.body;

  if (!artworkId) {
    res.status(400).json({ error: 'artworkId is required' });
    return;
  }

  const design: Design = {
    id: `dsn_${uuidv4().slice(0, 8)}`,
    artworkId: artworkId || 'unknown',
    previewImage: previewImage || '',
    material: material || 'premium_canvas',
    frame: frame || 'walnut_floating',
    size: size || '50x70cm',
    language: language || 'ar',
    price: price || 149.00,
    createdAt: new Date().toISOString(),
    metadata: metadata || {},
  };

  designs.set(design.id, design);
  console.log(`✅ Design created: ${design.id}`);

  res.status(201).json(design);
});

// GET /api/designs/:id — Retrieve design details (used by WooCommerce)
app.get('/api/designs/:id', (req, res) => {
  const design = designs.get(req.params.id);
  if (!design) {
    res.status(404).json({ error: 'Design not found' });
    return;
  }
  res.json(design);
});

// GET /api/designs — List all designs
app.get('/api/designs', (_req, res) => {
  res.json({ data: Array.from(designs.values()), total: designs.size });
});

// ─── Print Jobs API ─────────────────────────────────────────────────────────────

// POST /api/print-jobs — Create a print job from an order
app.post('/api/print-jobs', (req, res) => {
  const { designId, orderId } = req.body;

  if (!designId) {
    res.status(400).json({ error: 'designId is required' });
    return;
  }

  const design = designs.get(designId);
  if (!design) {
    res.status(404).json({ error: `Design ${designId} not found` });
    return;
  }

  const printJob: PrintJob = {
    id: `pj_${uuidv4().slice(0, 8)}`,
    designId,
    orderId: orderId || `wc_${Date.now()}`,
    status: 'pending',
    provider: 'gelato',
    printSpecUrl: null,
    trackingNumber: null,
    createdAt: new Date().toISOString(),
  };

  printJobs.set(printJob.id, printJob);
  console.log(`🖨️  Print Job created: ${printJob.id} for design ${designId}`);

  res.status(201).json(printJob);
});

// GET /api/print-jobs/:id — Retrieve print job details
app.get('/api/print-jobs/:id', (req, res) => {
  const job = printJobs.get(req.params.id);
  if (!job) {
    res.status(404).json({ error: 'Print Job not found' });
    return;
  }
  res.json(job);
});

// GET /api/print-jobs — List all print jobs
app.get('/api/print-jobs', (_req, res) => {
  res.json({ data: Array.from(printJobs.values()), total: printJobs.size });
});

// ─── Start Server ───────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '3002', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Ayat Core API running on http://0.0.0.0:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
