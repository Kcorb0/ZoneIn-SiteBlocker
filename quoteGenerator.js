import data from './quotes.json' assert {type: 'json'};

let quoteList = data.quotes;
let quoteNum = Math.floor(Math.random() * quoteList.length);
let getQuote = document.createTextNode(`"${quoteList[quoteNum][0]}"`);
let getAuthor = document.createTextNode(` - ${quoteList[quoteNum][1]}`);

document.getElementById("quote").appendChild(getQuote);
document.getElementById("author").appendChild(getAuthor);