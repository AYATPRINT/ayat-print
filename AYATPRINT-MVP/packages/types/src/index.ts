export interface CanvasObject {
  id: string;
  type: 'text' | 'image' | 'vector' | 'calligraphy' | 'shape';
  x: number;
  y: number;
  width?: number;
  height?: number;
  fill?: string;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  src?: string;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface DesignConfig {
  id: string;
  productId: string;
  title: string;
  artworkId: string;
  material: string;
  frame: string;
  size: string;
  canvasObjects: CanvasObject[];
  previewUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface PrintJobSpec {
  id: string;
  designId: string;
  orderId?: string;
  status: 'QUEUED' | 'PROCESSING' | 'PRINTING' | 'SHIPPED' | 'COMPLETED' | 'FAILED';
  material: string;
  dimensions: string;
  frameStyle: string;
  highResUrl: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'CUSTOMER' | 'OPERATOR';
}
