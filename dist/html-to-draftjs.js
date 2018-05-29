(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("draft-js"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "draft-js"], factory);
	else if(typeof exports === 'object')
		exports["htmlToDraftjs"] = factory(require("immutable"), require("draft-js"));
	else
		root["htmlToDraftjs"] = factory(root["immutable"], root["draft-js"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = htmlToDraft;

var _draftJs = __webpack_require__(1);

var _immutable = __webpack_require__(0);

var _getSafeBodyFromHTML = __webpack_require__(4);

var _getSafeBodyFromHTML2 = _interopRequireDefault(_getSafeBodyFromHTML);

var _chunkBuilder = __webpack_require__(5);

var _getBlockTypeForTag = __webpack_require__(6);

var _getBlockTypeForTag2 = _interopRequireDefault(_getBlockTypeForTag);

var _processInlineTag = __webpack_require__(7);

var _processInlineTag2 = _interopRequireDefault(_processInlineTag);

var _getBlockData = __webpack_require__(8);

var _getBlockData2 = _interopRequireDefault(_getBlockData);

var _getEntityId = __webpack_require__(9);

var _getEntityId2 = _interopRequireDefault(_getEntityId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACE = ' ';
var REGEX_NBSP = new RegExp('&nbsp;', 'g');

var firstBlock = true;

function genFragment(node, inlineStyle, depth, lastList, inEntity, customChunkGenerator) {
  var nodeName = node.nodeName.toLowerCase();
  if (customChunkGenerator) {
    var value = customChunkGenerator(nodeName, node);
    if (value) {
      var entityId = _draftJs.Entity.__create(value.type, value.mutability, value.data || {});
      return { chunk: (0, _chunkBuilder.getAtomicBlockChunk)(entityId) };
    }
  }
  if (nodeName === 'div' && node instanceof HTMLDivElement) {
    var entityConfig = {};
    entityConfig.ctaTitle = node.getElementsByTagName('H3')[0].innerHTML;
    entityConfig.ctaText = node.getElementsByTagName('P')[0].innerHTML;
    entityConfig.ctaButtonText = node.getElementsByTagName('A')[0].innerHTML;
    entityConfig.url = node.getElementsByTagName('A')[0].getAttribute('href');
    entityConfig.targetOption = node.getElementsByTagName('A')[0].getAttribute('target');
    var _entityId = _draftJs.Entity.__create('CTA_BOX', 'MUTABLE', entityConfig);
    return { chunk: (0, _chunkBuilder.getAtomicBlockChunk)(_entityId) };
  }

  if (nodeName === '#text' && node.textContent !== '\n') {
    return (0, _chunkBuilder.createTextChunk)(node, inlineStyle, inEntity);
  }

  if (nodeName === 'br') {
    return { chunk: (0, _chunkBuilder.getSoftNewlineChunk)() };
  }

  if (nodeName === 'img' && node instanceof HTMLImageElement) {
    var _entityConfig = {};
    _entityConfig.src = node.getAttribute ? node.getAttribute('src') || node.src : node.src;
    _entityConfig.alt = node.alt;
    _entityConfig.height = node.style.height;
    _entityConfig.width = node.style.width;
    if (node.style.float) {
      _entityConfig.alignment = node.style.float;
    }
    var _entityId2 = _draftJs.Entity.__create('IMAGE', 'MUTABLE', _entityConfig);
    return { chunk: (0, _chunkBuilder.getAtomicBlockChunk)(_entityId2) };
  }

  if (nodeName === 'video' && node instanceof HTMLVideoElement) {
    var _entityConfig2 = {};
    _entityConfig2.controls = true;
    _entityConfig2.src = node.getAttribute ? node.getAttribute('src') || node.src : node.src;
    _entityConfig2.alt = node.alt;
    _entityConfig2.height = node.style.height;
    _entityConfig2.width = node.style.width;
    if (node.style.float) {
      _entityConfig2.alignment = node.style.float;
    }
    var _entityId3 = _draftJs.Entity.__create('VIDEO', 'MUTABLE', _entityConfig2);
    return { chunk: (0, _chunkBuilder.getAtomicBlockChunk)(_entityId3) };
  }

  if (nodeName === 'iframe' && node instanceof HTMLIFrameElement) {
    var _entityConfig3 = {};
    _entityConfig3.src = node.getAttribute ? node.getAttribute('src') || node.src : node.src;
    _entityConfig3.height = node.height;
    _entityConfig3.width = node.width;
    var _entityId4 = _draftJs.Entity.__create('EMBEDDED_LINK', 'MUTABLE', _entityConfig3);
    return { chunk: (0, _chunkBuilder.getAtomicBlockChunk)(_entityId4) };
  }

  var blockType = (0, _getBlockTypeForTag2.default)(nodeName, lastList);

  var chunk = void 0;
  if (blockType) {
    if (nodeName === 'ul' || nodeName === 'ol') {
      lastList = nodeName;
      depth += 1;
    } else {
      if (blockType !== 'unordered-list-item' && blockType !== 'ordered-list-item') {
        lastList = '';
        depth = -1;
      }
      if (!firstBlock) {
        chunk = (0, _chunkBuilder.getBlockDividerChunk)(blockType, depth, (0, _getBlockData2.default)(node));
      } else {
        chunk = (0, _chunkBuilder.getFirstBlockChunk)(blockType, (0, _getBlockData2.default)(node));
        firstBlock = false;
      }
    }
  }
  if (!chunk) {
    chunk = (0, _chunkBuilder.getEmptyChunk)();
  }

  inlineStyle = (0, _processInlineTag2.default)(nodeName, node, inlineStyle);

  var child = node.firstChild;
  while (child) {
    var _entityId5 = (0, _getEntityId2.default)(child);

    var _genFragment = genFragment(child, inlineStyle, depth, lastList, _entityId5 || inEntity, customChunkGenerator),
        generatedChunk = _genFragment.chunk;

    chunk = (0, _chunkBuilder.joinChunks)(chunk, generatedChunk);
    var sibling = child.nextSibling;
    child = sibling;
  }
  return { chunk: chunk };
}

function getChunkForHTML(html, customChunkGenerator) {
  var sanitizedHtml = html.trim().replace(REGEX_NBSP, SPACE);
  var safeBody = (0, _getSafeBodyFromHTML2.default)(sanitizedHtml);
  if (!safeBody) {
    return null;
  }
  firstBlock = true;

  var _genFragment2 = genFragment(safeBody, new _immutable.OrderedSet(), -1, '', undefined, customChunkGenerator),
      chunk = _genFragment2.chunk;

  return { chunk: chunk };
}

function htmlToDraft(html, customChunkGenerator) {
  var chunkData = getChunkForHTML(html, customChunkGenerator);
  if (chunkData) {
    var chunk = chunkData.chunk;

    var entityMap = new _immutable.OrderedMap({});
    chunk.entities && chunk.entities.forEach(function (entity) {
      if (entity) {
        entityMap = entityMap.set(entity, _draftJs.Entity.__get(entity));
      }
    });
    var start = 0;
    return {
      contentBlocks: chunk.text.split('\r').map(function (textBlock, ii) {
        var end = start + textBlock.length;
        var inlines = chunk && chunk.inlines.slice(start, end);
        var entities = chunk && chunk.entities.slice(start, end);
        var characterList = new _immutable.List(inlines.map(function (style, index) {
          var data = { style: style, entity: null };
          if (entities[index]) {
            data.entity = entities[index];
          }
          return _draftJs.CharacterMetadata.create(data);
        }));
        start = end;
        return new _draftJs.ContentBlock({
          key: (0, _draftJs.genKey)(),
          type: chunk && chunk.blocks[ii] && chunk.blocks[ii].type || 'unstyled',
          depth: chunk && chunk.blocks[ii] && chunk.blocks[ii].depth,
          data: chunk && chunk.blocks[ii] && chunk.blocks[ii].data || new _immutable.Map({}),
          text: textBlock,
          characterList: characterList
        });
      }),
      entityMap: entityMap
    };
  }
  return null;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getSafeBodyFromHTML = function getSafeBodyFromHTML(html) {
  var doc;
  var root = null;
  if (document.implementation && document.implementation.createHTMLDocument) {
    doc = document.implementation.createHTMLDocument('foo');
    doc.documentElement.innerHTML = html;
    root = doc.getElementsByTagName('body')[0];
  }
  return root;
};

exports.default = getSafeBodyFromHTML;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinChunks = exports.getUnstyledBlockChunk = exports.getAtomicBlockChunk = exports.getBlockDividerChunk = exports.getFirstBlockChunk = exports.getEmptyChunk = exports.getSoftNewlineChunk = exports.createTextChunk = exports.getWhitespaceChunk = undefined;

var _immutable = __webpack_require__(0);

var SPACE = ' ';
var MAX_DEPTH = 4;

var getWhitespaceChunk = exports.getWhitespaceChunk = function getWhitespaceChunk(entityId) {
  return {
    text: SPACE,
    inlines: [new _immutable.OrderedSet()],
    entities: [entityId],
    blocks: []
  };
};

var createTextChunk = exports.createTextChunk = function createTextChunk(node, inlineStyle, entityId) {
  var text = node.textContent;
  if (text.trim() === '') {
    return { chunk: getWhitespaceChunk(entityId) };
  }
  return {
    chunk: {
      text: text,
      inlines: Array(text.length).fill(inlineStyle),
      entities: Array(text.length).fill(entityId),
      blocks: []
    }
  };
};

var getSoftNewlineChunk = exports.getSoftNewlineChunk = function getSoftNewlineChunk() {
  return {
    text: '\n',
    inlines: [new _immutable.OrderedSet()],
    entities: new Array(1),
    blocks: []
  };
};

var getEmptyChunk = exports.getEmptyChunk = function getEmptyChunk() {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: []
  };
};

var getFirstBlockChunk = exports.getFirstBlockChunk = function getFirstBlockChunk(blockType, data) {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: [{
      type: blockType,
      depth: 0,
      data: data || new _immutable.Map({})
    }]
  };
};

var getBlockDividerChunk = exports.getBlockDividerChunk = function getBlockDividerChunk(blockType, depth, data) {
  return {
    text: '\r',
    inlines: [],
    entities: [],
    blocks: [{
      type: blockType,
      depth: Math.max(0, Math.min(MAX_DEPTH, depth)),
      data: data || new _immutable.Map({})
    }]
  };
};

var getAtomicBlockChunk = exports.getAtomicBlockChunk = function getAtomicBlockChunk(entityId) {
  return {
    text: '\r ',
    inlines: [new _immutable.OrderedSet()],
    entities: [entityId],
    blocks: [{
      type: 'atomic',
      depth: 0,
      data: new _immutable.Map({})
    }]
  };
};

var getUnstyledBlockChunk = exports.getUnstyledBlockChunk = function getUnstyledBlockChunk(entityId) {
  return {
    text: '\r ',
    inlines: [new _immutable.OrderedSet()],
    entities: [entityId],
    blocks: [{
      type: 'unstyled',
      depth: 0,
      data: new _immutable.Map({})
    }]
  };
};

var joinChunks = exports.joinChunks = function joinChunks(A, B) {
  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks)
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBlockTypeForTag;

var _immutable = __webpack_require__(0);

var blockRenderMap = new _immutable.Map({
  'header-one': {
    element: 'h1'
  },
  'header-two': {
    element: 'h2'
  },
  'header-three': {
    element: 'h3'
  },
  'header-four': {
    element: 'h4'
  },
  'header-five': {
    element: 'h5'
  },
  'header-six': {
    element: 'h6'
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: 'ul'
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: 'ol'
  },
  blockquote: {
    element: 'blockquote'
  },
  code: {
    element: 'pre'
  },
  atomic: {
    element: 'figure'
  },
  unstyled: {
    element: 'p',
    aliasedElements: ['div']
  }
});

function getBlockTypeForTag(tag, lastList) {
  var matchedTypes = blockRenderMap.filter(function (draftBlock) {
    return draftBlock.element === tag && (!draftBlock.wrapper || draftBlock.wrapper === lastList) || draftBlock.wrapper === tag || draftBlock.aliasedElements && draftBlock.aliasedElements.indexOf(tag) > -1;
  }).keySeq().toSet().toArray();

  if (matchedTypes.length === 1) {
    return matchedTypes[0];
  }
  return undefined;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processInlineTag;
var inlineTags = {
  code: 'CODE',
  del: 'STRIKETHROUGH',
  em: 'ITALIC',
  strong: 'BOLD',
  ins: 'UNDERLINE',
  sub: 'SUBSCRIPT',
  sup: 'SUPERSCRIPT'
};

function processInlineTag(tag, node, currentStyle) {
  var styleToCheck = inlineTags[tag];
  var inlineStyle = void 0;
  if (styleToCheck) {
    inlineStyle = currentStyle.add(styleToCheck).toOrderedSet();
  } else if (node instanceof HTMLElement) {
    inlineStyle = currentStyle;
    var htmlElement = node;
    inlineStyle = inlineStyle.withMutations(function (style) {
      var color = htmlElement.style.color;
      var backgroundColor = htmlElement.style.backgroundColor;
      var fontSize = htmlElement.style.fontSize;
      var fontFamily = htmlElement.style.fontFamily.replace(/^"|"$/g, '');
      if (color) {
        style.add('color-' + color.replace(/ /g, ''));
      }
      if (backgroundColor) {
        style.add('bgcolor-' + backgroundColor.replace(/ /g, ''));
      }
      if (fontSize) {
        style.add('fontsize-' + fontSize.replace(/px$/g, ''));
      }
      if (fontFamily) {
        style.add('fontfamily-' + fontFamily);
      }
    }).toOrderedSet();
  }
  return inlineStyle;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBlockData;

var _immutable = __webpack_require__(0);

function getBlockData(node) {
  if (node.style.textAlign) {
    return new _immutable.Map({
      'text-align': node.style.textAlign
    });
  }
  return undefined;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = __webpack_require__(1);

var getEntityId = function getEntityId(node) {
  var entityId = undefined;
  if (node instanceof HTMLAnchorElement) {
    var entityConfig = {};
    if (node.dataset && node.dataset.mention !== undefined) {
      entityConfig.url = node.href;
      entityConfig.text = node.innerHTML;
      entityConfig.value = node.dataset.value;
      entityId = _draftJs.Entity.__create('MENTION', 'IMMUTABLE', entityConfig);
    } else {
      entityConfig.url = node.getAttribute ? node.getAttribute('href') || node.href : node.href;
      entityConfig.title = node.innerHTML;
      entityConfig.targetOption = node.target;
      entityId = _draftJs.Entity.__create('LINK', 'MUTABLE', entityConfig);
    }
  }
  return entityId;
};

exports.default = getEntityId;

/***/ })
/******/ ]);
});
//# sourceMappingURL=html-to-draftjs.js.map