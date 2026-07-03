'use client';

interface QuantityStepper {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  max?: number;
}

export default function QuantityStepper({
  quantity,
  onQuantityChange,
  max = 10,
}: QuantityStepper) {
  return (
    <div className="flex items-center gap-4">
      <label className="micro-label">QUANTITY</label>
      <div className="flex items-center border border-luxury-white/40">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="px-4 py-2 hover:bg-luxury-white/10 transition-colors"
        >
          −
        </button>
        <span className="px-6 py-2 text-center min-w-12">{quantity}</span>
        <button
          onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
          className="px-4 py-2 hover:bg-luxury-white/10 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
