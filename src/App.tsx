import { useState } from 'react';
import { FlowerPicker, FLOWERS } from './components/FlowerPicker';
import { Canvas, type PlacedFlower } from './components/Canvas';
import { RevealCard } from './components/RevealCard';
import './index.css';

function App() {
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelectFlower = (flowerId: string) => {
    const flowerType = FLOWERS.find(f => f.id === flowerId);
    if (!flowerType) return;

    const newFlower: PlacedFlower = {
      id: Date.now().toString() + Math.random().toString(),
      typeId: flowerId,
      src: flowerType.src,
      // Place near center with some randomness
      x: 50 + (Math.random() * 20 - 10),
      y: 50 + (Math.random() * 20 - 10),
      rotation: Math.random() * 60 - 30,
      scale: 0.8 + Math.random() * 0.4,
      zIndex: placedFlowers.length + 1,
    };

    setPlacedFlowers([...placedFlowers, newFlower]);
  };

  const handleRemoveFlower = (id: string) => {
    setPlacedFlowers(placedFlowers.filter(f => f.id !== id));
  };

  const handleMoveFlower = (id: string, x: number, y: number) => {
    setPlacedFlowers(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, x, y };
      }
      return f;
    }));
  };

  return (
    <div className="app-container">
      <div className="ui-layer">
        <div className="glass-panel sidebar">
          <FlowerPicker onSelectFlower={handleSelectFlower} />
        </div>
        
        {placedFlowers.length > 0 && (
          <div className="finish-container">
            <button 
              className="finish-btn" 
              onClick={() => setIsRevealed(true)}
            >
              Finish Bouquet ❤️
            </button>
          </div>
        )}
      </div>

      <Canvas 
        flowers={placedFlowers} 
        onRemoveFlower={handleRemoveFlower} 
        onMoveFlower={handleMoveFlower}
      />
      
      <RevealCard 
        isOpen={isRevealed} 
        onClose={() => setIsRevealed(false)} 
      />

      <style>{`
        .app-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        .ui-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none; /* Let clicks pass through to canvas where needed */
          z-index: 10;
          display: flex;
          justify-content: space-between;
          padding: 20px;
        }

        .sidebar {
          pointer-events: auto;
          align-self: flex-start;
          backdrop-filter: blur(8px);
        }

        .finish-container {
          position: absolute;
          bottom: 40px;
          right: 40px;
          pointer-events: auto;
        }

        .finish-btn {
          background: var(--color-rose);
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 1.2rem;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(214, 36, 68, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: var(--font-serif);
        }

        .finish-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(214, 36, 68, 0.6);
        }

        .glass-panel {
          /* Glassmorphism utility handled in component css mostly, 
             but sidebar positioning is here */
        }
      `}</style>
    </div>
  );
}

export default App;
