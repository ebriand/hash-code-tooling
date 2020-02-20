const _ = require("lodash/fp");
const fs = require("fs");
const debug = require("debug")("write");

module.exports = function write(path, solution) {
  writeLines(path, unparse(solution));
};

function writeLines(path, lines) {
  fs.writeFileSync(path, lines.join("\n"));
  debug(`wrote ${lines.length} lines to ${path}`);
}

const unparse = solution => {
  debug("writing...");
  const result = [solution.length];
  for (let i = 0; i < solution.length; i++) {
    const library = solution[i];
    result.push([library.libraryIndex + " " + library.nbSentBooks]);
    result.push([library.books.join(" ")]);
  }
  return result;
};

module.exports.unparse = unparse;
