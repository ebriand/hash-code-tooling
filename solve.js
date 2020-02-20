const debug = require("debug")("solve");
const _ = require("lodash");
const gridUtils = require("./grid-utils");
const sortLibraries = require("./sortLibraries");

function solve({ nbooks, nlibraries, ndays, scores, libraries }, file) {
  libraries = sortLibraries(libraries, ndays, scores);
  let isCurrentlySigning = false;
  let currentlySigningIndex = null;
  const signedUpLibrariesIndexes = new Set();
  const signedUpLibraries = [];
  let nbSignedUpLeft = 0;
  for (let day = 0; day < ndays; day++) {
    if (isCurrentlySigning) {
      nbSignedUpLeft--;
      if (nbSignedUpLeft === 0) {
        isCurrentlySigning = false;
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
        isCurrentlySigning = true;
        signedUpLibrariesIndexes.add(index);
        currentlySigningIndex = index;
        nbSignedUpLeft = libraries[index].signupDuration;
        break;
      }
    }
    for (signedUpLibrary of signedUpLibraries) {
      if (signedUpLibrary.availableBooks.length <= 0) continue;
      const shippedBooks = signedUpLibrary.availableBooks.splice(
        0,
        signedUpLibrary.shipCapacity
      );
      signedUpLibrary.books = signedUpLibrary.books.concat(shippedBooks);
      signedUpLibrary.nbSentBooks += shippedBooks.length;
    }
  }
  debug("finished");
  return signedUpLibraries;
}

module.exports = solve;
