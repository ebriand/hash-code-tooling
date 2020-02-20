const debug = require("debug")("solve");
const _ = require("lodash");
const gridUtils = require("./grid-utils");

function solve({ nbooks, nlibraries, ndays, scores, libraries }, file) {
  let isCurrentlySigning = false;
  let currentlySigningIndex = null;
  const signedUpLibrariesIndexes = new Set();
  const signedUpLibraries = [];
  let nbSignedUpLeft = 0;
  for (let day = 0; day < ndays; day++) {
    //debug("begin day");
    //debug({ day });
    //debug({ isCurrentlySigning, signedUpLibrariesIndexes });
    if (isCurrentlySigning) {
      nbSignedUpLeft--;
      //debug({ nbSignedUpLeft });
      if (nbSignedUpLeft === 0) {
        isCurrentlySigning = false;
        //debug("finished signing", libraryIndex);
        signedUpLibraries.push({
          libraryIndex: currentlySigningIndex,
          nbSentBooks: 0,
          books: [],
          shipCapacity: libraries[currentlySigningIndex].shipCapacity,
          availableBooks: libraries[currentlySigningIndex].books
        });
      }
    }

    if (!isCurrentlySigning) {
      for (let index = 0; index < libraries.length; index++) {
        if (signedUpLibrariesIndexes.has(index)) {
          continue;
        }
        //debug("Signing", index);
        isCurrentlySigning = true;
        signedUpLibrariesIndexes.add(index);
        currentlySigningIndex = index;
        nbSignedUpLeft = libraries[index].signupDuration;
        break;
      }
    }
    //debug("send");
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
    //debug("end day");
  }
  //debug(signedUpLibraries);
  debug("finished");
  return signedUpLibraries;
}

module.exports = solve;
