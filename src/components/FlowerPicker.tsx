import React from 'react';

const BASE = import.meta.env.BASE_URL;

export const FLOWERS = [
  { id: 'rose', name: 'Red Rose', src: `${BASE}/assets/red_rose.png`, price: 0 },
  { id: 'tulip', name: 'Pink Tulip', src: `${BASE}/assets/pink_tulip.png`, price: 0 },
  { id: 'lily', name: 'White Lily', src: `${BASE}/assets/white_lily.png`, price: 0 },
  { id: 'sunflower', name: 'Sunflower', src: `${BASE}/assets/sunflower.png`, price: 0 },
  { id: 'fern', name: 'Fern', src: `${BASE}/assets/fern.png`, price: 0 },
  { id: 'heliopsis', name: 'Heliopsis', src: `${BASE}/assets/heliopsis.png`, price: 0 },
  { id: 'vibrant_flower', name: 'Vibrant Flower', src: `${BASE}/assets/vibrant_flower.png`, price: 0 },
];

interface FlowerPickerProps {
  onSelectFlower: (flowerId: string) => void;
}

export const FlowerPicker: React.FC<FlowerPickerProps> = ({ onSelectFlower }) => {
  return (
    <div className="flower-picker">
      <h3 className="picker-title">Pick a Flower</h3>
      <div className="flower-list">
        {FLOWERS.map((flower) => (
          <div 
            key={flower.id} 
            className="flower-item"
            onClick={() => onSelectFlower(flower.id)}
            role="button"
            tabIndex={0}
          >
            <div className="img-wrapper">
              <img src={flower.src} alt={flower.name} loading="lazy" />
            </div>
            <span className="flower-name">{flower.name}</span>
          </div>
        ))}
      </div>
      <style>{`
        .flower-picker {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 300px; /* Sidebar width */
        }
        .picker-title {
          text-align: center;
          margin-bottom: 20px;
          color: var(--color-deep-green);
          font-weight: 600;
        }
        .flower-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .flower-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s ease;
          padding: 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.5);
        }
        .flower-item:hover {
          transform: translateY(-5px);
          background: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .img-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .img-wrapper img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .flower-name {
          font-size: 0.9rem;
          color: var(--color-text);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .flower-picker {
            max-width: 100%;
            padding: 10px 15px;
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .picker-title {
            margin: 0;
            white-space: nowrap;
            font-size: 1rem;
            margin-right: 10px;
          }

          .flower-list {
            display: flex;
            grid-template-columns: none;
            overflow-x: auto;
            gap: 10px;
            padding-bottom: 5px; /* Space for scrollbar */
            width: 100%;
            -webkit-overflow-scrolling: touch;
          }

          .flower-item {
            flex: 0 0 auto;
            min-width: 70px;
            padding: 5px;
          }

          .img-wrapper {
            width: 50px;
            height: 50px;
            margin-bottom: 4px;
          }

          .flower-name {
            font-size: 0.75rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
