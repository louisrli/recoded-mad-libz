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

const REGEX = /(?<word>\w+)(?<pos>\[[nva]\])?(?<punctuation>[\.,])?/;

const POS_FULL_WORD = {
  n : "noun",
  v : "verb",
  a : "adjective",
}

function posFunction(param){
  let nRegex = /[[n]]/;
  let vRegex = /[[v]]/;
  let aRegex = /[[a]]/;
  if (nRegex.test(param) === true){
    return nRegex = POS_FULL_WORD["n"]
  } else if (vRegex.test(param) == true) {
    return vRegex = POS_FULL_WORD.v
  } else if (aRegex.test(param)){
    return aRegex = POS_FULL_WORD.a
  }
}

function parseStory(rawStory) {
  // Your code here.
  const rawWords = rawStory.split(" ")
  const results = [];

  for (let i = 0; i < rawWords.length; i++){
    const rawWord = rawWords[i];
    const groups = REGEX.exec(rawWord).groups

    results.push(
      {
        word: groups.word,
        pos: groups.pos ? posFunction(groups.pos) : undefined,
        punc: groups.punctuation,
      }
    )
  }

  const madlibsPrev = document.querySelector('.madLibsEdit');
  for (let x = 0; x < results.length; x++){
    let getWord = results[x].word
    // console.log(getWord)
    if (results[x].punc !== undefined){
      madlibsPrev.innerHTML = madlibsPrev.innerHTML + results[x].punc
    }
    if (results[x].pos !== undefined){
    results.pos = document.createElement('input')
    const input = madlibsPrev.innerHTML + " " + '<input type="text" maxlength = "20" placeholder = "'+ results[x].pos + '" style= "border-radius:10px; width:15%; background-color:rgb(84, 240, 181); margin:3px" >'
    madlibsPrev.innerHTML = input
  } else  {
    madlibsPrev.innerHTML = madlibsPrev.innerHTML + " " + getWord} 
  }
  
  const madlibsOut = document.querySelector('.madLibsPreview');
  const outSpan = document.createElement('span');

  for (let y = 0; y < results.length; y++){
    let getWord2 = results[y].word
    // console.log(getWord2)
    if (results[y].punc !== undefined){
      madlibsOut.innerHTML = madlibsOut.innerHTML + results[y].punc
    }
    if (results[y].pos !== undefined){
    results.pos = document.createElement('input')
    const output = madlibsOut.innerHTML + " " + '<input type="text"  placeholder = "'+ results[y].pos + '" style= "border-radius:10px; width:15%; background-color:rgb(84, 240, 181); margin:3px" >'
    madlibsOut.innerHTML = output
  } 
  else  {
    madlibsOut.innerHTML = madlibsOut.innerHTML + " " + getWord2} 
  }

//   madlibsPrev.innerHTML.valueOf() = madlibsOut.innerHTML.valueOf();
// // Add event listener on keyup
// madlibsPrev.addEventListener('keyup', (event) => {
  
// })
//   const name = event.key;
//   const  code = event.code;
//   // Alert the key name and key code on keydown
 
// }, false);


  return results; 
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
