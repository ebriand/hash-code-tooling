module.exports = function sortLibraries(libraries, ndays, bookScores) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return libraries.sort(function(a, b) {
    const aRemainingTime = ndays - a.signupDuration;
    const aBooks = a.books.slice(aRemainingTime * a.shipCapacity);
    const aScores =
      aBooks.length == 0
        ? 0
        : aBooks
            .map(book => {
              return bookScores[book];
            })
            .reduce(reducer);
    const indexA = aScores * a.shipCapacity;
    const bRemainingTime = ndays - b.signupDuration;
    const bBooks = b.books.slice(bRemainingTime * b.shipCapacity);
    const bScores =
      bBooks.length == 0
        ? 0
        : bBooks
            .map(book => {
              return bookScores[book];
            })
            .reduce(reducer);
    const indexB = bScores * b.shipCapacity;
    return indexB - indexA;
  });
};
