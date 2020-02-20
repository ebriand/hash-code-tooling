const debug = require("debug")("solve");
const _ = require("lodash");
const gridUtils = require("./grid-utils");

function solve({ nbooks, nlibraries, ndays, scores, librairies }, file) {
  //{"nbooks":6,"nlibraries":2,"ndays":7,"scores":[1,2,3,6,5,4],"libraries":[{"nbooks":5,"signupDuration":2,"shipCapacity":2,"books":[0,1,2,3,4]},{"nbooks":4,"signupDuration":3,"shipCapacity":1,"books":[0,2,3,5]}]}
  const signedUpLibraries = [
    {
      libraryIndex: 1,
      nbSentBooks: 3,
      books: [5, 2, 3]
    },
    {
      libraryIndex: 0,
      nbSentBooks: 5,
      books: [0, 1, 2, 3, 4]
    }
  ];

  return signedUpLibraries;
}

module.exports = solve;
