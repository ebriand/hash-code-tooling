const debug = require("debug")("solve");
const _ = require("lodash");
const gridUtils = require("./grid-utils");
const sortLibraries = require("./sortLibraries");

function solve({ nbooks, nlibraries, ndays, scores, libraries }, file) {
  libraries = sortLibraries(libraries, ndays, scores);
  let isCurrentlySigning = false;
  let currentlySigningLibrary = null;
  const signedUpLibrariesIndexes = new Set();
  const signedUpLibraries = [];
  let nbSignedUpLeft = 0;
  for (let day = 0; day < ndays; day++) {
    if (isCurrentlySigning) {
      nbSignedUpLeft--;
      if (nbSignedUpLeft === 0) {
        isCurrentlySigning = false;
        signedUpLibraries.push({
          libraryIndex: currentlySigningLibrary.index,
          nbSentBooks: 0,
          books: [],
          shipCapacity: currentlySigningLibrary.shipCapacity,
          availableBooks: currentlySigningLibrary.books
        });
      }
    }

    if (!isCurrentlySigning) {
      for (let index = 0; index < libraries.length; index++) {
        const library = libraries[index];
        if (signedUpLibrariesIndexes.has(library.index)) {
          continue;
        }
        isCurrentlySigning = true;
        signedUpLibrariesIndexes.add(library.index);
        currentlySigningLibrary = library;
        nbSignedUpLeft = library.signupDuration;
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
