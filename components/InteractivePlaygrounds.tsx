"use client";

import { useState } from "react";
import {
  Printer,
  Plane,
  Bot,
  Zap,
  CheckCircle2,
  RefreshCw,
  ShoppingBag,
  CreditCard,
  Barcode,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Clock,
  ShieldCheck,
  Send,
  Terminal,
  Activity,
} from "lucide-react";
import {
  playClickSound,
  playPrinterMotorSound,
  playSuccessChimeSound,
  playTabSwitchSound,
  playNodeSelectSound,
} from "@/lib/soundFX";

// Audio trigger wrapper using unified robust Web Audio synthesizer
const playAudioFeedback = (type: "click" | "print" | "success" | "switch" | "node", soundEnabled: boolean) => {
  if (!soundEnabled) return;
  if (type === "click") playClickSound();
  else if (type === "print") playPrinterMotorSound();
  else if (type === "success") playSuccessChimeSound();
  else if (type === "switch") playTabSwitchSound();
  else if (type === "node") playNodeSelectSound();
};

type PlaygroundTab = "pos" | "gds" | "agent";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  sku: string;
}

const POS_CATALOG = [
  { id: "itm-1", name: "Artisan Double Espresso", price: 3.5, sku: "BEV-001" },
  { id: "itm-2", name: "Avocado & Chicken Panini", price: 8.5, sku: "FOOD-104" },
  { id: "itm-3", name: "Thermal Receipt Roll 80mm", price: 1.25, sku: "SUP-088" },
  { id: "itm-4", name: "Enterprise POS Cloud License", price: 49.0, sku: "SOFT-99" },
  { id: "itm-5", name: "GDS Flight Baggage Surcharge", price: 25.0, sku: "AIR-302" },
];

