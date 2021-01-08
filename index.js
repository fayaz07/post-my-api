const readers = require("./src/read_inputs");
const fileHandlers = require("./src/file_handlers");
const jsonHandlers = require("./src/json_handlers");

main();

var inPath;
var outputDir;

async function main() {
  // validates inputs
  readers.validateInputs();

  // get the file paths
  inPath = readers.getInputFilePath();
  outputDir = readers.getOutputDir();

  // reading collection
  const inBytes = fileHandlers.readCollectionJsonFile(inPath);
  const collectionJSON = JSON.parse(inBytes.toString());

  // reading variables stored in the collection
  const collnVariables = jsonHandlers.getVariables(collectionJSON);

  await fileHandlers.createDirectories(outputDir);

  console.log("Building your docs....");
  jsonHandlers.generateDocs(collectionJSON, collnVariables, outputDir);
  console.log("Docs building finished....");
  console.log("Copying assets....");
  await fileHandlers.copyAssets(outputDir);
  console.log("API Docs built successfully....");
}
