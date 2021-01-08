const stdio = require("stdio");
const path = require("path");
const fs = require("fs");

// 1. Read json file from command line
// 2. Try Parse the json file
var opts = stdio.getopt({
  input: { key: "f", description: "location of input file", required: true },
  output: {
    key: "t",
    description: "location of target folder",
    required: true,
  },
});

const tripleQuotes = "```";

var outputContent = "";

const inputFilePath = opts.args[0];
// Synchronous read
var data = fs.readFileSync(inputFilePath);
// console.log(data.toString());

// parse json
var postmanJson = JSON.parse(data.toString());

var collnVariables = new Map();

function getVariables() {
  var cVariablesRaw = postmanJson.variable;
  if (cVariablesRaw != null) {
    cVariablesRaw.forEach((e) => {
      collnVariables.set(e.key, e.value);
    });
  }
  return collnVariables;
}
getVariables();
// console.log(getVariables());

// build header of markdown file
outputContent = getH1(postmanJson.info.name);

var routes = postmanJson.item;

outputContent = append(outputContent, "\n## Routes\n\n");

var _routesDocs = "";
routes.forEach((r) => {
  const requestType = r.request.method.toString().toLowerCase();

  // write name
  _routesDocs = appendNL(_routesDocs, getH3(r.name));

  // write method and
  var met = method(requestType, replaceVariables(r.request.url.raw));
  _routesDocs = appendNL(_routesDocs, met);

  // write authentication
  if (r.request.auth != null) {
    var auth = "Authentication Type: " + r.request.auth.type + "\n";
    _routesDocs = appendNL(_routesDocs, auth);
  }

  // TODO: write description
  if (r.request.description != null) {
    var desc = appendNL("Description: ", r.request.description) + "\n";
    _routesDocs = append(_routesDocs, desc);
  }

  // write request body for POST, PATCH
  // supports only raw
  if (requestType == "post" || requestType == "patch") {
    _routesDocs =
      _routesDocs +
      appendNL("**Request body:**<br/>\n", getCode("json", r.request.body.raw));

    _routesDocs =
      _routesDocs +
      appendNL("**Request headers:**<br/>\n", buildHeaders(r.request.header));

    // there can be n responses
    var responsesRaw = r.response;
    _routesDocs = _routesDocs + append("**Responses:**<br/>\n", "");

    if (responsesRaw != null) {
      // sort by status codes
      responsesRaw.sort(function (a, b) {
        return a.code - b.code;
      });
      responsesRaw.forEach((r) => {
        _routesDocs = appendNL(_routesDocs, buildResponse(r));
      });
    }
  }

  _routesDocs = append(_routesDocs, "---\n");
});

function buildResponse(r) {
  var resposne = "";
  var statusCode = "> " + r.code + " " + r.status;
  var headers = append("\n**Headers:**\n", buildHeaders(r.header));
  var body = append("**Body:**\n", getCode("json", r.body));
  resposne = appendNL(resposne, statusCode);
  resposne = appendNL(resposne, headers);
  resposne = appendNL(resposne, body);
  return resposne;
}

function buildHeaders(headers) {
  var headersCode = "";
  if (headers != null) {
    headers.forEach((e) => {
      headersCode += "\n" + e.key + ": " + e.value;
    });
  }
  return "```json" + headersCode + "\n```";
}

outputContent = append(outputContent, _routesDocs);

// console.log(outputContent);

function getH1(str) {
  return "# " + str;
}
function getH2(str) {
  return "## " + str;
}
function getH3(str) {
  return "### " + str;
}
function getH4(str) {
  return "#### " + str;
}
function getH5(str) {
  return "##### " + str;
}
function getH6(str) {
  return "###### " + str;
}

function getCode(lang, str) {
  return tripleQuotes + lang + "\n" + str + "\n" + tripleQuotes;
}

function append(str, str2) {
  return str + str2;
}

function appendNL(str, str2) {
  return str + str2 + "\n";
}

function method(img, url) {
  img = "assets/" + img + ".png";
  return `| <img src="${img}" width="53.3px" height="30px"/> | ${url} |\n| :---------- | :-------- |\n\n`;
}

function replaceVariables(oUrl) {
  cIndex = 0;
  while (oUrl.includes("{{") || oUrl.includes("}}")) {
    fIndex = oUrl.indexOf("{{", cIndex);
    lIndex = oUrl.indexOf("}}", cIndex);

    // console.log(fIndex + " " + lIndex);

    urlVar = oUrl.substr(fIndex + 2, lIndex - fIndex - 2);

    // console.log("variable found: " + urlVar);

    cIndex = lIndex;

    // console.log("first half: " + oUrl.substr(0, fIndex));
    // console.log("var to be replaced: " + collnVariables.get(urlVar));
    // console.log("second half: " + oUrl.substr(lIndex + 2, oUrl.length));

    oUrl =
      oUrl.substr(0, fIndex) +
      collnVariables.get(urlVar) +
      oUrl.substr(lIndex + 2, oUrl.length);
    // console.log("replaced: " + oUrl);
    // console.log("--------------");
  }
  return oUrl;
}

// console.log(replaceVariables("{{baseUrlAPIv1}}/auth/login"));

// create output directory and complete action
var mkdirp = require("mkdirp");

var outfilePath;

writeContentsToOutputDirectory();

async function writeContentsToOutputDirectory() {
  if (opts.output) {
    outfilePath = path.join(opts.args[1], "docs");
    // console.log(outfilePath);
    await mkdirp(outfilePath, mkdirp.prototype, function (err) {
      if (err) console.error(err);
      else console.log("pow!");
    });

    await mkdirp(
      path.join(outfilePath, "assets"),
      mkdirp.prototype,
      function (err) {
        if (err) console.error(err);
        else console.log("pow!");
      }
    );

    // write docs
    fs.copyFile(
      path.join(__dirname, "assets/get.png"),
      path.join(outfilePath, "assets/get.png"),
      (err) => {
        if (err) throw err;
        console.log("get.png was copied to destination");
      }
    );

    fs.copyFile(
      path.join(__dirname, "assets/del.png"),
      path.join(outfilePath, "assets/del.png"),
      (err) => {
        if (err) throw err;
        console.log("del.png was copied to destination");
      }
    );

    fs.copyFile(
      path.join(__dirname, "assets/head.png"),
      path.join(outfilePath, "assets/head.png"),
      (err) => {
        if (err) throw err;
        console.log("head.png was copied to destination");
      }
    );

    fs.copyFile(
      path.join(__dirname, "assets/options.png"),
      path.join(outfilePath, "assets/options.png"),
      (err) => {
        if (err) throw err;
        console.log("options.png was copied to destination");
      }
    );

    fs.copyFile(
      path.join(__dirname, "assets/patch.png"),
      path.join(outfilePath, "assets/patch.png"),
      (err) => {
        if (err) throw err;
        console.log("patch.png was copied to destination");
      }
    );

    fs.copyFile(
      path.join(__dirname, "assets/post.png"),
      path.join(outfilePath, "assets/post.png"),
      (err) => {
        if (err) throw err;
        console.log("post.png was copied to destination");
      }
    );

    fs.copyFile(
      path.join(__dirname, "assets/put.png"),
      path.join(outfilePath, "assets/put.png"),
      (err) => {
        if (err) throw err;
        console.log("put.png was copied to destination");
      }
    );

    var writeStream = fs.createWriteStream(path.join(outfilePath, "README.md"));
    writeStream.write(outputContent);
    writeStream.end();
    console.log("Done!");
  } else {
    console.log("Specify output file path");
  }
}
