import React from 'react';
import { Stage, Layer, Rect, Text as KonvaText, Group } from 'react-konva';

interface KonvaThumbnailProps {
  width?: number;
  height?: number;
  title: string;
  surah?: string;
  frameColor?: string;
  onClick?: () => void;
}

export const KonvaThumbnail: React.FC<KonvaThumbnailProps> = ({
  width = 240,
  height = 320,
  title,
  surah = 'Surah An-Nas',
  frameColor = '#C5A059',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-transform duration-300 hover:scale-105 rounded-xl overflow-hidden shadow-lg border border-stone-200"
    >
      <Stage width={width} height={height}>
        <Layer>
          <Rect x={0} y={0} width={width} height={height} fill="#FAF8F5" />
          <Rect
            x={12}
            y={12}
            width={width - 24}
            height={height - 24}
            stroke={frameColor}
            strokeWidth={3}
            cornerRadius={4}
          />
          <Group x={width / 2} y={height / 2 - 20}>
            <KonvaText
              text={surah}
              fontSize={22}
              fontFamily="Amiri, serif"
              fill="#2B2B2B"
              align="center"
              offsetX={70}
              offsetY={10}
            />
          </Group>
          <Rect x={0} y={height - 40} width={width} height={40} fill="#1A1A1A" />
          <KonvaText
            x={10}
            y={height - 28}
            text={title}
            fontSize={12}
            fontFamily="Outfit, sans-serif"
            fill="#D4AF37"
            width={width - 20}
            align="center"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaThumbnail;
