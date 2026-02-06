import React from 'react';

export interface PlacedFlower {
  id: string; // unique instance id
  typeId: string; // 'rose', 'tulip', etc.
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
}

interface CanvasProps {
  flowers: PlacedFlower[];
  onRemoveFlower: (id: string) => void;
  onMoveFlower: (id: string, x: number, y: number) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ flowers, onRemoveFlower, onMoveFlower }) => {
  const [draggingId, setDraggingId] = React.useState<string | null>(null);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent potentially triggering other clicks
    setDraggingId(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId) return;
    
    // Calculate new position as percentage
    // e.currentTarget is the canvas container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    onMoveFlower(draggingId, x, y);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleMouseLeave = () => {
    setDraggingId(null);
  };

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    e.stopPropagation();
    setDraggingId(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingId) return;
    // Prevent scrolling while dragging
    e.preventDefault(); 
    
    // Get touch coordinates (use first touch point)
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    onMoveFlower(draggingId, x, y);
  };

  const handleTouchEnd = () => {
    setDraggingId(null);
  };

  return (
    <div 
      className="bouquet-canvas"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="stems-container">
        {/* Placeholder for stems if we want them to bunch up at the bottom */}
      </div>
      
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="placed-flower"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            transform: `translate(-50%, -50%) rotate(${flower.rotation}deg) scale(${flower.scale})`,
            zIndex: flower.zIndex,
            cursor: draggingId === flower.id ? 'grabbing' : 'grab',
            touchAction: 'none', // Critical for preventing browser scroll interference
          }}
          onMouseDown={(e) => handleMouseDown(e, flower.id)}
          onTouchStart={(e) => handleTouchStart(e, flower.id)}
          onDoubleClick={() => onRemoveFlower(flower.id)}
          title="Drag to move, Double click to remove"
        >
          <img src={flower.src} alt="flower" draggable={false} />
        </div>
      ))}
      
      {flowers.length === 0 && (
        <div className="empty-state">
          <p>Pick flowers to build your bouquet...</p>
        </div>
      )}

      <style>{`
        .bouquet-canvas {
          flex: 1;
          position: relative;
          height: 100%;
          overflow: hidden;
          /* A subtle vignette or spotlight effect could go here */
        }
        .placed-flower {
          position: absolute;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.27);
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
          user-select: none;
        }
        .placed-flower:hover {
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.3));
          z-index: 1000 !important; /* Bring to front on hover */
        }
        .placed-flower img {
          display: block;
          max-width: 200px; /* Base size, scaled by style */
          pointer-events: none;
        }
        .empty-state {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--color-deep-green);
          font-style: italic;
          font-size: 1.2rem;
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
