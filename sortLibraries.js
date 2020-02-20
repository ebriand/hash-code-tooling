module.exports = function sortLibraries(libraries, ndays, bookScores) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return libraries.sort(function(a, b) {
    const aScores = a.books
      .map(book => {
        return bookScores[book];
      })
      .reduce(reducer);
    const indexA = (ndays - a.signupDuration) * aScores * a.shipCapacity;
    const bScores = b.books
      .map(book => {
        return bookScores[book];
      })
      .reduce(reducer);
    const indexB = (ndays - b.signupDuration) * bScores * b.shipCapacity;
    return indexB - indexA;
  });
};
