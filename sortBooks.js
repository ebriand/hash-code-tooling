module.exports = function sortBooks(books, scores) {
  const sortedBooks = [];
  const result = books.map(book => {
    return {
      index: book,
      score: scores[book]
    };
  });
  result.sort(function(a, b) {
    return b.score - a.score;
  });
  return result.map(book => book.index);
};
