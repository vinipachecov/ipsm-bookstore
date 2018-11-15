
import currency from 'currency.js';

export const BRL = value => 
  currency(value, { precision: 2, separator: '.', decimal: ',', symbol: 'R$ ', formatWithSymbol: true });