export default function InteractivePlaygrounds() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>("pos");
  const [soundEnabled, setSoundEnabled] = useState(false);

  // POS State
  const [cart, setCart] = useState<CartItem[]>([
    { id: "itm-1", name: "Artisan Double Espresso", price: 3.5, qty: 2, sku: "BEV-001" },
    { id: "itm-2", name: "Avocado & Chicken Panini", price: 8.5, qty: 1, sku: "FOOD-104" },
  ]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState(true);
  const [receiptNumber, setReceiptNumber] = useState("RC-84920");

  // GDS State
  const [routeFrom, setRouteFrom] = useState("LHE");
  const [routeTo, setRouteTo] = useState("DXB");
  const [currency, setCurrency] = useState<"USD" | "EUR" | "PKR">("USD");
  const [isQueryingGDS, setIsQueryingGDS] = useState(false);
  const [gdsLatency, setGdsLatency] = useState(34);
  const [gdsResult, setGdsResult] = useState<any>({
    flight: "EK-623 Boeing 777-300ER",
    baseFare: 420,
    agencyMarkup: 45,
    total: 465,
    pnr: "AMD-794LHE",
    status: "CONFIRMED & TICKETED",
  });

  // AI Agent State
  const [agentScenario, setAgentScenario] = useState<"inventory" | "com_port" | "pricing">("inventory");
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentSteps, setAgentSteps] = useState<string[]>([
    "Initialized reasoning loop with tool definitions...",
    "Querying local SQLite WAL ledger for negative delta records...",
    "Dispatched automatic supplier PO restock order via Webhook.",
  ]);

  // Handle POS Item Add
  const addToCart = (product: typeof POS_CATALOG[0]) => {
    playAudioFeedback("click", soundEnabled);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    playAudioFeedback("click", soundEnabled);
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const calculateSubtotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const printThermalReceipt = () => {
    if (cart.length === 0) return;
    setIsPrinting(true);
    playAudioFeedback("print", soundEnabled);
    setTimeout(() => {
      setIsPrinting(false);
      setReceiptGenerated(true);
      setReceiptNumber(`RC-${Math.floor(10000 + Math.random() * 90000)}`);
      playAudioFeedback("success", soundEnabled);
    }, 700);
  };

  // Handle GDS Query
  const runGDSQuery = () => {
    setIsQueryingGDS(true);
    playAudioFeedback("click", soundEnabled);
    setTimeout(() => {
      const latency = Math.floor(28 + Math.random() * 25);
      setGdsLatency(latency);
      const baseUSD = routeFrom === "FRA" ? 640 : 420;
      const markup = Math.round(baseUSD * 0.08);
      const multiplier = currency === "EUR" ? 0.92 : currency === "PKR" ? 280 : 1;

      setGdsResult({
        flight: routeFrom === "FRA" ? "LH-400 Airbus A350-900" : "EK-623 Boeing 777-300ER",
        baseFare: Math.round(baseUSD * multiplier),
        agencyMarkup: Math.round(markup * multiplier),
        total: Math.round((baseUSD + markup) * multiplier),
        pnr: `AMD-${Math.floor(100 + Math.random() * 900)}${routeFrom}`,
        status: "CONFIRMED & TICKETED",
      });
      setIsQueryingGDS(false);
      playAudioFeedback("success", soundEnabled);
    }, 600);
  };

  // Handle Agent Run
  const runAgentWorkflow = (scenario: "inventory" | "com_port" | "pricing") => {
    setAgentScenario(scenario);
    setAgentRunning(true);
    playAudioFeedback("click", soundEnabled);
    setAgentSteps(["[Agent Loop] Parsing instruction schema & telemetry state..."]);

    const stepsMap = {
      inventory: [
        "[Tool: sqlite_query] SELECT sku, stock_qty FROM ledgers WHERE stock_qty < threshold;",
        "[Execution] Identified 2 SKUs below safety stock: BEV-001 (0 units), SUP-088 (3 units).",
        "[Tool: supplier_restock_dispatch] Transmitting automated JSON purchase order payload...",
        "[Status 200 OK] Supplier replenishment batch #8930 acknowledged & queued.",
      ],
      com_port: [
        "[Tool: serial_port_scan] Scanning COM1..COM8 for 19200 baud ESC/POS signature...",
        "[Detection] Found thermal printer on COM3. Handshake response: 0x06 (ACK).",
        "[Execution] Paper sensor: READY. Cash drawer pulse pin test: SUCCESS.",
        "[Telemetry] Driver pipeline synchronized with zero packet loss.",
      ],
      pricing: [
        "[Tool: amadeus_fare_rules] Fetching seasonal yield multipliers for Umrah routes...",
        "[Logic] Peak demand factor calculated: +14.2% based on booking velocity.",
        "[Tool: dynamic_price_sync] Updating Next.js edge cache matrix with new gross fares.",
        "[Complete] 1,420 flight combinations repriced in 18ms.",
      ],
    };

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < stepsMap[scenario].length) {
        setAgentSteps((prev) => [...prev, stepsMap[scenario][current]]);
      } else {
        clearInterval(interval);
        setAgentRunning(false);
        playAudioFeedback("success", soundEnabled);
      }
    }, 450);
  };

  return (
    <section id="playgrounds" className="relative z-10 border-t border-zinc-200 dark:border-white/10 bg-slate-50 dark:bg-black py-28 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Section Header with Sound Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-3.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-phosphor inline-block" />
              <span>production-labs --hands-on --interactive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Live Software Playgrounds
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Interact directly with Mohammad Asim&apos;s real-world software engines — test offline POS receipt printing, live GDS flight pricing, and autonomous agent tool loops.
            </p>

            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playAudioFeedback("click", true);
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0 shadow-2xs"
              title="Toggle mechanical sound effects"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono text-[11px]">Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-[11px] text-slate-500">Audio Muted</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <button
            type="button"
            onClick={() => {
              setActiveTab("pos");
              playAudioFeedback("switch", soundEnabled);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "pos"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white text-slate-700 dark:bg-white/5 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-xs"
            }`}
          >
            <Printer className="w-4 h-4 text-emerald-500" />
            <span>1. OmniPOS Hardware &amp; Thermal Receipt</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("gds");
              playAudioFeedback("switch", soundEnabled);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "gds"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white text-slate-700 dark:bg-white/5 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-xs"
            }`}
          >
            <Plane className="w-4 h-4 text-sky-500" />
            <span>2. Amadeus GDS Aviation Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("agent");
              playAudioFeedback("switch", soundEnabled);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "agent"
                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white text-slate-700 dark:bg-white/5 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-xs"
            }`}
          >
            <Bot className="w-4 h-4 text-purple-500" />
            <span>3. Autonomous AI Agent Dispatcher</span>
          </button>
        </div>

        {/* -------------------- PLAYGROUND 1: OMNIPOS REGISTER -------------------- */}
        {activeTab === "pos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: POS Counter & Item Catalog (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0c0c0e] p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                      OmniPOS Touch Register (Offline WAL Mode)
                    </span>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                    &lt;1ms SQLite Response
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 mb-2">
                  Touch Catalog Items to Add:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {POS_CATALOG.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => addToCart(prod)}
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] hover:border-emerald-500/50 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all flex items-center justify-between text-left cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {prod.name}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
                          SKU: {prod.sku}
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-800 dark:text-zinc-200">
                        ${prod.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Current Active Cart Summary */}
                <div className="border-t border-slate-100 dark:border-white/10 pt-4">
                  <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-zinc-400 mb-3">
                    <span>Active Ticket Items</span>
                    <span>{cart.reduce((s, i) => s + i.qty, 0)} Units</span>
                  </div>

                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1 mb-4">
                    {cart.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center font-mono">
                        Ticket is empty. Tap any catalog item above to start.
                      </p>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                              {item.qty}x
                            </span>
                            <span className="text-slate-800 dark:text-zinc-200 truncate max-w-[200px]">
                              {item.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-slate-900 dark:text-white font-semibold">
                              ${(item.price * item.qty).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[10px] hover:bg-red-100 cursor-pointer"
                              title="Decrease quantity"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Register Bottom Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-white/10">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">
                        Ticket Total (incl. tax):
                      </span>
                      <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                        ${calculateSubtotal().toFixed(2)}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={cart.length === 0 || isPrinting}
                      onClick={printThermalReceipt}
                      className="btn btn-solid h-11 px-6 text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                    >
                      <Printer className="w-4 h-4 text-emerald-400" />
                      <span>{isPrinting ? "Printing ESC/POS Stream..." : "Print 80mm Receipt"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Realistic 80mm Thermal Receipt Simulation (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm">
                <div className="text-center font-mono text-xs text-slate-500 dark:text-zinc-400 mb-2 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Hardware Spooler: ESC/POS Thermal 80mm</span>
                </div>

                {/* Thermal Receipt Paper Visual */}
                <div className="relative rounded-t-lg bg-white text-slate-900 p-6 sm:p-7 shadow-2xl font-mono text-xs border border-slate-200 transform transition-all duration-500">
                  {/* Serrated zigzag cut top effect */}
                  <div className="absolute -top-2 left-0 right-0 h-2 bg-[radial-gradient(circle,transparent_4px,#ffffff_5px)] bg-[length:10px_10px] repeat-x" />

                  {/* Store Header */}
                  <div className="text-center pb-4 border-b border-dashed border-slate-300">
                    <div className="text-base font-bold tracking-tight text-slate-900">
                      OMNIPOS TERMINAL 01
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Mohammad Asim Systems Architecture
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Sargodha &bull; Pakistan (UTC+5)
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-700 mt-1">
                      ** TRANSACTION COMPLETED **
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="py-2.5 border-b border-dashed border-slate-300 text-[11px] space-y-0.5 text-slate-600">
                    <div className="flex justify-between">
                      <span>RECEIPT: {receiptNumber}</span>
                      <span>WAL: OFFLINE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TIME: {new Date().toLocaleTimeString()}</span>
                      <span>BAUD: 19200</span>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="py-3 border-b border-dashed border-slate-300 space-y-1.5 text-[11px]">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <span className="truncate pr-2 max-w-[180px]">
                          {item.name} x{item.qty}
                        </span>
                        <span className="font-semibold shrink-0">
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="pt-3 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>SUBTOTAL:</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>SALES TAX (0%):</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-1 border-t border-dashed border-slate-300">
                      <span>TOTAL DUE:</span>
                      <span className="text-base font-extrabold">
                        ${calculateSubtotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Barcode Mockup */}
                  <div className="mt-5 pt-4 border-t border-dashed border-slate-300 flex flex-col items-center">
                    <div className="h-10 w-48 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px,#000_4px,#000_7px,transparent_7px,transparent_9px)]" />
                    <span className="text-[9px] tracking-widest text-slate-600 mt-1 font-mono">
                      * 9 2 3 0 6 0 1 1 2 6 0 6 *
                    </span>
                    <p className="text-[10px] text-slate-500 text-center mt-2">
                      Engineered for high-throughput retail &amp; zero-latency cashier counters.
                    </p>
                  </div>

                  {/* Zigzag bottom paper tear */}
                  <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[radial-gradient(circle,#ffffff_4px,transparent_5px)] bg-[length:10px_10px] repeat-x" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- PLAYGROUND 2: AMADEUS GDS FLIGHT MATRIX -------------------- */}
        {activeTab === "gds" && (
          <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0c0c0e] p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Amadeus GDS Global Airline Inventory Simulator
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Direct SOAP/REST query emulator for live seat allocations, agency markup logic, and PNR booking issuance.
                </p>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-xs">
                {(["USD", "EUR", "PKR"] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      playAudioFeedback("click", soundEnabled);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                      currency === curr
                        ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-xs"
                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Search Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 font-mono text-xs">
              <div>
                <label className="block text-slate-500 dark:text-zinc-400 text-[10px] uppercase mb-1">
                  Origin Airport
                </label>
                <select
                  value={routeFrom}
                  onChange={(e) => {
                    setRouteFrom(e.target.value);
                    playAudioFeedback("node", soundEnabled);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-sky-500"
                >
                  <option value="LHE">LHE (Lahore, Pakistan)</option>
                  <option value="ISB">ISB (Islamabad, Pakistan)</option>
                  <option value="FRA">FRA (Frankfurt, Germany)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-zinc-400 text-[10px] uppercase mb-1">
                  Destination Airport
                </label>
                <select
                  value={routeTo}
                  onChange={(e) => {
                    setRouteTo(e.target.value);
                    playAudioFeedback("node", soundEnabled);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-sky-500"
                >
                  <option value="DXB">DXB (Dubai, UAE)</option>
                  <option value="JED">JED (Jeddah / Umrah)</option>
                  <option value="LHR">LHR (London Heathrow)</option>
                  <option value="JFK">JFK (New York JFK)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-zinc-400 text-[10px] uppercase mb-1">
                  Telemetry Response
                </label>
                <div className="h-9 px-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between text-slate-800 dark:text-zinc-200">
                  <span>API Ping:</span>
                  <span className="text-emerald-600 dark:text-phosphor font-bold font-mono">
                    {gdsLatency}ms
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  disabled={isQueryingGDS}
                  onClick={runGDSQuery}
                  className="w-full btn btn-solid h-9 px-4 text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>{isQueryingGDS ? "Handshaking GDS..." : "Dispatch Query"}</span>
                </button>
              </div>
            </div>

            {/* Live GDS Reservation Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4 mb-4 font-mono">
                <div>
                  <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">
                    <span>Direct PNR Generated: {gdsResult.pnr}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {routeFrom} &rarr; {routeTo} &bull; {gdsResult.flight}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase">
                    Agency Gross Total:
                  </span>
                  <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : "Rs "}{gdsResult.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 block">Amadeus Base Net:</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : "Rs "}{gdsResult.baseFare.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 block">Agency Markup Yield:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    +{currency === "USD" ? "$" : currency === "EUR" ? "€" : "Rs "}{gdsResult.agencyMarkup.toLocaleString()} (Guaranteed Margin)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 block">Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {gdsResult.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- PLAYGROUND 3: AUTONOMOUS AI AGENT WORKFLOW -------------------- */}
        {activeTab === "agent" && (
          <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0c0c0e] p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Autonomous AI Agent Dispatch Sandbox
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Test autonomous agent tool calling loops executing database actions, hardware triage, and dynamic yield pricing.
                </p>
              </div>

              <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
                Agentic Function Calling V2
              </span>
            </div>

            {/* Workflow Preset Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
              {[
                {
                  id: "inventory",
                  title: "1. Audit POS Inventory Discrepancy",
                  desc: "Analyzes SQLite WAL ledger & auto-dispatches restocking PO.",
                },
                {
                  id: "com_port",
                  title: "2. Triage Serial COM Printer Failure",
                  desc: "Scans baud rates, acknowledges ACK bytes, and resets buffer.",
                },
                {
                  id: "pricing",
                  title: "3. Recalculate Seasonal Umrah Markup",
                  desc: "Updates dynamic fare matrix across 1,400+ airline flights.",
                },
              ].map((scen) => (
                <button
                  key={scen.id}
                  type="button"
                  onClick={() => runAgentWorkflow(scen.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer group ${
                    agentScenario === scen.id
                      ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 shadow-xs"
                      : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{scen.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 font-sans">
                    {scen.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Agent Live Streaming Console */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Agent Execution Trace (Streaming Tokens)</span>
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {agentRunning ? "EXECUTING REASONING LOOP..." : "COMPLETED"}
                </span>
              </div>

              <div className="space-y-1.5 py-1 min-h-[110px]">
                {agentSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold select-none">&gt;&gt;</span>
                    <span className={step.includes("200 OK") || step.includes("SUCCESS") || step.includes("Complete") ? "text-emerald-400 font-semibold" : "text-slate-300"}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
