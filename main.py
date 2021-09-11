
from matplotlib.pyplot import tight_layout
from numpy import NaN
import pandas as pd
import ccxt
import mplfinance as mpf

exchange = ccxt.binanceus()
bars = exchange.fetch_ohlcv('ETH/USDT', timeframe='30m', limit=1440)
pd.set_option('display.max_rows', None)
pd.set_option('chained_assignment', None)


def tr(df):
    """True Range = max(HIGH - LOW, ABS(HIGH - CLOSE_PREV), ABS(LOW - CLOSE_PREV))"""
    copy_df = df.copy()
    copy_df['previous_close'] = copy_df['Close'].shift(1)
    copy_df['high-low'] = copy_df['High'] - copy_df['Low']
    copy_df['high-pc'] = abs(copy_df['High'] - copy_df['previous_close'])
    copy_df['low-pc'] = abs(copy_df['Low'] - copy_df['previous_close'])
    copy_df['true_range'] = copy_df[[
        'high-low', 'high-pc', 'low-pc']].max(axis=1)
    return copy_df['true_range']


def atr(df, period=7):
    """Average True Range = (True Range(t) + True Range(t-1) + ... + True Range(t-n)) / n"""
    copy_df = df.copy()
    copy_df['true_range'] = tr(copy_df)
    copy_df['atr'] = copy_df['true_range'].rolling(period).mean()
    return copy_df['atr']


def removeNonTrendingLines(df):
    """Remove lines that are not in a trend"""
    copy_df = df.copy()

    for current in range(1, len(df.index)):
        if copy_df['in_uptrend'][current]:
            copy_df["lowerband"][current] = NaN
        else:
            copy_df["upperband"][current] = NaN

    return copy_df


def supertrend(df, period=7, atr_multiplier=3):
    """SuperTrend = (Current Close  +  Multiplier *  Prior ATR)"""
    copy_df = df.copy()
    hl2 = (copy_df['High'] + copy_df['Low']) / 2
    copy_df['atr'] = atr(copy_df, period)

    copy_df['upperboundryband'] = hl2 + atr_multiplier * copy_df['atr']
    copy_df['lowerboundryband'] = hl2 - atr_multiplier * copy_df['atr']
    copy_df['upperband'] = copy_df['upperboundryband']
    copy_df['lowerband'] = copy_df['lowerboundryband']
    copy_df['in_uptrend'] = True

    for current in range(1, len(df.index)):
        previous = current - 1

        if copy_df['Close'][current] > copy_df['upperband'][previous]:
            copy_df['in_uptrend'][current] = True
        elif copy_df['Close'][current] < copy_df['lowerband'][previous]:
            copy_df['in_uptrend'][current] = False
        else:
            copy_df['in_uptrend'][current] = copy_df['in_uptrend'][previous]

            if copy_df['in_uptrend'][current] and copy_df['lowerband'][current] < copy_df['lowerband'][previous]:
                copy_df['lowerband'][current] = copy_df['lowerband'][previous]

            if not copy_df['in_uptrend'][current] and copy_df['upperband'][current] > copy_df['upperband'][previous]:
                copy_df['upperband'][current] = copy_df['upperband'][previous]

    return removeNonTrendingLines(copy_df)


df = pd.DataFrame(bars, columns=['Date',
                                 'Open', 'High', 'Low', 'Close', 'Volume'])
df['Date'] = pd.to_datetime(df['Date'], unit='ms')
df.set_index('Date', inplace=True)

supertrendDf = supertrend(df)

addplot0 = [
    mpf.make_addplot(supertrendDf['upperband'], color='g'),
    mpf.make_addplot(supertrendDf['lowerband'], color='r'),
    # mpf.make_addplot(supertrendDf['upperboundryband'], color='purple'),
    # mpf.make_addplot(supertrendDf['lowerboundryband'], color='purple')
]

print(supertrendDf)

mpf.plot(supertrendDf, type='candle', volume=False, datetime_format='%b %d',
         addplot=addplot0)
