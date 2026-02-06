import React, { useEffect, useState } from 'react';

interface RevealCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RevealCard: React.FC<RevealCardProps> = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 100);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`reveal-overlay ${visible ? 'visible' : ''}`}>
      <div className="card">
        <div className="card-content">
          <h1>Happy Rose Day!</h1>
          <p>
            Just like this bouquet, you bring color and beauty into my life.
            <br /><br />
            No matter which flowers you picked, you are the most beautiful one of all.
          </p>
          <div className="heart">❤️</div>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        .reveal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 2000;
        }
        .reveal-overlay.visible {
          opacity: 1;
        }
        .card {
          background: #fff;
          padding: 40px;
          border-radius: 20px;
          max-width: 90%;
          width: 400px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          transform: translateY(50px) scale(0.9);
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.27);
          border: 2px solid var(--color-gold);
          background-image: linear-gradient(to bottom right, #fff, var(--color-blush));
        }
        .reveal-overlay.visible .card {
          transform: translateY(0) scale(1);
        }
        .card h1 {
          color: var(--color-rose);
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .card p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: 30px;
        }
        .heart {
          font-size: 3rem;
          margin-bottom: 20px;
          animation: beat 1s infinite alternate;
        }
        @keyframes beat {
          to { transform: scale(1.1); }
        }
        .close-btn {
          background: var(--color-rose);
          color: white;
          border: none;
          padding: 10px 30px;
          font-size: 1rem;
          border-radius: 50px;
          transition: background 0.3s;
        }
        .close-btn:hover {
          background: #b01c36;
        }
      `}</style>
    </div>
  );
};
