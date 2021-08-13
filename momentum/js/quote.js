import { lang } from './lang.js'
const quoteChangeBtn = document.querySelector('#quoteChangeBtn')
const quoteTextEl = document.querySelector('#quoteText')
const quoteAuthorEl = document.querySelector('#quoteAuthor')

quoteChangeBtn.addEventListener('click', changeQuote)

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
  chooseLang()
}

function chooseLang() {
  console.log(lang, 'lang in quotes')
  lang == 'en'
    ? (textQuote = randomQuote.text_en)
    : (textQuote = randomQuote.text_ru)
  lang == 'en'
    ? (authorQuote = randomQuote.author_en)
    : (authorQuote = randomQuote.author_ru)

  quoteTextEl.textContent = `«${textQuote}»`
  quoteAuthorEl.textContent = `— ${authorQuote}`
}

async function changeQuote() {
  quoteChangeBtn.classList.toggle('quote-change-revert')
  await getRandomQuote()
}

changeQuote()

export { chooseLang }
