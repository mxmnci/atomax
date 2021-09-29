export default interface WebhookData {
  discordId: string;
  action?: string;
  qty?: number;
  notional?: number;
  symbol?: string;
  activeStocks?: string[];
  stoploss?: number;
}
