const invoices =
  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  };

const plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
};


const calculatePerformanceTotal = (play, perf) => {
  let performanceTotal = 0;
  switch (play.type) {
    case "tragedy":
      performanceTotal = 40000;
      if (perf.audience > 30) {
        performanceTotal += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      performanceTotal = 30000;
      if (perf.audience > 20) {
        performanceTotal += 10000 + 500 * (perf.audience - 20);
      }
      performanceTotal += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return performanceTotal;
};


const functionName1 = (perf, format, play) => {
  const volumeCredits = functionName2(perf, play);
  return volumeCredits;
}

const functionName2 = (perf, play) => {
// add volume credits
  let volumeCredits = Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
  if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits;
}

const functionName3 = (play, thisAmount, perf, format) => {
  return `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
};

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const thisAmount = calculatePerformanceTotal(play, perf);
    result += functionName3(play, thisAmount, perf, format);
    totalAmount += thisAmount;
    volumeCredits += functionName1(perf, format, play);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

document.getElementById("statement").innerText = statement(invoices, plays);


const output = statement(
  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  },
  {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
  }
);

if (output !== "Statement for BigCo\n" +
  "  Hamlet: $650.00 (55 seats)\n" +
  "  As You Like It: $580.00 (35 seats)\n" +
  "  Othello: $500.00 (40 seats)\n" +
  "Amount owed is $1,730.00\n" +
  "You earned 47 credits\n") {
  alert("Output has changed.");
  throw new Error("The code has different output");
}