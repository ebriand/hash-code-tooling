const _ = require("lodash/fp");
const fs = require("fs");
const debug = require("debug")("write");

module.exports = function write(path, solution) {
  console.log("coucou", unparse(solution));
  writeLines(path, unparse(solution));
};

function writeLines(path, lines) {
  fs.writeFileSync(path, lines.join("\n"));
  debug(`wrote ${lines.length} lines to ${path}`);
}

const unparse = solution => {
  const result = [solution.length];
  solution.forEach(library => {
    result.push([library.libraryIndex + " " + library.nbSentBooks]);
    result.push([library.books.join(" ")]);
  });
  return result;
};

module.exports.unparse = unparse;
