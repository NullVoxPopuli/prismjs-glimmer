var __defProp = Object.defineProperty;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __objSpread = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/index.js
__markAsModule(exports);
__export(exports, {
  setup: () => setup
});

// src/glimmer.js
function setup(Prism) {
  const _EQUALITY_HELPERS = "eq neq";
  const _NUMERIC_COMPARISON_HELPERS = "gt gte le lte";
  const _LOGICAL_OPERATOR_HELPERS = "and or not";
  const _BLOCK_HELPERS = "let each each-in if else unless";
  const _DEBUG_HELPERS = "log debugger";
  const _INLINE_HELPERS = "has-block concat fn component helper modifier get hash query-params";
  const _MODIFIERS = "action on";
  const _SPECIAL = "outlet yield";
  const _LITERALS = "true false undefined null";
  function toKeywords(spaceSep) {
    return new RegExp(`\\b(?:${spaceSep.split(" ").join("|")})\\b`);
  }
  const parenOpen = "(\\()";
  const mustacheOpen = "(\\{\\{\\{?)";
  const symbol = "[-+*/_~!@$%^=<>{}\\w]+";
  const COMPONENT_NAME_SEGMENT = /[A-Za-z0-9]+/;
  const COMPONENT_NAME = regex.either(COMPONENT_NAME_SEGMENT, /[a-zA-Z0-9]+\.[a-zA-Z0-9-]+/, regex.concat(COMPONENT_NAME_SEGMENT, /::/, /-?/, COMPONENT_NAME_SEGMENT));
  const NUMBER = /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/;
  const STRING = new RegExp(regex.either(/"[^{"]+/, /"/, /'[^{']+/, /'/, /"[^"]+"/, /'[^']+'/));
  const Arg = {
    "parameter argument property": {
      pattern: /@[\w\d-_]+/
    }
  };
  const Punctuation = {
    punctuation: [
      {
        pattern: /[!#%&:()*+,.\/;<=>\[\\\]^`{|}~]+/
      },
      {
        pattern: /^=/,
        alias: "attr-equals"
      },
      {
        pattern: /\/?>/
      }
    ]
  };
  const FunctionName = {
    "function-name": [
      {
        pattern: new RegExp(parenOpen + symbol),
        lookbehind: true
      },
      {
        pattern: new RegExp(mustacheOpen + symbol),
        lookbehind: true
      }
    ]
  };
  const Keywords = {
    builtin: toKeywords([_MODIFIERS, _SPECIAL, _DEBUG_HELPERS, _BLOCK_HELPERS].join(" ")),
    keyword: toKeywords([_INLINE_HELPERS, _LITERALS].join(" ")),
    operator: toKeywords([_EQUALITY_HELPERS, _NUMERIC_COMPARISON_HELPERS, _LOGICAL_OPERATOR_HELPERS, "as"].join(" "))
  };
  const Helper = {
    function: {
      greedy: true,
      pattern: /\([\S-_\d]+\b/,
      inside: __objSpread(__objSpread(__objSpread({}, Punctuation), FunctionName), Keywords)
    }
  };
  const ThisExpression = {
    "this-expression": {
      pattern: /this\.[\S]+/,
      lookbehind: true,
      greedy: true,
      inside: __objSpread(__objSpread({}, Punctuation), {
        namespace: /this/,
        property: /[\S]+/
      })
    }
  };
  const MemberExpression = {
    "member-expression": {
      pattern: /[\S]+\.[\S]+/,
      lookbehind: true,
      greedy: true,
      inside: __objSpread(__objSpread({}, Punctuation), {
        constant: /[\S]+/,
        property: /[\S]+/
      })
    }
  };
  const INSIDE_MUSTACHE_AND_SUB_EXPRESSION = __objSpread(__objSpread(__objSpread(__objSpread(__objSpread(__objSpread(__objSpread(__objSpread(__objSpread({}, Helper), Punctuation), ThisExpression), MemberExpression), Arg), {
    number: NUMBER,
    boolean: /\b(?:true|false)\b/
  }), Keywords), FunctionName), {
    "attr-name": /^[^=]+=/,
    string: STRING,
    variable: /\b[A-Za-z0-9_-]+\b/
  });
  const SubExpression = {
    "sub-expression": {
      alias: "punctuation",
      pattern: /\([^)]+\)/,
      lookbehind: true,
      greedy: true,
      inside: INSIDE_MUSTACHE_AND_SUB_EXPRESSION
    }
  };
  const Mustache = {
    mustache: {
      pattern: /\{\{\{?\/?[^}]+?\}?\}\}/,
      lookbehind: true,
      alias: "punctuation",
      greedy: true,
      inside: __objSpread(__objSpread({}, SubExpression), INSIDE_MUSTACHE_AND_SUB_EXPRESSION)
    }
  };
  const String = {
    string: {
      pattern: STRING,
      inside: Mustache
    }
  };
  INSIDE_MUSTACHE_AND_SUB_EXPRESSION["string"] = String.string;
  const markup = Prism.languages.markup;
  if (!markup) {
    throw new Error("prism-markup is required");
  }
  Prism.languages.glimmer = __objSpread(__objSpread({
    comment: [
      {
        pattern: /\{\{!--[\s\S]*?--\}\}/
      },
      {
        pattern: /\{\{![\s\S]*?\}\}/
      }
    ],
    number: NUMBER
  }, Mustache), {
    tag: __objSpread(__objSpread({}, markup.tag), {
      inside: __objSpread(__objSpread(__objSpread(__objSpread(__objSpread({
        number: NUMBER
      }, Arg), Mustache), {
        tag: __objSpread(__objSpread({}, markup.tag.inside.tag), {
          inside: __objSpread(__objSpread({}, Punctuation), {
            "class-name": new RegExp(COMPONENT_NAME)
          })
        }),
        "attr-name": {
          pattern: /\b[^=\b]+=/,
          inside: __objSpread(__objSpread(__objSpread(__objSpread({}, String), Punctuation), Arg), Mustache)
        }
      }), Punctuation), String)
    })
  });
}
function lookahead(re) {
  return concat("(?=", re, ")");
}
function optional(re) {
  return concat("(", re, ")?");
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function either(...args) {
  const joined = "(" + args.map((x) => source(x)).join("|") + ")";
  return joined;
}
function source(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
var regex = {lookahead, either, optional, concat};
