import {lang} from './helpers.js'

const quoteChangeBtn = document.querySelector('.quote-change')
const quoteTextEl = document.querySelector('#quoteText')
const quoteAuthorEl = document.querySelector('#quoteAuthor')

let randomQuote
let textQuote
let authorQuote

async function getQuotes() {
  const res = await fetch('data/quotes.json')
  const data = await res.json()
  return data
}

async function getRandomQuote() {
  const quotes = await getQuotes()
  randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  lang === 'en' ? textQuote = randomQuote.textEn : textQuote = randomQuote.textRu
  lang === 'en' ? authorQuote = randomQuote.authorEn : authorQuote = randomQuote.authorRu
}

async function changeQuote() {
  quoteChangeBtn.classList.toggle('quote-change-revert')
  await getRandomQuote()
  quoteTextEl.textContent = `${textQuote}`
  quoteAuthorEl.textContent = `${authorQuote}`
}

export default changeQuote