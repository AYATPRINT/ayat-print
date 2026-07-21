import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface FabricCanvasProps {
  width?: number;
  height?: number;
  initialText?: string;
  onCanvasChange?: (json: any) => void;
}

export const FabricCanvas: React.FC<FabricCanvasProps> = ({
  width = 800,
  height = 600,
  initialText = 'Surah An-Nas',
  onCanvasChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#FAF8F5',
    });

    fabricRef.current = canvas;

    // Add Initial Calligraphy / Text Element
    const text = new fabric.IText(initialText, {
      left: width / 2 - 100,
      top: height / 2 - 25,
      fontFamily: 'Amiri',
      fontSize: 40,
      fill: '#C5A059',
      cornerColor: '#2B2B2B',
      cornerSize: 8,
      transparentCorners: false,
    });

    canvas.add(text);
    canvas.renderAll();

    // Event Listener for serialization
    canvas.on('object:modified', () => {
      if (onCanvasChange) {
        onCanvasChange(canvas.toJSON());
      }
    });

    return () => {
      canvas.dispose();
    };
  }, [width, height, initialText]);

  const addText = (newText: string) => {
    if (!fabricRef.current) return;
    const text = new fabric.IText(newText, {
      left: 100,
      top: 100,
      fontFamily: 'Outfit',
      fontSize: 28,
      fill: '#1A1A1A',
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  };

  const addRectangleFrame = () => {
    if (!fabricRef.current) return;
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      width: width - 100,
      height: height - 100,
      fill: 'transparent',
      stroke: '#C5A059',
      strokeWidth: 4,
      rx: 8,
      ry: 8,
    });
    fabricRef.current.add(rect);
    fabricRef.current.renderAll();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Canvas Tool Bar */}
      <div className="flex gap-3 bg-white p-2 rounded-xl border border-stone-200 shadow-sm">
        <button
          onClick={() => addText('Bismi-llāhi r-raḥmāni r-raḥīm')}
          className="px-4 py-2 bg-stone-900 text-gold-400 font-medium text-xs rounded-lg hover:bg-black transition"
        >
          + Add Basmala
        </button>
        <button
          onClick={addRectangleFrame}
          className="px-4 py-2 bg-stone-100 text-stone-800 font-medium text-xs rounded-lg hover:bg-stone-200 transition"
        >
          + Gold Inset Frame
        </button>
      </div>

      {/* Fabric.js Interactive Canvas Element */}
      <div className="border-4 border-stone-900 shadow-2xl rounded-lg overflow-hidden bg-cream">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default FabricCanvas;
