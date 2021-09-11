const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader=document.getElementById('loader')

let apiQuotes = []

//show loading
function loading(){
    loader.hidden=false;//this hidden is available in all html elements
    quoteContainer.hidden=true;
}

//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
// show new quote
function newQuote() {
    loading()
  //pick a randomm quote from apiQuotes array
  //if we use local array we have to use like this
  //const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  //check if author field is blank and replace it with unknown
  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author
  }
  //check the quote length and determine the styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  //set Quote, hide Loader
  quoteText.textContent = quote.text
  complete()
}
//get quotes from Api
async function getQuotes() {
    loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const res = await fetch(apiUrl)
    apiQuotes = await res.json()
    newQuote()
  } catch (error) {
    console.log(error)
  }
}
//Tweet quote
function tweetquote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}
// eventListners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetquote)
//on Load
getQuotes()

