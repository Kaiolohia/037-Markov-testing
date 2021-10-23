/** Textual markov chain generator */

function randint(max) {
  return Math.floor(Math.random() * max);
}

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    let chain = {}
    for (let i=0;i<words.length;i++) {
      if (chain.hasOwnProperty(words[i])) {
        chain[words[i]].push(words[i+1])
      }
      else {
        chain[words[i]] = [words[i+1]]
      }
    }
    return chain
  }

  /** return random text from chains */

  makeText(startingWord, numWords = 100) {
    let i = 0
    let phrase = []
    let keys = Object.keys(this.chain);
    let currentKey = startingWord
    phrase.push(startingWord)
    while(true) {
      if (i==numWords) {
        break;
      }
      let word = this.chain[currentKey]

        word = word[randint(word.length)]
        
      if (!word) {
        break;
      }
      phrase.push(word)
      currentKey = word
      i++
    }
    return phrase
  }
}

let markovMachine = new MarkovMachine("the cat in the hat is in the hat")
console.log(markovMachine.chain)
markovMachine.makeText("in",6)