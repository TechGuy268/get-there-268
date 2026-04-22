"use client";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function AdminPricingPage() {
  const [baseFare, setBaseFare] = useState(3.00);
  const [perKm, setPerKm] = useState(1.50);
  const [perMin, setPerMin] = useState(0.25);
  const [surgeActive, setSurgeActive] = useState(false);
  const [surgeMultiplier, setSurgeMultiplier] = useState(1.5);
  const [saved, setSaved] = useState(false);

  const previewKm = 7.2;
  const previewMin = 14;
  const estimate = (baseFare + previewKm * perKm + previewMin * perMin) * (surgeActive ? surgeMultiplier : 1);
  const rounded = Math.round(estimate * 2) / 2;

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ocean-900">Pricing</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure fare rates for Antigua & Barbuda (XCD)</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 mb-6">
        <h2 className="font-bold text-ocean-900">Base Rates</h2>
        {[
          { label: "Base Fare (XCD)", value: baseFare, set: setBaseFare, step: 0.50 },
          { label: "Per Kilometre (XCD)", value: perKm, set: setPerKm, step: 0.25 },
          { label: "Per Minute (XCD)", value: perMin, set: setPerMin, step: 0.05 },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-sm font-medium text-ocean-800 mb-2">{field.label}</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={field.value}
                step={field.step}
                min={0}
                onChange={(e) => field.set(parseFloat(e.target.value) || 0)}
                className="w-32 h-10 border border-gray-200 rounded-xl px-3 text-sm font-medium text-ocean-900 focus:outline-none focus:ring-2 focus:ring-caribbean-300"
              />
              <input
                type="range"
                min={0}
                max={field.label.includes("Base") ? 10 : field.label.includes("Kilometre") ? 5 : 1}
                step={field.step}
                value={field.value}
                onChange={(e) => field.set(parseFloat(e.target.value))}
                className="flex-1 accent-caribbean-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Surge */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-ocean-900">Surge Pricing</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Activate during high demand periods</p>
          </div>
          <button
            onClick={() => setSurgeActive(!surgeActive)}
            className={`relative w-12 h-6 rounded-full transition-colors ${surgeActive ? "bg-caribbean-500" : "bg-gray-200"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${surgeActive ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </div>
        {surgeActive && (
          <div>
            <label className="block text-sm font-medium text-ocean-800 mb-2">Surge Multiplier: <span className="text-caribbean-600">{surgeMultiplier}×</span></label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={surgeMultiplier}
              onChange={(e) => setSurgeMultiplier(parseFloat(e.target.value))}
              className="w-full accent-caribbean-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1× (normal)</span>
              <span>3× (max)</span>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-caribbean-50 border border-caribbean-200 rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-ocean-900 mb-3">Live Fare Preview</h2>
        <p className="text-xs text-muted-foreground mb-4">Example: {previewKm}km ride, {previewMin} minutes</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-ocean-700"><span>Base fare</span><span>{formatCurrency(baseFare)}</span></div>
          <div className="flex justify-between text-ocean-700"><span>{previewKm}km × {formatCurrency(perKm)}</span><span>{formatCurrency(previewKm * perKm)}</span></div>
          <div className="flex justify-between text-ocean-700"><span>{previewMin}min × {formatCurrency(perMin)}</span><span>{formatCurrency(previewMin * perMin)}</span></div>
          {surgeActive && <div className="flex justify-between text-coral-600 font-medium"><span>Surge {surgeMultiplier}×</span><span>+{formatCurrency(estimate - (estimate / surgeMultiplier))}</span></div>}
          <div className="border-t border-caribbean-200 pt-2 flex justify-between font-bold text-ocean-900 text-base">
            <span>Estimated Fare</span>
            <span className="text-caribbean-600">{formatCurrency(rounded)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={save}
        className={`w-full h-12 rounded-xl font-bold transition-all ${saved ? "bg-reef-500 text-white" : "bg-ocean-900 hover:bg-ocean-800 text-white"}`}
      >
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
