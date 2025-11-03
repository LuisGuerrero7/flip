export const currencySymbol = (c: 'USD' | 'PEN') => (c === 'USD' ? '$' : 'S/');
export const formatMoney = (n: number, c: 'USD' | 'PEN') =>
  `${currencySymbol(c)}${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
export const formatTooltipMoney = (n: number, c: 'USD' | 'PEN') =>
  `${currencySymbol(c)}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const formatTooltipDate = (d: Date) =>
  d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
