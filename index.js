const stdio = require("stdio");
const path = require("path");
const fs = require("fs");

// 1. Read json file from command line
// 2. Try Parse the json file
var opts = stdio.getopt({
  input: { key: "f", description: "location of input file", required: true },
  output: {
    key: "t",
    description: "location of target file",
    required: false,
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

console.log(getVariables());

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
    var auth = "\nAuthentication Type: " + r.request.auth.type;
    _routesDocs = appendNL(_routesDocs, auth);
  }

  // TODO: write description
  if (r.request.description != null) {
    var desc = appendNL("Description: ", r.request.description);
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

console.log(outputContent);

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
