<h1 align="center">📈 Atomax - The Discord-TradingView-Alpaca Stock Trading Bot 💸</h1>

I created <b>Atomax</b> as a way to automatically trade stocks in response to <a href="https://www.tradingview.com/">TradingView<a/> notifications. Whenever a BUY/SELL notification is received from TradingView, this bot will place a BUY/SELL order using the <a href="https://alpaca.markets/docs/trading/">Alpaca Trading API</a>. 
  
For account configuration and order placement, I decided to use Discord as the front-end. By making use of the <a href="https://discord.com/developers/docs/intro">Discord API</a>, Atomax users are able to generate custom webhooks for each of their orders. After pasting this webhook into TradingView, any notifications received will call the webhook and trigger an order on the Alpaca API.

  <sup><i>I plan on extending this documentation further in the future!</i><sup>
