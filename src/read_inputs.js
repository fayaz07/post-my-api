const stdio = require("stdio");
const path = require("path");

// 1. Read json file from command line
// 2. Try Parse the json file
var opts = stdio.getopt({
  input: {
    key: "f",
    description: "Location of postman collection(json) file",
    required: true,
  },
  output: {
    key: "t",
    description: "Target folder to place docs and assets",
    required: true,
  },
});

var collectionFilePath;
var outputDir;

module.exports.validateInputs = () => {
  console.log("Validating inputs...");
  var optionsArgs = opts.args;

  if (!opts.input || !opts.output) {
    throw "Please provide valid inputs, verify your command matches the following\npost-my-api -f <path-to-collection.json> -t <where-to-store-docs>";
  }

  // check which of the args has .json
  if (optionsArgs[0].toString().includes("json")) {
    // I know this is a stupid trick,
    // please raise a pull request and replace this shitty code
    // if you've a better idea
    collectionFilePath = optionsArgs[0];
    outputDir = optionsArgs[1];
  } else {
    collectionFilePath = optionsArgs[1];
    outputDir = optionsArgs[0];
  }

  console.log("Found valid inputs...");

  outputDir = path.join(opts.args[1], "docs");
};

module.exports.getInputFilePath = () => {
  return collectionFilePath;
};

module.exports.getOutputDir = () => {
  return outputDir;
};
