from celery import shared_task
from portfolio.models import SnP500Price
import yfinance as yf
from datetime import date, timedelta

def daterange(start_date: date, end_date: date):
    days = int((end_date - start_date).days)
    for n in range(days):
        yield start_date + timedelta(n)

@shared_task
def SnP500PriceUpdate():
    yfinance = yf.Ticker('SPY')
    start_date = date(2019, 1, 1)
    end_date = date(2025, 12, 31)
    data = yfinance.history(start=start_date.strftime("%Y-%m-%d"), end=end_date.strftime("%Y-%m-%d"))
    queryset = SnP500Price.objects.all()

    for single_date in daterange(start_date, end_date):
        if not queryset.filter(date=single_date).exists():
            try:
                SnP500Price.objects.create(date=single_date, price=data['Close'][single_date.strftime("%Y-%m-%d")])
            except:
                print(single_date.strftime("%Y-%m-%d") + " has no value")
        else:
            print("Date already exists")