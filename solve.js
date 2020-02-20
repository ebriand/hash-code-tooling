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
    //debug({ day });
    //debug({ isCurrentlySigning, signedUpLibrariesIndexes });
    if (isCurrentlySigning) {
      nbSignedUpLeft--;
      //debug({ nbSignedUpLeft });
      if (nbSignedUpLeft === 0) {
        isCurrentlySigning = false;
        const libraryIndex =
          signedUpLibrariesIndexes[signedUpLibrariesIndexes.length - 1];
        //debug("finished signing", libraryIndex);
        signedUpLibraries.push({
          libraryIndex,
          nbSentBooks: 0,
          books: [],
          shipCapacity: libraries[libraryIndex].shipCapacity,
          availableBooks: libraries[libraryIndex].books
        });
      }
    }

    if (!isCurrentlySigning) {
      libraries.forEach((library, index) => {
        if (signedUpLibrariesIndexes.includes(index) || isCurrentlySigning) {
          return;
        }
        //debug("Signing", index);
        isCurrentlySigning = true;
        signedUpLibrariesIndexes.push(index);
        nbSignedUpLeft = library.signupDuration;
      });
    }
    for (signedUpLibrary of signedUpLibraries) {
      if (signedUpLibrary.availableBooks.length <= 0) continue;
      //debug("sending books for library", signedUpLibrary.libraryIndex);
      const shippedBooks = signedUpLibrary.availableBooks.splice(
        0,
        signedUpLibrary.shipCapacity
      );
      signedUpLibrary.books = signedUpLibrary.books.concat(shippedBooks);
      signedUpLibrary.nbSentBooks += shippedBooks.length;
    }
  }
  //debug(signedUpLibraries);
  return signedUpLibraries;
}

module.exports = solve;
