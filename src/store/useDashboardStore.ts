import { create } from 'zustand';

export type Period = '1D' | '1W' | '1M' | '1Y' | 'ALL';
export type Currency = 'USD' | 'PEN';
type DataPoint = { x: Date; y: number };

type DashboardState = {
  userName: string;
  currency: Currency;
  balance: number;
  period: Period;
  data: Record<Period, DataPoint[]>;
  setCurrency: (c: Currency) => void;
  setPeriod: (p: Period) => void;
  initSession: () => void;
};

const NAMES = ['Rodrigo', 'Gabriel', 'Luis'];
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const genSeries = (): Record<Period, DataPoint[]> => {
  const now = new Date();
  const build = (n: number, stepDays: number) =>
    Array.from({ length: n }).map((_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (n - 1 - i) * stepDays);
      return { x: d, y: Math.round(rand(120, 980)) };
    });
  return { '1D': build(12, 0), '1W': build(7, 1), '1M': build(30, 1), '1Y': build(12, 30), 'ALL': build(24, 30) };
};

export const useDashboardStore = create<DashboardState>((set) => ({
  userName: '',
  currency: 'USD',
  balance: 0,
  period: '1M',
  data: genSeries(),
  setCurrency: (c) => set({ currency: c }),
  setPeriod: (p) => set({ period: p }),
  initSession: () => {
    const userName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const balance = Math.round(rand(15000, 50000));
    set({ userName, balance, data: genSeries() });
  },
}));
