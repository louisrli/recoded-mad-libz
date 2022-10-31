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
function parseStory(rawStory) {
  // Your code here.
  //THE FIRST STEP WE ARE GONNA SPLITING THE WHOLE TEXT THAT IS CAME FROM STORY.TXT INTO SINGLE WORDS
  const siplitedString = rawStory.split(" ");

  //DECLEAR AN ARRAY THAT WILL SAVE EACH WORD AS AN OBJECT
  const arrayOfWords = [];
  //USING REGEX TO SEARCH FOR A SPECIFIC STRING OR MAYBE A SPECIFIC LETTER

  const noun = /\[n\]/;
  const verb = /\[v\]/;
  const adjectiven = /\[a\]/;
  const animal = /\[an\]/;
  const food = /\[f\]/;

  // console.log(arrayOfWords);

  //MAP THROUGHT THE ARRAY OF SIPLITED TEXT AND CHECK (NOUNS, VERBS AND ADJECTIVE) IF YOU MAP IT, PUSH IT AS AN OBJECT INTO THE ARRAY THAT WE ALREADY DECLEARED ABOVE
  siplitedString.map((string) => {
    if (noun.test(string) == true) {
      //WHENEVER THE CONDITION IS TRUE.. CREATE AN OBJECT AND PUSH THE WORD IN AND GIV THE WORD A KEY
      const wordObj = {};
      //SLICEING THE WORD BECAUSE THE WORD IS LOUIS[N], SO WE SHOULD REMOVE [N] AND KEEP LOUIS
      wordObj.word = string.slice(0, string.length - 3);
      wordObj.pos = "noun";
      // THEN PUSH THIS OBJECT INTO THE ARRAY THAT WE ALREADY DECLEARD.
      arrayOfWords.push(wordObj);
    } else if (verb.test(string) == true) {
      //WHENEVER THE CONDITION IS TRUE.. CREATE AN OBJECT AND PUSH THE WORD IN AND GIV THE WORD A KEY
      const wordObj = {};
      //SLICEING THE WORD BECAUSE THE WORD IS LOUIS[N], SO WE SHOULD REMOVE [N] AND KEEP LOUIS
      wordObj.word = string.slice(0, string.length - 3);
      wordObj.pos = "verb";
      // THEN PUSH THIS OBJECT INTO THE ARRAY THAT WE ALREADY DECLEARD.
      arrayOfWords.push(wordObj);
    } else if (adjectiven.test(string) == true) {
      //WHENEVER THE CONDITION IS TRUE.. CREATE AN OBJECT AND PUSH THE WORD IN AND GIV THE WORD A KEY
      const wordObj = {};
      //SLICEING THE WORD BECAUSE THE WORD IS LOUIS[N], SO WE SHOULD REMOVE [N] AND KEEP LOUIS
      wordObj.word = string.slice(0, string.length - 3);
      wordObj.pos = "adjective";
      // THEN PUSH THIS OBJECT INTO THE ARRAY THAT WE ALREADY DECLEARD.
      arrayOfWords.push(wordObj);
    } else if (animal.test(string) == true) {
      //WHENEVER THE CONDITION IS TRUE.. CREATE AN OBJECT AND PUSH THE WORD IN AND GIV THE WORD A KEY
      const wordObj = {};
      //SLICEING THE WORD BECAUSE THE WORD IS LOUIS[N], SO WE SHOULD REMOVE [N] AND KEEP LOUIS
      wordObj.word = string.slice(0, string.length - 3);
      wordObj.pos = "animal";
      // THEN PUSH THIS OBJECT INTO THE ARRAY THAT WE ALREADY DECLEARD.
      arrayOfWords.push(wordObj);
    } else if (food.test(string) == true) {
      //WHENEVER THE CONDITION IS TRUE.. CREATE AN OBJECT AND PUSH THE WORD IN AND GIV THE WORD A KEY
      const wordObj = {};
      //SLICEING THE WORD BECAUSE THE WORD IS LOUIS[N], SO WE SHOULD REMOVE [N] AND KEEP LOUIS
      wordObj.word = string.slice(0, string.length - 3);
      wordObj.pos = "food";
      // THEN PUSH THIS OBJECT INTO THE ARRAY THAT WE ALREADY DECLEARD.
      arrayOfWords.push(wordObj);
    } else {
      //WHENEVER THE CONDITION IS TRUE.. CREATE AN OBJECT AND PUSH THE WORD IN AND GIV THE WORD A KEY
      const wordObj = {};
      //SLICEING THE WORD BECAUSE THE WORD IS LOUIS[N], SO WE SHOULD REMOVE [N] AND KEEP LOUIS
      wordObj.word = string;

      // THEN PUSH THIS OBJECT INTO THE ARRAY THAT WE ALREADY DECLEARD.
      arrayOfWords.push(wordObj);
    }
  });
  console.log(arrayOfWords);
  return arrayOfWords; // This line is currently wrong :)
}
const editingTheStory = (story) => {
  let h2 = document.createElement("h2");
  let previewStr = document.createElement("p");
  previewStr.id = "previewStr";
  const madLibsEdit = document.querySelector(".madLibsEdit");
  const madLibsPreview = document.querySelector(".madLibsPreview");
  madLibsEdit.appendChild(h2);
  madLibsPreview.appendChild(previewStr);

  let prevCount = 0;
  let editCount = 0;
  story.map((element) => {
    if ("pos" in element) {
      // console.log(element.word);
      const madLibsInput = document.createElement("input");

      madLibsInput.placeholder = element.pos;
      madLibsInput.type = "text";
      madLibsInput.className = "input";
      madLibsInput.id = `input_${editCount++}`;
      h2.appendChild(madLibsInput);
      const previewSpan = document.createElement("span");
      previewSpan.id = `span_${prevCount++}`;
      previewSpan.innerText = `(${element.pos})`;
      previewStr.appendChild(previewSpan);
    } else {
      h2.innerHTML += " " + element.word + " ";
      previewStr.innerHTML += " " + element.word + " ";
    }
  });
};

