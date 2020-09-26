
export function fetchGainers(){
  const data = fetch("https://api.iextrading.com/1.0/stock/market/list/gainers")
    .then(gainers => gainers.json())
    return data;
}

export function fetchCompany(symbol){
  const company = fetch(`https://api.iextrading.com/1.0/stock${symbol}/company`)
  .then(company => company.json())

  return company;

}

export function fetchChart(symbol){
  const chart = fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart`)
    .then(chart => chart.json())

    return chart;
}

export function fetchSymbol(){
    const symbol = fetch(`https://api.iextrading.com/1.0/ref-data/symbols`)
      .then(chart => chart.json())
  
      return symbol;
  }

export function fetchPrice(symbol){
    const price = fetch(`https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&=`)
    .then(chart => chart.json())

    return price;
}
