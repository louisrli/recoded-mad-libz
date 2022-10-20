/**
 * DO NOT TOUCH ANY OF THE CODE BELOW HERE.
 * 
 * Or you will be very sad.
 */
const getRawStory = () => {
  return fetch('https://github.com/alandio/recoded-mad-libz/raw/master/story.txt')
    .then(response => response.text());
};