function handlePreviewSection() {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    const input = document.querySelector(`#input_${i}`);

    input.addEventListener("input", function (e) {
      const span = document.querySelector(`#span_${i}`);
      if (input.value) {
        span.innerHTML = input.value;
      } else {
        span.innerHTML = `(${input.placeholder})`;
      }
    });
  }
}
const handleInputFocuse = () => {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    const input = document.getElementById(`input_${i}`);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        console.log("down"); document.getElementById(`input_${i + 1}`).focus();
      } else if (e.key === "ArrowRight") {
        document.getElementById(`input_${i + 1}`).focus();
      } else if (e.key === "ArrowLeft") {
        document.getElementById(`input_${i - 1}`).focus();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && !(inputs === document.activeElement)) {
        document.getElementById("input_0").focus();
      }
    });
  }
};
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
    editingTheStory(processedStory);
    handlePreviewSection();
    handleInputFocuse();

    // console.log(processedStory);
  });

//   if (element.pos === "noun") {
//     // console.log("noun");
//     const nounInput = document.createElement("input");
//     nounInput.type = "text";
//     nounInput.placeholder = element.pos;
//     element.word = nounInput;
//     // console.log(element.word);
//   } else if (element.pos === "verb") {
//     // console.log("noun");
//     const verbInput = document.createElement("input");
//     verbInput.type = "text";
//     verbInput.placeholder = element.pos;
//     element.word = verbInput;
//     // console.log(element.word);
//   } else if (element.pos === "adjective") {
//     // console.log("noun");
//     const adjInput = document.createElement("input");
//     adjInput.placeholder = element.pos;
//     adjInput.type = "text";
//     element.word = adjInput;
//     // console.log(element.word);
//   }
// });
