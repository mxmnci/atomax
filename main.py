
import pandas as pd
import ccxt

exchange = ccxt.binanceus()
bars = exchange.fetch_ohlcv('ETH/USDT', timeframe="1d", limit=365)
pd.set_option('display.max_rows', None)
pd.set_option('chained_assignment', None)


def tr(df):
    """True Range = max(HIGH - LOW, ABS(HIGH - CLOSE_PREV), ABS(LOW - CLOSE_PREV))"""
    copy_df = df.copy()
    copy_df['previous_close'] = copy_df['close'].shift(1)
    copy_df['high-low'] = copy_df['high'] - copy_df['low']
    copy_df['high-pc'] = abs(copy_df['high'] - copy_df['previous_close'])
    copy_df['low-pc'] = abs(copy_df['low'] - copy_df['previous_close'])
    copy_df['true_range'] = copy_df[[
        'high-low', 'high-pc', 'low-pc']].max(axis=1)
    return copy_df['true_range']


def atr(df, period=7):
    """Average True Range = (True Range(t) + True Range(t-1) + ... + True Range(t-n)) / n"""
    copy_df = df.copy()
    copy_df['true_range'] = tr(copy_df)
    copy_df['atr'] = copy_df['true_range'].rolling(period).mean()
    return copy_df['atr']


def supertrend(df, period=7, atr_multiplier=3):
    """SuperTrend = (Current Close  +  Multiplier *  Prior ATR)"""
    copy_df = df.copy()
    hl2 = (copy_df['high'] + copy_df['low']) / 2
    copy_df['atr'] = atr(copy_df, period)
    copy_df['upperband'] = hl2 + atr_multiplier * copy_df['atr']
    copy_df['lowerband'] = hl2 - atr_multiplier * copy_df['atr']
    copy_df["in_uptrend"] = True

    for current in range(1, len(df.index)):
        previous = current - 1

        if copy_df["close"][current] > copy_df["upperband"][previous]:
            copy_df["in_uptrend"][current] = True
        elif copy_df["close"][current] < copy_df["lowerband"][previous]:
            copy_df["in_uptrend"][current] = False
        else:
            copy_df["in_uptrend"][current] = copy_df["in_uptrend"][previous]

            if copy_df["in_uptrend"][current] and copy_df["lowerband"][current] < copy_df["lowerband"][previous]:
                copy_df["lowerband"][current] = copy_df["lowerband"][previous]

            if not copy_df["in_uptrend"][current] and copy_df["upperband"][current] > copy_df["upperband"][previous]:
                copy_df["upperband"][current] = copy_df["upperband"][previous]

    return copy_df


df = pd.DataFrame(bars, columns=['timestamp',
                                 'open', 'high', 'low', 'close', 'volume'])
df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
df['atr'] = atr(df)

print(supertrend(df))
