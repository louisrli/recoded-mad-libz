/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

const posMap = {
  n: "noun",
  v: "verb",
  a: "adjective",
};

const parseInput = (word) => { // example word: Louis[n]
  const pos = word.match(/\[.*\]/g); // get the part of speech [n] [v] [a], example pos: ['[n]']
  if (pos) {
    // get the part of speech type (noun, verb, adjective)
    // slice the brackets off the part of speech
    const posType = posMap[pos[0].slice(1, -1)] || "unknown"; // pos[0]: '[n]' pos[0].slice(1, -1): 'n' posType: 'noun'
    word = word.replace(/\[.*\]/g, ""); // remove the part of speech from the word
    return { word, pos: posType }; // return the word and part of speech
  } else { // if there is no part of speech
    return { word }; // return the word
  }
};

function parseStory(rawStory) {
  return rawStory.split(" ").map(word => parseInput(word));
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
