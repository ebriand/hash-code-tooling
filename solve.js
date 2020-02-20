const debug = require("debug")("solve");
const _ = require("lodash");
const gridUtils = require("./grid-utils");
const sortLibraries = require("./sortLibraries");
const sortBooks = require("./sortBooks");

function solve({ nbooks, nlibraries, ndays, scores, libraries }, file) {
  let isCurrentlySigning = false;
  let currentlySigningLibrary = null;
  const signedUpLibrariesIndexes = new Set();
  const signedUpLibraries = [];
  let nbSignedUpLeft = 0;
  const alreadySentBooks = new Set();
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
          availableBooks: new Set(
            sortBooks(currentlySigningLibrary.books, scores)
          )
        });
      }
    }

    if (!isCurrentlySigning) {
      const sortedLibraries = sortLibraries(libraries, ndays, scores);
      for (let index = 0; index < sortedLibraries.length; index++) {
        const library = sortedLibraries[index];
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
      if (signedUpLibrary.availableBooks.size == 0) continue;
      const shippedBooks = [];
      for (book of signedUpLibrary.availableBooks) {
        if (alreadySentBooks.has(book)) {
          signedUpLibrary.availableBooks.delete(book);
          continue;
        }
        shippedBooks.push(book);
        alreadySentBooks.add(book);
        if (shippedBooks.length === signedUpLibrary.shipCapacity) break;
      }
      signedUpLibrary.books = signedUpLibrary.books.concat(shippedBooks);
      signedUpLibrary.nbSentBooks += shippedBooks.length;
    }
  }
  debug("finished");
  return signedUpLibraries.filter(library => library.nbSentBooks !== 0);
}

module.exports = solve;
