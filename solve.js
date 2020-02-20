const debug = require("debug")("solve");
const _ = require("lodash");
const gridUtils = require("./grid-utils");

function solve({ nbooks, nlibraries, ndays, scores, libraries }, file) {
  //{"nbooks":6,"nlibraries":2,"ndays":7,"scores":[1,2,3,6,5,4],"libraries":[{"nbooks":5,"signupDuration":2,"shipCapacity":2,"books":[0,1,2,3,4]},{"nbooks":4,"signupDuration":3,"shipCapacity":1,"books":[0,2,3,5]}]}
  let isCurrentlySigning = false;
  const signedUpLibrariesIndexes = [];
  const signedUpLibraries = [];
  let nbSignedUpLeft = 0;
  for (let day = 0; day < ndays; day++) {
    debug({ day });
    debug({ isCurrentlySigning, signedUpLibrariesIndexes });
    if (isCurrentlySigning) {
      nbSignedUpLeft--;
      if (nbSignedUpLeft === 0) {
        isCurrentlySigning = false;
        const libraryIndex =
          signedUpLibrariesIndexes[signedUpLibrariesIndexes.length - 1];
        signedUpLibraries.push({
          libraryIndex,
          nbSentBooks: 0,
          books: [],
          shipCapacity: libraries[libraryIndex].shipCapacity,
          availableBooks: libraries[libraryIndex].books
        });
      }
    } else {
      debug("signing");
      libraries.forEach((library, index) => {
        if (signedUpLibrariesIndexes.includes(index) || isCurrentlySigning) {
          return;
        }
        debug({ index });
        isCurrentlySigning = true;
        signedUpLibrariesIndexes.push(index);
        nbSignedUpLeft = library.signupDuration - 1;
      });
    }
    for (signedUpLibrary of signedUpLibraries) {
      if (signedUpLibrary.availableBooks.length <= 0) continue;
      const shippedBooks = signedUpLibrary.availableBooks.splice(
        0,
        signedUpLibrary.shipCapacity
      );
      signedUpLibrary.books.push(shippedBooks);
      signedUpLibrary.nbSentBooks += shippedBooks.length;
    }
  }
  // const signedUpLibraries = [
  //   {
  //     libraryIndex: 1,
  //     nbSentBooks: 3,
  //     books: [5, 2, 3]
  //   },
  //   {
  //     libraryIndex: 0,
  //     nbSentBooks: 5,
  //     books: [0, 1, 2, 3, 4]
  //   }
  // ];

  return signedUpLibraries;
}

module.exports = solve;
