module.exports = function sortLibraries(libraries, ndays, bookScores) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return libraries.sort(function(a, b) {
    const aScores =
      a.books.length == 0
        ? 0
        : a.books
            .map(book => {
              return bookScores[book];
            })
            .reduce(reducer);
    const indexA =
      a.books.length == 0
        ? 0
        : ((ndays - a.signupDuration) * aScores * a.shipCapacity) /
          a.books.length;
    const bScores =
      b.books.length == 0
        ? 0
        : b.books
            .map(book => {
              return bookScores[book];
            })
            .reduce(reducer);
    const indexB =
      b.books.length == 0
        ? 0
        : ((ndays - b.signupDuration) * bScores * b.shipCapacity) /
          b.books.length;
    return indexB - indexA;
  });
};
