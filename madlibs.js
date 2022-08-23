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
//converts the story into a string
function parseStory(rawStory) {
    let noun = /\[n\]/
    let verb = /\[v\]/
    let adj = /\[a\]/
    let dot = /[.]/g
    let comma = /[,] /g

    const storyArray = []
        //splits string into a bunch of words
    let splitArray = rawStory.split(' ')
        //goes through each split string and creates object output-i.e {word:, pos}
    splitArray.forEach((str) => {
        if (noun.test(str)) {
            //creates new object
            const obj = {}
            obj['word'] = str.slice(0, str.length - 3) //-3 to delete []
            obj['pos'] = 'noun'
            storyArray.push(obj)
        } else if (verb.test(str)) {
            const obj = {}
            obj['word'] = str.slice(0, str.length - 3)
            obj['pos'] = 'verb'
            storyArray.push(obj)
        } else if (adj.test(str)) {
            const obj = {}
            obj['word'] = str.slice(0, str.length - 3)
            obj['pos'] = 'adj'
            storyArray.push(obj)
        } else if (dot.test(str)) {
            const obj = {}
            obj['word'] = str
            storyArray.push(obj)
        } else if (comma.test(str)) {
            const obj = {}
            obj['word'] = str
            storyArray.push(obj)
        } else {
            const obj = {}
            obj['word'] = str
            storyArray.push(obj)
        }
    })

    console.log(storyArray)
    return storyArray // This line is currently wrong :)
}

//adding text to edit

function madLibsEdit(story) {
    let edit = document.querySelector('.madLibsEdit')
    let p = document.createElement('p')
    edit.appendChild(p)
    story.forEach((excerpt) => {
        if ('pos' in excerpt) {
            // adding input spaces if pos is detected
            let input = document.createElement('input')
            let pos = excerpt.pos
            input.setAttribute('maxlength', '20')
            input.setAttribute('class', 'form-control d-inline-flex col-lg-2 mt-1')
            input.setAttribute('id', 'inputId')
            input.setAttribute('placeholder', `${pos}`)
            p.appendChild(input)
        } else {
            //turning array indexes into text
            const words = excerpt.word
            let text = JSON.stringify(words)
                // let result=text.join (' ')
            let result = text.replace(/['"]+/g, '')
            p.innerHTML += result + ' '
        }
    })
}

function madLibsPreview(story) {
    let madLibsPreview = document.querySelector('.madLibsPreview')
    for (let i = 0; i < story.length; i++) {
        if (story[i].pos) {
            madLibsPreview.innerHTML =
                madLibsPreview.innerHTML +
                ' ' +
                '<span   id="output' +
                i +
                '"  name="word" disabled placeholder=(' +
                story[i].pos +
                ')>' +
                '</span>';
            (' ')
        } else {
            madLibsPreview.innerHTML = madLibsPreview.innerHTML + ' ' + story[i].word
        }
    }
}

getRawStory()
    .then(parseStory)
    .then((processedStory) => {
        madLibsEdit(processedStory)
        madLibsPreview(processedStory)
    })