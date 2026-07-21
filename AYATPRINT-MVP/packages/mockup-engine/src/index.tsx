import React from 'react';

export interface RoomMockupProps {
  imageUrl: string;
  title?: string;
  roomType?: 'moroccan_salon' | 'dubai_majlis' | 'paris_apartment';
}

export const RoomMockup: React.FC<RoomMockupProps> = ({
  imageUrl,
  title = 'Islamic Calligraphy Masterpiece',
  roomType = 'moroccan_salon',
}) => {
  return (
    <div className="relative w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-gradient-to-b from-stone-900 via-amber-950/20 to-stone-950 flex items-center justify-center">
      {/* Wall Texture & Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(197,160,89,0.15),transparent_70%)] pointer-events-none" />

      {/* Moroccan Salon Furniture & Baseboard CSS Styling */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-stone-900/90 border-t border-amber-900/40 flex justify-around items-end pb-4 px-8">
        <div className="w-1/3 h-16 bg-amber-950/80 rounded-t-xl border border-amber-800/40 shadow-inner" />
        <div className="w-1/3 h-20 bg-amber-900/60 rounded-t-xl border border-amber-700/40 shadow-inner" />
        <div className="w-1/3 h-16 bg-amber-950/80 rounded-t-xl border border-amber-800/40 shadow-inner" />
      </div>

      {/* Superposed Artwork Frame */}
      <div className="relative z-10 p-3 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-lg shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105">
        <div className="p-1 bg-stone-950 rounded">
          <img
            src={imageUrl}
            alt={title}
            className="w-64 h-80 object-cover rounded shadow-inner"
          />
        </div>
      </div>

      {/* Room Badge */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-stone-950/80 backdrop-blur-md border border-amber-500/30 rounded-full text-xs font-medium text-amber-400">
        🏛️ {roomType.replace('_', ' ').toUpperCase()}
      </div>
    </div>
  );
};

export default RoomMockup;
