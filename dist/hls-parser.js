(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HLS"] = factory();
	else
		root["HLS"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! Copyright Kuu Miyazaki. SPDX-License-Identifier: MIT */
var _require = __webpack_require__(/*! ./utils */ "./utils.js"),
  getOptions = _require.getOptions,
  setOptions = _require.setOptions;
var parse = __webpack_require__(/*! ./parse */ "./parse.js");
var stringify = __webpack_require__(/*! ./stringify */ "./stringify.js");
var types = __webpack_require__(/*! ./types */ "./types.js");
module.exports = {
  parse: parse,
  stringify: stringify,
  types: types,
  getOptions: getOptions,
  setOptions: setOptions
};

/***/ }),

/***/ "./parse.js":
/*!******************!*\
  !*** ./parse.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var utils = __webpack_require__(/*! ./utils */ "./utils.js");
var _require = __webpack_require__(/*! ./types */ "./types.js"),
  Rendition = _require.Rendition,
  Variant = _require.Variant,
  SessionData = _require.SessionData,
  Key = _require.Key,
  MediaInitializationSection = _require.MediaInitializationSection,
  DateRange = _require.DateRange,
  SpliceInfo = _require.SpliceInfo,
  MasterPlaylist = _require.MasterPlaylist,
  MediaPlaylist = _require.MediaPlaylist,
  Segment = _require.Segment,
  PartialSegment = _require.PartialSegment,
  PrefetchSegment = _require.PrefetchSegment,
  RenditionReport = _require.RenditionReport;
function unquote(str) {
  return utils.trim(str, '"');
}
function getTagCategory(tagName) {
  switch (tagName) {
    case 'EXTM3U':
    case 'EXT-X-VERSION':
      return 'Basic';
    case 'EXTINF':
    case 'EXT-X-BYTERANGE':
    case 'EXT-X-DISCONTINUITY':
    case 'EXT-X-PREFETCH-DISCONTINUITY':
    case 'EXT-X-KEY':
    case 'EXT-X-MAP':
    case 'EXT-X-PROGRAM-DATE-TIME':
    case 'EXT-X-DATERANGE':
    case 'EXT-X-CUE-OUT':
    case 'EXT-X-CUE-IN':
    case 'EXT-X-CUE-OUT-CONT':
    case 'EXT-X-CUE':
    case 'EXT-OATCLS-SCTE35':
    case 'EXT-X-ASSET':
    case 'EXT-X-SCTE35':
    case 'EXT-X-PART':
    case 'EXT-X-PRELOAD-HINT':
      return 'Segment';
    case 'EXT-X-TARGETDURATION':
    case 'EXT-X-MEDIA-SEQUENCE':
    case 'EXT-X-DISCONTINUITY-SEQUENCE':
    case 'EXT-X-ENDLIST':
    case 'EXT-X-PLAYLIST-TYPE':
    case 'EXT-X-I-FRAMES-ONLY':
    case 'EXT-X-SERVER-CONTROL':
    case 'EXT-X-PART-INF':
    case 'EXT-X-PREFETCH':
    case 'EXT-X-RENDITION-REPORT':
    case 'EXT-X-SKIP':
      return 'MediaPlaylist';
    case 'EXT-X-MEDIA':
    case 'EXT-X-STREAM-INF':
    case 'EXT-X-I-FRAME-STREAM-INF':
    case 'EXT-X-SESSION-DATA':
    case 'EXT-X-SESSION-KEY':
      return 'MasterPlaylist';
    case 'EXT-X-INDEPENDENT-SEGMENTS':
    case 'EXT-X-START':
      return 'MediaorMasterPlaylist';
    default:
      return 'Unknown';
  }
}
function parseEXTINF(param) {
  var pair = utils.splitAt(param, ',');
  return {
    duration: utils.toNumber(pair[0]),
    title: decodeURIComponent(escape(pair[1]))
  };
}
function parseBYTERANGE(param) {
  var pair = utils.splitAt(param, '@');
  return {
    length: utils.toNumber(pair[0]),
    offset: pair[1] ? utils.toNumber(pair[1]) : -1
  };
}
function parseResolution(str) {
  var pair = utils.splitAt(str, 'x');
  return {
    width: utils.toNumber(pair[0]),
    height: utils.toNumber(pair[1])
  };
}
function parseAllowedCpc(str) {
  var message = 'ALLOWED-CPC: Each entry must consit of KEYFORMAT and Content Protection Configuration';
  var list = str.split(',');
  if (list.length === 0) {
    utils.INVALIDPLAYLIST(message);
  }
  var allowedCpcList = [];
  var _iterator = _createForOfIteratorHelper(list),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var _utils$splitAt = utils.splitAt(item, ':'),
        _utils$splitAt2 = _slicedToArray(_utils$splitAt, 2),
        format = _utils$splitAt2[0],
        cpcText = _utils$splitAt2[1];
      if (!format || !cpcText) {
        utils.INVALIDPLAYLIST(message);
        continue;
      }
      allowedCpcList.push({
        format: format,
        cpcList: cpcText.split('/')
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return allowedCpcList;
}
function parseIV(str) {
  var iv = utils.hexToByteSequence(str);
  if (iv.length !== 16) {
    utils.INVALIDPLAYLIST('IV must be a 128-bit unsigned integer');
  }
  return iv;
}
function parseUserAttribute(str) {
  if (str.startsWith('"')) {
    return unquote(str);
  }
  if (str.startsWith('0x') || str.startsWith('0X')) {
    return utils.hexToByteSequence(str);
  }
  return utils.toNumber(str);
}
function setCompatibleVersionOfKey(params, attributes) {
  if (attributes['IV'] && params.compatibleVersion < 2) {
    params.compatibleVersion = 2;
  }
  if ((attributes['KEYFORMAT'] || attributes['KEYFORMATVERSIONS']) && params.compatibleVersion < 5) {
    params.compatibleVersion = 5;
  }
}
function parseAttributeList(param) {
  var attributes = {};
  var _iterator2 = _createForOfIteratorHelper(utils.splitByCommaWithPreservingQuotes(param)),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var item = _step2.value;
      var _utils$splitAt3 = utils.splitAt(item, '='),
        _utils$splitAt4 = _slicedToArray(_utils$splitAt3, 2),
        key = _utils$splitAt4[0],
        value = _utils$splitAt4[1];
      var val = unquote(value);
      switch (key) {
        case 'URI':
          attributes[key] = val;
          break;
        case 'START-DATE':
        case 'END-DATE':
          attributes[key] = new Date(val);
          break;
        case 'IV':
          attributes[key] = parseIV(val);
          break;
        case 'BYTERANGE':
          attributes[key] = parseBYTERANGE(val);
          break;
        case 'RESOLUTION':
          attributes[key] = parseResolution(val);
          break;
        case 'ALLOWED-CPC':
          attributes[key] = parseAllowedCpc(val);
          break;
        case 'END-ON-NEXT':
        case 'DEFAULT':
        case 'AUTOSELECT':
        case 'FORCED':
        case 'PRECISE':
        case 'CAN-BLOCK-RELOAD':
        case 'INDEPENDENT':
        case 'GAP':
          attributes[key] = val === 'YES';
          break;
        case 'DURATION':
        case 'PLANNED-DURATION':
        case 'BANDWIDTH':
        case 'AVERAGE-BANDWIDTH':
        case 'FRAME-RATE':
        case 'TIME-OFFSET':
        case 'CAN-SKIP-UNTIL':
        case 'HOLD-BACK':
        case 'PART-HOLD-BACK':
        case 'PART-TARGET':
        case 'BYTERANGE-START':
        case 'BYTERANGE-LENGTH':
        case 'LAST-MSN':
        case 'LAST-PART':
        case 'SKIPPED-SEGMENTS':
        case 'SCORE':
          attributes[key] = utils.toNumber(val);
          break;
        default:
          if (key.startsWith('SCTE35-')) {
            attributes[key] = utils.hexToByteSequence(val);
          } else if (key.startsWith('X-')) {
            attributes[key] = parseUserAttribute(value);
          } else {
            if (key === 'VIDEO-RANGE' && val !== 'SDR' && val !== 'HLG' && val !== 'PQ') {
              utils.INVALIDPLAYLIST("VIDEO-RANGE: unknown value \"".concat(val, "\""));
            }
            attributes[key] = val;
          }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return attributes;
}
function parseTagParam(name, param) {
  switch (name) {
    case 'EXTM3U':
    case 'EXT-X-DISCONTINUITY':
    case 'EXT-X-ENDLIST':
    case 'EXT-X-I-FRAMES-ONLY':
    case 'EXT-X-INDEPENDENT-SEGMENTS':
    case 'EXT-X-CUE-IN':
      return [null, null];
    case 'EXT-X-VERSION':
    case 'EXT-X-TARGETDURATION':
    case 'EXT-X-MEDIA-SEQUENCE':
    case 'EXT-X-DISCONTINUITY-SEQUENCE':
      return [utils.toNumber(param), null];
    case 'EXT-X-CUE-OUT':
      // For backwards compatibility: attributes list is optional,
      // if only a number is found, use it as the duration
      if (!Number.isNaN(Number(param))) {
        return [utils.toNumber(param), null];
      }
      // If attributes are found, parse them out (i.e. DURATION)
      return [null, parseAttributeList(param)];
    case 'EXT-X-KEY':
    case 'EXT-X-MAP':
    case 'EXT-X-DATERANGE':
    case 'EXT-X-MEDIA':
    case 'EXT-X-STREAM-INF':
    case 'EXT-X-I-FRAME-STREAM-INF':
    case 'EXT-X-SESSION-DATA':
    case 'EXT-X-SESSION-KEY':
    case 'EXT-X-START':
    case 'EXT-X-SERVER-CONTROL':
    case 'EXT-X-PART-INF':
    case 'EXT-X-PART':
    case 'EXT-X-PRELOAD-HINT':
    case 'EXT-X-RENDITION-REPORT':
    case 'EXT-X-SKIP':
      return [null, parseAttributeList(param)];
    case 'EXTINF':
      return [parseEXTINF(param), null];
    case 'EXT-X-BYTERANGE':
      return [parseBYTERANGE(param), null];
    case 'EXT-X-PROGRAM-DATE-TIME':
      return [new Date(param), null];
    case 'EXT-X-PLAYLIST-TYPE':
      return [param, null];
    // <EVENT|VOD>
    default:
      return [param, null];
    // Unknown tag
  }
}

function MIXEDTAGS() {
  utils.INVALIDPLAYLIST("The file contains both media and master playlist tags.");
}
function splitTag(line) {
  var index = line.indexOf(':');
  if (index === -1) {
    return [line.slice(1).trim(), null];
  }
  return [line.slice(1, index).trim(), line.slice(index + 1).trim()];
}
function parseRendition(_ref) {
  var attributes = _ref.attributes;
  var rendition = new Rendition({
    type: attributes['TYPE'],
    uri: attributes['URI'],
    groupId: attributes['GROUP-ID'],
    language: attributes['LANGUAGE'],
    assocLanguage: attributes['ASSOC-LANGUAGE'],
    name: attributes['NAME'],
    isDefault: attributes['DEFAULT'],
    autoselect: attributes['AUTOSELECT'],
    forced: attributes['FORCED'],
    instreamId: attributes['INSTREAM-ID'],
    characteristics: attributes['CHARACTERISTICS'],
    channels: attributes['CHANNELS']
  });
  return rendition;
}
function checkRedundantRendition(renditions, rendition) {
  var defaultFound = false;
  var _iterator3 = _createForOfIteratorHelper(renditions),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var item = _step3.value;
      if (item.name === rendition.name) {
        return 'All EXT-X-MEDIA tags in the same Group MUST have different NAME attributes.';
      }
      if (item.isDefault) {
        defaultFound = true;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  if (defaultFound && rendition.isDefault) {
    return 'EXT-X-MEDIA A Group MUST NOT have more than one member with a DEFAULT attribute of YES.';
  }
  return '';
}
function addRendition(variant, line, type) {
  var rendition = parseRendition(line);
  var renditions = variant[utils.camelify(type)];
  var errorMessage = checkRedundantRendition(renditions, rendition);
  if (errorMessage) {
    utils.INVALIDPLAYLIST(errorMessage);
  }
  renditions.push(rendition);
  if (rendition.isDefault) {
    variant.currentRenditions[utils.camelify(type)] = renditions.length - 1;
  }
}
function matchTypes(attrs, variant, params) {
  var _loop = function _loop() {
    var type = _arr2[_i2];
    if (type === 'CLOSED-CAPTIONS' && attrs[type] === 'NONE') {
      params.isClosedCaptionsNone = true;
      variant.closedCaptions = [];
    } else if (attrs[type] && !variant[utils.camelify(type)].some(function (item) {
      return item.groupId === attrs[type];
    })) {
      utils.INVALIDPLAYLIST("".concat(type, " attribute MUST match the value of the GROUP-ID attribute of an EXT-X-MEDIA tag whose TYPE attribute is ").concat(type, "."));
    }
  };
  for (var _i2 = 0, _arr2 = ['AUDIO', 'VIDEO', 'SUBTITLES', 'CLOSED-CAPTIONS']; _i2 < _arr2.length; _i2++) {
    _loop();
  }
}
function parseVariant(lines, variantAttrs, uri, iFrameOnly, params) {
  var variant = new Variant({
    uri: uri,
    bandwidth: variantAttrs['BANDWIDTH'],
    averageBandwidth: variantAttrs['AVERAGE-BANDWIDTH'],
    score: variantAttrs['SCORE'],
    codecs: variantAttrs['CODECS'],
    resolution: variantAttrs['RESOLUTION'],
    frameRate: variantAttrs['FRAME-RATE'],
    hdcpLevel: variantAttrs['HDCP-LEVEL'],
    allowedCpc: variantAttrs['ALLOWED-CPC'],
    videoRange: variantAttrs['VIDEO-RANGE'],
    stableVariantId: variantAttrs['STABLE-VARIANT-ID']
  });
  var _iterator4 = _createForOfIteratorHelper(lines),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var line = _step4.value;
      if (line.name === 'EXT-X-MEDIA') {
        var renditionAttrs = line.attributes;
        var renditionType = renditionAttrs['TYPE'];
        if (!renditionType || !renditionAttrs['GROUP-ID']) {
          utils.INVALIDPLAYLIST('EXT-X-MEDIA TYPE attribute is REQUIRED.');
        }
        if (variantAttrs[renditionType] === renditionAttrs['GROUP-ID']) {
          addRendition(variant, line, renditionType);
          if (renditionType === 'CLOSED-CAPTIONS') {
            var _iterator5 = _createForOfIteratorHelper(variant.closedCaptions),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var instreamId = _step5.value.instreamId;
                if (instreamId && instreamId.startsWith('SERVICE') && params.compatibleVersion < 7) {
                  params.compatibleVersion = 7;
                  break;
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        }
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  matchTypes(variantAttrs, variant, params);
  variant.isIFrameOnly = iFrameOnly;
  return variant;
}
function sameKey(key1, key2) {
  if (key1.method !== key2.method) {
    return false;
  }
  if (key1.uri !== key2.uri) {
    return false;
  }
  if (key1.iv) {
    if (!key2.iv) {
      return false;
    }
    if (key1.iv.length !== key2.iv.length) {
      return false;
    }
    for (var i = 0; i < key1.iv.length; i++) {
      if (key1.iv[i] !== key2.iv[i]) {
        return false;
      }
    }
  } else if (key2.iv) {
    return false;
  }
  if (key1.format !== key2.format) {
    return false;
  }
  if (key1.formatVersion !== key2.formatVersion) {
    return false;
  }
  return true;
}
function parseMasterPlaylist(lines, params) {
  var playlist = new MasterPlaylist();
  var variantIsScored = false;
  var _iterator6 = _createForOfIteratorHelper(lines.entries()),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _step6$value = _slicedToArray(_step6.value, 2),
        index = _step6$value[0],
        _step6$value$ = _step6$value[1],
        name = _step6$value$.name,
        value = _step6$value$.value,
        attributes = _step6$value$.attributes;
      if (name === 'EXT-X-VERSION') {
        playlist.version = value;
      } else if (name === 'EXT-X-STREAM-INF') {
        var uri = lines[index + 1];
        if (typeof uri !== 'string' || uri.startsWith('#EXT')) {
          utils.INVALIDPLAYLIST('EXT-X-STREAM-INF must be followed by a URI line');
        }
        var _variant2 = parseVariant(lines, attributes, uri, false, params);
        if (_variant2) {
          if (typeof _variant2.score === 'number') {
            variantIsScored = true;
            if (_variant2.score < 0) {
              utils.INVALIDPLAYLIST('SCORE attribute on EXT-X-STREAM-INF must be positive decimal-floating-point number.');
            }
          }
          playlist.variants.push(_variant2);
        }
      } else if (name === 'EXT-X-I-FRAME-STREAM-INF') {
        var _variant3 = parseVariant(lines, attributes, attributes.URI, true, params);
        if (_variant3) {
          playlist.variants.push(_variant3);
        }
      } else if (name === 'EXT-X-SESSION-DATA') {
        (function () {
          var sessionData = new SessionData({
            id: attributes['DATA-ID'],
            value: attributes['VALUE'],
            uri: attributes['URI'],
            language: attributes['LANGUAGE']
          });
          if (playlist.sessionDataList.some(function (item) {
            return item.id === sessionData.id && item.language === sessionData.language;
          })) {
            utils.INVALIDPLAYLIST('A Playlist MUST NOT contain more than one EXT-X-SESSION-DATA tag with the same DATA-ID attribute and the same LANGUAGE attribute.');
          }
          playlist.sessionDataList.push(sessionData);
        })();
      } else if (name === 'EXT-X-SESSION-KEY') {
        (function () {
          if (attributes['METHOD'] === 'NONE') {
            utils.INVALIDPLAYLIST('EXT-X-SESSION-KEY: The value of the METHOD attribute MUST NOT be NONE');
          }
          var sessionKey = new Key({
            method: attributes['METHOD'],
            uri: attributes['URI'],
            iv: attributes['IV'],
            format: attributes['KEYFORMAT'],
            formatVersion: attributes['KEYFORMATVERSIONS']
          });
          if (playlist.sessionKeyList.some(function (item) {
            return sameKey(item, sessionKey);
          })) {
            utils.INVALIDPLAYLIST('A Master Playlist MUST NOT contain more than one EXT-X-SESSION-KEY tag with the same METHOD, URI, IV, KEYFORMAT, and KEYFORMATVERSIONS attribute values.');
          }
          setCompatibleVersionOfKey(params, attributes);
          playlist.sessionKeyList.push(sessionKey);
        })();
      } else if (name === 'EXT-X-INDEPENDENT-SEGMENTS') {
        if (playlist.independentSegments) {
          utils.INVALIDPLAYLIST('EXT-X-INDEPENDENT-SEGMENTS tag MUST NOT appear more than once in a Playlist');
        }
        playlist.independentSegments = true;
      } else if (name === 'EXT-X-START') {
        if (playlist.start) {
          utils.INVALIDPLAYLIST('EXT-X-START tag MUST NOT appear more than once in a Playlist');
        }
        if (typeof attributes['TIME-OFFSET'] !== 'number') {
          utils.INVALIDPLAYLIST('EXT-X-START: TIME-OFFSET attribute is REQUIRED');
        }
        playlist.start = {
          offset: attributes['TIME-OFFSET'],
          precise: attributes['PRECISE'] || false
        };
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  if (variantIsScored) {
    var _iterator7 = _createForOfIteratorHelper(playlist.variants),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var variant = _step7.value;
        if (typeof variant.score !== 'number') {
          utils.INVALIDPLAYLIST('If any Variant Stream contains the SCORE attribute, then all Variant Streams in the Master Playlist SHOULD have a SCORE attribute');
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }
  if (params.isClosedCaptionsNone) {
    var _iterator8 = _createForOfIteratorHelper(playlist.variants),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var _variant = _step8.value;
        if (_variant.closedCaptions.length > 0) {
          utils.INVALIDPLAYLIST('If there is a variant with CLOSED-CAPTIONS attribute of NONE, all EXT-X-STREAM-INF tags MUST have this attribute with a value of NONE');
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  }
  return playlist;
}
function parseSegment(lines, uri, start, end, mediaSequenceNumber, discontinuitySequence, params) {
  var segment = new Segment({
    uri: uri,
    mediaSequenceNumber: mediaSequenceNumber,
    discontinuitySequence: discontinuitySequence
  });
  var mapHint = false;
  var partHint = false;
  for (var i = start; i <= end; i++) {
    var _lines$i = lines[i],
      name = _lines$i.name,
      value = _lines$i.value,
      attributes = _lines$i.attributes;
    if (name === 'EXTINF') {
      if (!Number.isInteger(value.duration) && params.compatibleVersion < 3) {
        params.compatibleVersion = 3;
      }
      if (Math.round(value.duration) > params.targetDuration) {
        utils.INVALIDPLAYLIST('EXTINF duration, when rounded to the nearest integer, MUST be less than or equal to the target duration');
      }
      segment.duration = value.duration;
      segment.title = value.title;
    } else if (name === 'EXT-X-BYTERANGE') {
      if (params.compatibleVersion < 4) {
        params.compatibleVersion = 4;
      }
      segment.byterange = value;
    } else if (name === 'EXT-X-DISCONTINUITY') {
      if (segment.parts.length > 0) {
        utils.INVALIDPLAYLIST('EXT-X-DISCONTINUITY must appear before the first EXT-X-PART tag of the Parent Segment.');
      }
      segment.discontinuity = true;
    } else if (name === 'EXT-X-KEY') {
      if (segment.parts.length > 0) {
        utils.INVALIDPLAYLIST('EXT-X-KEY must appear before the first EXT-X-PART tag of the Parent Segment.');
      }
      setCompatibleVersionOfKey(params, attributes);
      segment.key = new Key({
        method: attributes['METHOD'],
        uri: attributes['URI'],
        iv: attributes['IV'],
        format: attributes['KEYFORMAT'],
        formatVersion: attributes['KEYFORMATVERSIONS']
      });
    } else if (name === 'EXT-X-MAP') {
      if (segment.parts.length > 0) {
        utils.INVALIDPLAYLIST('EXT-X-MAP must appear before the first EXT-X-PART tag of the Parent Segment.');
      }
      if (params.compatibleVersion < 5) {
        params.compatibleVersion = 5;
      }
      params.hasMap = true;
      segment.map = new MediaInitializationSection({
        uri: attributes['URI'],
        byterange: attributes['BYTERANGE']
      });
    } else if (name === 'EXT-X-PROGRAM-DATE-TIME') {
      segment.programDateTime = value;
    } else if (name === 'EXT-X-DATERANGE') {
      var attrs = {};
      for (var _i3 = 0, _Object$keys = Object.keys(attributes); _i3 < _Object$keys.length; _i3++) {
        var key = _Object$keys[_i3];
        if (key.startsWith('SCTE35-') || key.startsWith('X-')) {
          attrs[key] = attributes[key];
        }
      }
      segment.dateRange = new DateRange({
        id: attributes['ID'],
        classId: attributes['CLASS'],
        start: attributes['START-DATE'],
        end: attributes['END-DATE'],
        duration: attributes['DURATION'],
        plannedDuration: attributes['PLANNED-DURATION'],
        endOnNext: attributes['END-ON-NEXT'],
        attributes: attrs
      });
    } else if (name === 'EXT-X-CUE-OUT') {
      segment.markers.push(new SpliceInfo({
        type: 'OUT',
        duration: attributes && attributes.DURATION || value
      }));
    } else if (name === 'EXT-X-CUE-IN') {
      segment.markers.push(new SpliceInfo({
        type: 'IN'
      }));
    } else if (name === 'EXT-X-CUE-OUT-CONT' || name === 'EXT-X-CUE' || name === 'EXT-OATCLS-SCTE35' || name === 'EXT-X-ASSET' || name === 'EXT-X-SCTE35') {
      segment.markers.push(new SpliceInfo({
        type: 'RAW',
        tagName: name,
        value: value
      }));
    } else if (name === 'EXT-X-PRELOAD-HINT' && !attributes['TYPE']) {
      utils.INVALIDPLAYLIST('EXT-X-PRELOAD-HINT: TYPE attribute is mandatory');
    } else if (name === 'EXT-X-PRELOAD-HINT' && attributes['TYPE'] === 'PART' && partHint) {
      utils.INVALIDPLAYLIST('Servers should not add more than one EXT-X-PRELOAD-HINT tag with the same TYPE attribute to a Playlist.');
    } else if ((name === 'EXT-X-PART' || name === 'EXT-X-PRELOAD-HINT') && !attributes['URI']) {
      utils.INVALIDPLAYLIST('EXT-X-PART / EXT-X-PRELOAD-HINT: URI attribute is mandatory');
    } else if (name === 'EXT-X-PRELOAD-HINT' && attributes['TYPE'] === 'MAP') {
      if (mapHint) {
        utils.INVALIDPLAYLIST('Servers should not add more than one EXT-X-PRELOAD-HINT tag with the same TYPE attribute to a Playlist.');
      }
      mapHint = true;
      params.hasMap = true;
      segment.map = new MediaInitializationSection({
        hint: true,
        uri: attributes['URI'],
        byterange: {
          length: attributes['BYTERANGE-LENGTH'],
          offset: attributes['BYTERANGE-START'] || 0
        }
      });
    } else if (name === 'EXT-X-PART' || name === 'EXT-X-PRELOAD-HINT' && attributes['TYPE'] === 'PART') {
      if (name === 'EXT-X-PART' && !attributes['DURATION']) {
        utils.INVALIDPLAYLIST('EXT-X-PART: DURATION attribute is mandatory');
      }
      if (name === 'EXT-X-PRELOAD-HINT') {
        partHint = true;
      }
      var partialSegment = new PartialSegment({
        hint: name === 'EXT-X-PRELOAD-HINT',
        uri: attributes['URI'],
        byterange: name === 'EXT-X-PART' ? attributes['BYTERANGE'] : {
          length: attributes['BYTERANGE-LENGTH'],
          offset: attributes['BYTERANGE-START'] || 0
        },
        duration: attributes['DURATION'],
        independent: attributes['INDEPENDENT'],
        gap: attributes['GAP']
      });
      segment.parts.push(partialSegment);
    }
  }
  return segment;
}
function parsePrefetchSegment(lines, uri, start, end, mediaSequenceNumber, discontinuitySequence, params) {
  var segment = new PrefetchSegment({
    uri: uri,
    mediaSequenceNumber: mediaSequenceNumber,
    discontinuitySequence: discontinuitySequence
  });
  for (var i = start; i <= end; i++) {
    var _lines$i2 = lines[i],
      name = _lines$i2.name,
      attributes = _lines$i2.attributes;
    if (name === 'EXTINF') {
      utils.INVALIDPLAYLIST('A prefetch segment must not be advertised with an EXTINF tag.');
    } else if (name === 'EXT-X-DISCONTINUITY') {
      utils.INVALIDPLAYLIST('A prefetch segment must not be advertised with an EXT-X-DISCONTINUITY tag.');
    } else if (name === 'EXT-X-PREFETCH-DISCONTINUITY') {
      segment.discontinuity = true;
    } else if (name === 'EXT-X-KEY') {
      setCompatibleVersionOfKey(params, attributes);
      segment.key = new Key({
        method: attributes['METHOD'],
        uri: attributes['URI'],
        iv: attributes['IV'],
        format: attributes['KEYFORMAT'],
        formatVersion: attributes['KEYFORMATVERSIONS']
      });
    } else if (name === 'EXT-X-MAP') {
      utils.INVALIDPLAYLIST('Prefetch segments must not be advertised with an EXT-X-MAP tag.');
    }
  }
  return segment;
}
function parseMediaPlaylist(lines, params) {
  var playlist = new MediaPlaylist();
  var segmentStart = -1;
  var mediaSequence = 0;
  var discontinuityFound = false;
  var prefetchFound = false;
  var discontinuitySequence = 0;
  var currentKey = null;
  var currentMap = null;
  var containsParts = false;
  var _iterator9 = _createForOfIteratorHelper(lines.entries()),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _step9$value = _slicedToArray(_step9.value, 2),
        index = _step9$value[0],
        line = _step9$value[1];
      var name = line.name,
        value = line.value,
        attributes = line.attributes,
        category = line.category;
      if (category === 'Segment') {
        if (segmentStart === -1) {
          segmentStart = index;
        }
        if (name === 'EXT-X-DISCONTINUITY') {
          discontinuityFound = true;
        }
        continue;
      }
      if (name === 'EXT-X-VERSION') {
        if (playlist.version === undefined) {
          playlist.version = value;
        } else {
          utils.INVALIDPLAYLIST('A Playlist file MUST NOT contain more than one EXT-X-VERSION tag.');
        }
      } else if (name === 'EXT-X-TARGETDURATION') {
        playlist.targetDuration = params.targetDuration = value;
      } else if (name === 'EXT-X-MEDIA-SEQUENCE') {
        if (playlist.segments.length > 0) {
          utils.INVALIDPLAYLIST('The EXT-X-MEDIA-SEQUENCE tag MUST appear before the first Media Segment in the Playlist.');
        }
        playlist.mediaSequenceBase = mediaSequence = value;
      } else if (name === 'EXT-X-DISCONTINUITY-SEQUENCE') {
        if (playlist.segments.length > 0) {
          utils.INVALIDPLAYLIST('The EXT-X-DISCONTINUITY-SEQUENCE tag MUST appear before the first Media Segment in the Playlist.');
        }
        if (discontinuityFound) {
          utils.INVALIDPLAYLIST('The EXT-X-DISCONTINUITY-SEQUENCE tag MUST appear before any EXT-X-DISCONTINUITY tag.');
        }
        playlist.discontinuitySequenceBase = discontinuitySequence = value;
      } else if (name === 'EXT-X-ENDLIST') {
        playlist.endlist = true;
      } else if (name === 'EXT-X-PLAYLIST-TYPE') {
        playlist.playlistType = value;
      } else if (name === 'EXT-X-I-FRAMES-ONLY') {
        if (params.compatibleVersion < 4) {
          params.compatibleVersion = 4;
        }
        playlist.isIFrame = true;
      } else if (name === 'EXT-X-INDEPENDENT-SEGMENTS') {
        if (playlist.independentSegments) {
          utils.INVALIDPLAYLIST('EXT-X-INDEPENDENT-SEGMENTS tag MUST NOT appear more than once in a Playlist');
        }
        playlist.independentSegments = true;
      } else if (name === 'EXT-X-START') {
        if (playlist.start) {
          utils.INVALIDPLAYLIST('EXT-X-START tag MUST NOT appear more than once in a Playlist');
        }
        if (typeof attributes['TIME-OFFSET'] !== 'number') {
          utils.INVALIDPLAYLIST('EXT-X-START: TIME-OFFSET attribute is REQUIRED');
        }
        playlist.start = {
          offset: attributes['TIME-OFFSET'],
          precise: attributes['PRECISE'] || false
        };
      } else if (name === 'EXT-X-SERVER-CONTROL') {
        if (!attributes['CAN-BLOCK-RELOAD']) {
          utils.INVALIDPLAYLIST('EXT-X-SERVER-CONTROL: CAN-BLOCK-RELOAD=YES is mandatory for Low-Latency HLS');
        }
        playlist.lowLatencyCompatibility = {
          canBlockReload: attributes['CAN-BLOCK-RELOAD'],
          canSkipUntil: attributes['CAN-SKIP-UNTIL'],
          holdBack: attributes['HOLD-BACK'],
          partHoldBack: attributes['PART-HOLD-BACK']
        };
      } else if (name === 'EXT-X-PART-INF') {
        if (!attributes['PART-TARGET']) {
          utils.INVALIDPLAYLIST('EXT-X-PART-INF: PART-TARGET attribute is mandatory');
        }
        playlist.partTargetDuration = attributes['PART-TARGET'];
      } else if (name === 'EXT-X-RENDITION-REPORT') {
        if (!attributes['URI']) {
          utils.INVALIDPLAYLIST('EXT-X-RENDITION-REPORT: URI attribute is mandatory');
        }
        if (attributes['URI'].search(/^[a-z]+:/) === 0) {
          utils.INVALIDPLAYLIST('EXT-X-RENDITION-REPORT: URI must be relative to the playlist uri');
        }
        playlist.renditionReports.push(new RenditionReport({
          uri: attributes['URI'],
          lastMSN: attributes['LAST-MSN'],
          lastPart: attributes['LAST-PART']
        }));
      } else if (name === 'EXT-X-SKIP') {
        if (!attributes['SKIPPED-SEGMENTS']) {
          utils.INVALIDPLAYLIST('EXT-X-SKIP: SKIPPED-SEGMENTS attribute is mandatory');
        }
        if (params.compatibleVersion < 9) {
          params.compatibleVersion = 9;
        }
        playlist.skip = attributes['SKIPPED-SEGMENTS'];
        mediaSequence += playlist.skip;
      } else if (name === 'EXT-X-PREFETCH') {
        var _segment = parsePrefetchSegment(lines, value, segmentStart === -1 ? index : segmentStart, index - 1, mediaSequence++, discontinuitySequence, params);
        if (_segment) {
          if (_segment.discontinuity) {
            _segment.discontinuitySequence++;
            discontinuitySequence = _segment.discontinuitySequence;
          }
          if (_segment.key) {
            currentKey = _segment.key;
          } else {
            _segment.key = currentKey;
          }
          playlist.prefetchSegments.push(_segment);
        }
        prefetchFound = true;
        segmentStart = -1;
      } else if (typeof line === 'string') {
        // uri
        if (segmentStart === -1) {
          utils.INVALIDPLAYLIST('A URI line is not preceded by any segment tags');
        }
        if (!playlist.targetDuration) {
          utils.INVALIDPLAYLIST('The EXT-X-TARGETDURATION tag is REQUIRED');
        }
        if (prefetchFound) {
          utils.INVALIDPLAYLIST('These segments must appear after all complete segments.');
        }
        var _segment2 = parseSegment(lines, line, segmentStart, index - 1, mediaSequence++, discontinuitySequence, params);
        if (_segment2) {
          var _addSegment = addSegment(playlist, _segment2, discontinuitySequence, currentKey, currentMap);
          var _addSegment2 = _slicedToArray(_addSegment, 3);
          discontinuitySequence = _addSegment2[0];
          currentKey = _addSegment2[1];
          currentMap = _addSegment2[2];
          if (!containsParts && _segment2.parts.length > 0) {
            containsParts = true;
          }
        }
        segmentStart = -1;
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  if (segmentStart !== -1) {
    var segment = parseSegment(lines, '', segmentStart, lines.length - 1, mediaSequence++, discontinuitySequence, params);
    if (segment) {
      var parts = segment.parts;
      if (parts.length > 0 && !playlist.endlist && !parts[parts.length - 1].hint) {
        utils.INVALIDPLAYLIST('If the Playlist contains EXT-X-PART tags and does not contain an EXT-X-ENDLIST tag, the Playlist must contain an EXT-X-PRELOAD-HINT tag with a TYPE=PART attribute');
      }
      addSegment(playlist, segment, currentKey, currentMap);
      if (!containsParts && segment.parts.length > 0) {
        containsParts = true;
      }
    }
  }
  checkDateRange(playlist.segments);
  if (playlist.lowLatencyCompatibility) {
    checkLowLatencyCompatibility(playlist, containsParts);
  }
  return playlist;
}
function addSegment(playlist, segment, discontinuitySequence, currentKey, currentMap) {
  var discontinuity = segment.discontinuity,
    key = segment.key,
    map = segment.map,
    byterange = segment.byterange,
    uri = segment.uri;
  if (discontinuity) {
    segment.discontinuitySequence = discontinuitySequence + 1;
  }
  if (!key) {
    segment.key = currentKey;
  }
  if (!map) {
    segment.map = currentMap;
  }
  if (byterange && byterange.offset === -1) {
    var segments = playlist.segments;
    if (segments.length > 0) {
      var prevSegment = segments[segments.length - 1];
      if (prevSegment.byterange && prevSegment.uri === uri) {
        byterange.offset = prevSegment.byterange.offset + prevSegment.byterange.length;
      } else {
        utils.INVALIDPLAYLIST('If offset of EXT-X-BYTERANGE is not present, a previous Media Segment MUST be a sub-range of the same media resource');
      }
    } else {
      utils.INVALIDPLAYLIST('If offset of EXT-X-BYTERANGE is not present, a previous Media Segment MUST appear in the Playlist file');
    }
  }
  playlist.segments.push(segment);
  return [segment.discontinuitySequence, segment.key, segment.map];
}
function checkDateRange(segments) {
  var earliestDates = new Map();
  var rangeList = new Map();
  var hasDateRange = false;
  var hasProgramDateTime = false;
  for (var i = segments.length - 1; i >= 0; i--) {
    var _segments$i = segments[i],
      programDateTime = _segments$i.programDateTime,
      dateRange = _segments$i.dateRange;
    if (programDateTime) {
      hasProgramDateTime = true;
    }
    if (dateRange && dateRange.start) {
      hasDateRange = true;
      if (dateRange.endOnNext && (dateRange.end || dateRange.duration)) {
        utils.INVALIDPLAYLIST('An EXT-X-DATERANGE tag with an END-ON-NEXT=YES attribute MUST NOT contain DURATION or END-DATE attributes.');
      }
      var start = dateRange.start.getTime();
      var duration = dateRange.duration || 0;
      if (dateRange.end && dateRange.duration) {
        if (start + duration * 1000 !== dateRange.end.getTime()) {
          utils.INVALIDPLAYLIST('END-DATE MUST be equal to the value of the START-DATE attribute plus the value of the DURATION');
        }
      }
      if (dateRange.endOnNext) {
        dateRange.end = earliestDates.get(dateRange.classId);
      }
      earliestDates.set(dateRange.classId, dateRange.start);
      var end = dateRange.end ? dateRange.end.getTime() : dateRange.start.getTime() + (dateRange.duration || 0) * 1000;
      var range = rangeList.get(dateRange.classId);
      if (range) {
        var _iterator10 = _createForOfIteratorHelper(range),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var entry = _step10.value;
            if (entry.start <= start && entry.end > start || entry.start >= start && entry.start < end) {
              utils.INVALIDPLAYLIST('DATERANGE tags with the same CLASS should not overlap');
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
        range.push({
          start: start,
          end: end
        });
      } else {
        rangeList.set(dateRange.classId, [{
          start: start,
          end: end
        }]);
      }
    }
  }
  if (hasDateRange && !hasProgramDateTime) {
    utils.INVALIDPLAYLIST('If a Playlist contains an EXT-X-DATERANGE tag, it MUST also contain at least one EXT-X-PROGRAM-DATE-TIME tag.');
  }
}
function checkLowLatencyCompatibility(_ref2, containsParts) {
  var lowLatencyCompatibility = _ref2.lowLatencyCompatibility,
    targetDuration = _ref2.targetDuration,
    partTargetDuration = _ref2.partTargetDuration,
    segments = _ref2.segments,
    renditionReports = _ref2.renditionReports;
  var canSkipUntil = lowLatencyCompatibility.canSkipUntil,
    holdBack = lowLatencyCompatibility.holdBack,
    partHoldBack = lowLatencyCompatibility.partHoldBack;
  if (canSkipUntil < targetDuration * 6) {
    utils.INVALIDPLAYLIST('The Skip Boundary must be at least six times the EXT-X-TARGETDURATION.');
  }
  // Its value is a floating-point number of seconds and .
  if (holdBack < targetDuration * 3) {
    utils.INVALIDPLAYLIST('HOLD-BACK must be at least three times the EXT-X-TARGETDURATION.');
  }
  if (containsParts) {
    if (partTargetDuration === undefined) {
      utils.INVALIDPLAYLIST('EXT-X-PART-INF is required if a Playlist contains one or more EXT-X-PART tags');
    }
    if (partHoldBack === undefined) {
      utils.INVALIDPLAYLIST('EXT-X-PART: PART-HOLD-BACK attribute is mandatory');
    }
    if (partHoldBack < partTargetDuration) {
      utils.INVALIDPLAYLIST('PART-HOLD-BACK must be at least PART-TARGET');
    }
    var _iterator11 = _createForOfIteratorHelper(segments.entries()),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _step11$value = _slicedToArray(_step11.value, 2),
          segmentIndex = _step11$value[0],
          parts = _step11$value[1].parts;
        if (parts.length > 0 && segmentIndex < segments.length - 3) {
          utils.INVALIDPLAYLIST('Remove EXT-X-PART tags from the Playlist after they are greater than three target durations from the end of the Playlist.');
        }
        var _iterator12 = _createForOfIteratorHelper(parts.entries()),
          _step12;
        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var _step12$value = _slicedToArray(_step12.value, 2),
              partIndex = _step12$value[0],
              duration = _step12$value[1].duration;
            if (duration === undefined) {
              continue;
            }
            if (duration > partTargetDuration) {
              utils.INVALIDPLAYLIST('PART-TARGET is the maximum duration of any Partial Segment');
            }
            if (partIndex < parts.length - 1 && duration < partTargetDuration * 0.85) {
              utils.INVALIDPLAYLIST('All Partial Segments except the last part of a segment must have a duration of at least 85% of PART-TARGET');
            }
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
  }
  var _iterator13 = _createForOfIteratorHelper(renditionReports),
    _step13;
  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var report = _step13.value;
      var lastSegment = segments[segments.length - 1];
      if (!report.lastMSN) {
        report.lastMSN = lastSegment.mediaSequenceNumber;
      }
      if (!report.lastPart && lastSegment.parts.length > 0) {
        report.lastPart = lastSegment.parts.length - 1;
      }
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }
}
function CHECKTAGCATEGORY(category, params) {
  if (category === 'Segment' || category === 'MediaPlaylist') {
    if (params.isMasterPlaylist === undefined) {
      params.isMasterPlaylist = false;
      return;
    }
    if (params.isMasterPlaylist) {
      MIXEDTAGS();
    }
    return;
  }
  if (category === 'MasterPlaylist') {
    if (params.isMasterPlaylist === undefined) {
      params.isMasterPlaylist = true;
      return;
    }
    if (params.isMasterPlaylist === false) {
      MIXEDTAGS();
    }
  }
  // category === 'Basic' or 'MediaorMasterPlaylist' or 'Unknown'
}

function parseTag(line, params) {
  var _splitTag = splitTag(line),
    _splitTag2 = _slicedToArray(_splitTag, 2),
    name = _splitTag2[0],
    param = _splitTag2[1];
  var category = getTagCategory(name);
  CHECKTAGCATEGORY(category, params);
  if (category === 'Unknown') {
    return null;
  }
  if (category === 'MediaPlaylist' && name !== 'EXT-X-RENDITION-REPORT' && name !== 'EXT-X-PREFETCH') {
    if (params.hash[name]) {
      utils.INVALIDPLAYLIST('There MUST NOT be more than one Media Playlist tag of each type in any Media Playlist');
    }
    params.hash[name] = true;
  }
  var _parseTagParam = parseTagParam(name, param),
    _parseTagParam2 = _slicedToArray(_parseTagParam, 2),
    value = _parseTagParam2[0],
    attributes = _parseTagParam2[1];
  return {
    name: name,
    category: category,
    value: value,
    attributes: attributes
  };
}
function lexicalParse(text, params) {
  var lines = [];
  var _iterator14 = _createForOfIteratorHelper(text.split('\n')),
    _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var l = _step14.value;
      // V8 has garbage collection issues when cleaning up substrings split from strings greater
      // than 13 characters so before we continue we need to safely copy over each line so that it
      // doesn't hold any reference to the containing string.
      var line = (' ' + l.trim()).slice(1);
      if (!line) {
        // empty line
        continue;
      }
      if (line.startsWith('#')) {
        if (line.startsWith('#EXT')) {
          // tag
          var tag = parseTag(line, params);
          if (tag) {
            lines.push(tag);
          }
        }
        // comment
        continue;
      }
      // uri
      lines.push(line);
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
  if (lines.length === 0 || lines[0].name !== 'EXTM3U') {
    utils.INVALIDPLAYLIST('The EXTM3U tag MUST be the first line.');
  }
  return lines;
}
function semanticParse(lines, params) {
  var playlist;
  if (params.isMasterPlaylist) {
    playlist = parseMasterPlaylist(lines, params);
  } else {
    playlist = parseMediaPlaylist(lines, params);
    if (!playlist.isIFrame && params.hasMap && params.compatibleVersion < 6) {
      params.compatibleVersion = 6;
    }
  }
  if (params.compatibleVersion > 1) {
    if (!playlist.version || playlist.version < params.compatibleVersion) {
      utils.INVALIDPLAYLIST("EXT-X-VERSION needs to be ".concat(params.compatibleVersion, " or higher."));
    }
  }
  return playlist;
}
function parse(text) {
  var params = {
    version: undefined,
    isMasterPlaylist: undefined,
    hasMap: false,
    targetDuration: 0,
    compatibleVersion: 1,
    isClosedCaptionsNone: false,
    hash: {}
  };
  var lines = lexicalParse(text, params);
  var playlist = semanticParse(lines, params);
  playlist.source = text;
  return playlist;
}
module.exports = parse;

/***/ }),

/***/ "./stringify.js":
/*!**********************!*\
  !*** ./stringify.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var utils = __webpack_require__(/*! ./utils */ "./utils.js");
var ALLOW_REDUNDANCY = ['#EXTINF', '#EXT-X-BYTERANGE', '#EXT-X-DISCONTINUITY', '#EXT-X-STREAM-INF', '#EXT-X-CUE-OUT', '#EXT-X-CUE-IN', '#EXT-X-KEY', '#EXT-X-MAP'];
var SKIP_IF_REDUNDANT = ['#EXT-X-MEDIA'];
var LineArray = /*#__PURE__*/function (_Array) {
  _inherits(LineArray, _Array);
  var _super = _createSuper(LineArray);
  function LineArray(baseUri) {
    var _this;
    _classCallCheck(this, LineArray);
    _this = _super.call(this);
    _this.baseUri = baseUri;
    return _this;
  }

  // @override
  _createClass(LineArray, [{
    key: "push",
    value: function push() {
      var _this2 = this;
      for (var _len = arguments.length, elems = new Array(_len), _key = 0; _key < _len; _key++) {
        elems[_key] = arguments[_key];
      }
      var _loop = function _loop() {
        var elem = _elems[_i];
        if (!elem.startsWith('#')) {
          _get(_getPrototypeOf(LineArray.prototype), "push", _this2).call(_this2, elem);
          return "continue";
        }
        if (ALLOW_REDUNDANCY.some(function (item) {
          return elem.startsWith(item);
        })) {
          _get(_getPrototypeOf(LineArray.prototype), "push", _this2).call(_this2, elem);
          return "continue";
        }
        if (_this2.includes(elem)) {
          if (SKIP_IF_REDUNDANT.some(function (item) {
            return elem.startsWith(item);
          })) {
            return "continue";
          }
          utils.INVALIDPLAYLIST("Redundant item (".concat(elem, ")"));
        }
        _get(_getPrototypeOf(LineArray.prototype), "push", _this2).call(_this2, elem);
      };
      // redundancy check
      for (var _i = 0, _elems = elems; _i < _elems.length; _i++) {
        var _ret = _loop();
        if (_ret === "continue") continue;
      }
    }
  }]);
  return LineArray;
}( /*#__PURE__*/_wrapNativeSuper(Array));
function buildDecimalFloatingNumber(num, fixed) {
  var roundFactor = 1000;
  if (fixed) {
    roundFactor = Math.pow(10, fixed);
  }
  var rounded = Math.round(num * roundFactor) / roundFactor;
  return fixed ? rounded.toFixed(fixed) : rounded;
}
function getNumberOfDecimalPlaces(num) {
  var str = num.toString(10);
  var index = str.indexOf('.');
  if (index === -1) {
    return 0;
  }
  return str.length - index - 1;
}
function buildMasterPlaylist(lines, playlist) {
  var _iterator = _createForOfIteratorHelper(playlist.sessionDataList),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var sessionData = _step.value;
      lines.push(buildSessionData(sessionData));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper(playlist.sessionKeyList),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var sessionKey = _step2.value;
      lines.push(buildKey(sessionKey, true));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var _iterator3 = _createForOfIteratorHelper(playlist.variants),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var variant = _step3.value;
      buildVariant(lines, variant);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}
function buildSessionData(sessionData) {
  var attrs = ["DATA-ID=\"".concat(sessionData.id, "\"")];
  if (sessionData.language) {
    attrs.push("LANGUAGE=\"".concat(sessionData.language, "\""));
  }
  if (sessionData.value) {
    attrs.push("VALUE=\"".concat(sessionData.value, "\""));
  } else if (sessionData.uri) {
    attrs.push("URI=\"".concat(sessionData.uri, "\""));
  }
  return "#EXT-X-SESSION-DATA:".concat(attrs.join(','));
}
function buildKey(key, isSessionKey) {
  var name = isSessionKey ? '#EXT-X-SESSION-KEY' : '#EXT-X-KEY';
  var attrs = ["METHOD=".concat(key.method)];
  if (key.uri) {
    attrs.push("URI=\"".concat(key.uri, "\""));
  }
  if (key.iv) {
    if (key.iv.length !== 16) {
      utils.INVALIDPLAYLIST('IV must be a 128-bit unsigned integer');
    }
    attrs.push("IV=".concat(utils.byteSequenceToHex(key.iv)));
  }
  if (key.format) {
    attrs.push("KEYFORMAT=\"".concat(key.format, "\""));
  }
  if (key.formatVersion) {
    attrs.push("KEYFORMATVERSIONS=\"".concat(key.formatVersion, "\""));
  }
  return "".concat(name, ":").concat(attrs.join(','));
}
function buildVariant(lines, variant) {
  var name = variant.isIFrameOnly ? '#EXT-X-I-FRAME-STREAM-INF' : '#EXT-X-STREAM-INF';
  var attrs = ["BANDWIDTH=".concat(variant.bandwidth)];
  if (variant.averageBandwidth) {
    attrs.push("AVERAGE-BANDWIDTH=".concat(variant.averageBandwidth));
  }
  if (variant.isIFrameOnly) {
    attrs.push("URI=\"".concat(variant.uri, "\""));
  }
  if (variant.codecs) {
    attrs.push("CODECS=\"".concat(variant.codecs, "\""));
  }
  if (variant.resolution) {
    attrs.push("RESOLUTION=".concat(variant.resolution.width, "x").concat(variant.resolution.height));
  }
  if (variant.frameRate) {
    attrs.push("FRAME-RATE=".concat(buildDecimalFloatingNumber(variant.frameRate, 3)));
  }
  if (variant.hdcpLevel) {
    attrs.push("HDCP-LEVEL=".concat(variant.hdcpLevel));
  }
  if (variant.audio.length > 0) {
    attrs.push("AUDIO=\"".concat(variant.audio[0].groupId, "\""));
    var _iterator4 = _createForOfIteratorHelper(variant.audio),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var rendition = _step4.value;
        lines.push(buildRendition(rendition));
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
  if (variant.video.length > 0) {
    attrs.push("VIDEO=\"".concat(variant.video[0].groupId, "\""));
    var _iterator5 = _createForOfIteratorHelper(variant.video),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _rendition = _step5.value;
        lines.push(buildRendition(_rendition));
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }
  if (variant.subtitles.length > 0) {
    attrs.push("SUBTITLES=\"".concat(variant.subtitles[0].groupId, "\""));
    var _iterator6 = _createForOfIteratorHelper(variant.subtitles),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _rendition2 = _step6.value;
        lines.push(buildRendition(_rendition2));
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }
  if (utils.getOptions().allowClosedCaptionsNone && variant.closedCaptions.length === 0) {
    attrs.push("CLOSED-CAPTIONS=NONE");
  } else if (variant.closedCaptions.length > 0) {
    attrs.push("CLOSED-CAPTIONS=\"".concat(variant.closedCaptions[0].groupId, "\""));
    var _iterator7 = _createForOfIteratorHelper(variant.closedCaptions),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _rendition3 = _step7.value;
        lines.push(buildRendition(_rendition3));
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }
  if (variant.score) {
    attrs.push("SCORE=".concat(variant.score));
  }
  if (variant.allowedCpc) {
    var list = [];
    var _iterator8 = _createForOfIteratorHelper(variant.allowedCpc),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var _step8$value = _step8.value,
          format = _step8$value.format,
          cpcList = _step8$value.cpcList;
        list.push("".concat(format, ":").concat(cpcList.join('/')));
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    attrs.push("ALLOWED-CPC=\"".concat(list.join(','), "\""));
  }
  if (variant.videoRange) {
    attrs.push("VIDEO-RANGE=".concat(variant.videoRange));
  }
  if (variant.stableVariantId) {
    attrs.push("STABLE-VARIANT-ID=\"".concat(variant.stableVariantId, "\""));
  }
  lines.push("".concat(name, ":").concat(attrs.join(',')));
  if (!variant.isIFrameOnly) {
    lines.push("".concat(variant.uri));
  }
}
function buildRendition(rendition) {
  var attrs = ["TYPE=".concat(rendition.type), "GROUP-ID=\"".concat(rendition.groupId, "\""), "NAME=\"".concat(rendition.name, "\"")];
  if (rendition.isDefault !== undefined) {
    attrs.push("DEFAULT=".concat(rendition.isDefault ? 'YES' : 'NO'));
  }
  if (rendition.autoselect !== undefined) {
    attrs.push("AUTOSELECT=".concat(rendition.autoselect ? 'YES' : 'NO'));
  }
  if (rendition.forced !== undefined) {
    attrs.push("FORCED=".concat(rendition.forced ? 'YES' : 'NO'));
  }
  if (rendition.language) {
    attrs.push("LANGUAGE=\"".concat(rendition.language, "\""));
  }
  if (rendition.assocLanguage) {
    attrs.push("ASSOC-LANGUAGE=\"".concat(rendition.assocLanguage, "\""));
  }
  if (rendition.instreamId) {
    attrs.push("INSTREAM-ID=\"".concat(rendition.instreamId, "\""));
  }
  if (rendition.characteristics) {
    attrs.push("CHARACTERISTICS=\"".concat(rendition.characteristics, "\""));
  }
  if (rendition.channels) {
    attrs.push("CHANNELS=\"".concat(rendition.channels, "\""));
  }
  if (rendition.uri) {
    attrs.push("URI=\"".concat(rendition.uri, "\""));
  }
  return "#EXT-X-MEDIA:".concat(attrs.join(','));
}
function buildMediaPlaylist(lines, playlist) {
  var lastKey = '';
  var lastMap = '';
  var unclosedCueIn = false;
  if (playlist.targetDuration) {
    lines.push("#EXT-X-TARGETDURATION:".concat(playlist.targetDuration));
  }
  if (playlist.lowLatencyCompatibility) {
    var _playlist$lowLatencyC = playlist.lowLatencyCompatibility,
      canBlockReload = _playlist$lowLatencyC.canBlockReload,
      canSkipUntil = _playlist$lowLatencyC.canSkipUntil,
      holdBack = _playlist$lowLatencyC.holdBack,
      partHoldBack = _playlist$lowLatencyC.partHoldBack;
    var params = [];
    params.push("CAN-BLOCK-RELOAD=".concat(canBlockReload ? 'YES' : 'NO'));
    if (canSkipUntil !== undefined) {
      params.push("CAN-SKIP-UNTIL=".concat(canSkipUntil));
    }
    if (holdBack !== undefined) {
      params.push("HOLD-BACK=".concat(holdBack));
    }
    if (partHoldBack !== undefined) {
      params.push("PART-HOLD-BACK=".concat(partHoldBack));
    }
    lines.push("#EXT-X-SERVER-CONTROL:".concat(params.join(',')));
  }
  if (playlist.partTargetDuration) {
    lines.push("#EXT-X-PART-INF:PART-TARGET=".concat(playlist.partTargetDuration));
  }
  if (playlist.mediaSequenceBase) {
    lines.push("#EXT-X-MEDIA-SEQUENCE:".concat(playlist.mediaSequenceBase));
  }
  if (playlist.discontinuitySequenceBase) {
    lines.push("#EXT-X-DISCONTINUITY-SEQUENCE:".concat(playlist.discontinuitySequenceBase));
  }
  if (playlist.playlistType) {
    lines.push("#EXT-X-PLAYLIST-TYPE:".concat(playlist.playlistType));
  }
  if (playlist.isIFrame) {
    lines.push("#EXT-X-I-FRAMES-ONLY");
  }
  if (playlist.skip > 0) {
    lines.push("#EXT-X-SKIP:SKIPPED-SEGMENTS=".concat(playlist.skip));
  }
  var _iterator9 = _createForOfIteratorHelper(playlist.segments),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var segment = _step9.value;
      var markerType = '';
      var _buildSegment = buildSegment(lines, segment, lastKey, lastMap, playlist.version);
      var _buildSegment2 = _slicedToArray(_buildSegment, 3);
      lastKey = _buildSegment2[0];
      lastMap = _buildSegment2[1];
      markerType = _buildSegment2[2];
      if (markerType === 'OUT') {
        unclosedCueIn = true;
      } else if (markerType === 'IN' && unclosedCueIn) {
        unclosedCueIn = false;
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  if (playlist.playlistType === 'VOD' && unclosedCueIn) {
    lines.push('#EXT-X-CUE-IN');
  }
  if (playlist.prefetchSegments.length > 2) {
    utils.INVALIDPLAYLIST('The server must deliver no more than two prefetch segments');
  }
  var _iterator10 = _createForOfIteratorHelper(playlist.prefetchSegments),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var _segment = _step10.value;
      if (_segment.discontinuity) {
        lines.push("#EXT-X-PREFETCH-DISCONTINUITY");
      }
      lines.push("#EXT-X-PREFETCH:".concat(_segment.uri));
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
  if (playlist.endlist) {
    lines.push("#EXT-X-ENDLIST");
  }
  var _iterator11 = _createForOfIteratorHelper(playlist.renditionReports),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var report = _step11.value;
      var _params = [];
      _params.push("URI=\"".concat(report.uri, "\""), "LAST-MSN=".concat(report.lastMSN));
      if (report.lastPart !== undefined) {
        _params.push("LAST-PART=".concat(report.lastPart));
      }
      lines.push("#EXT-X-RENDITION-REPORT:".concat(_params.join(',')));
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
}
function buildSegment(lines, segment, lastKey, lastMap) {
  var version = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var hint = false;
  var markerType = '';
  if (segment.discontinuity) {
    lines.push("#EXT-X-DISCONTINUITY");
  }
  if (segment.key) {
    var line = buildKey(segment.key);
    if (line !== lastKey) {
      lines.push(line);
      lastKey = line;
    }
  }
  if (segment.map) {
    var _line = buildMap(segment.map);
    if (_line !== lastMap) {
      lines.push(_line);
      lastMap = _line;
    }
  }
  if (segment.programDateTime) {
    lines.push("#EXT-X-PROGRAM-DATE-TIME:".concat(utils.formatDate(segment.programDateTime)));
  }
  if (segment.dateRange) {
    lines.push(buildDateRange(segment.dateRange));
  }
  if (segment.markers.length > 0) {
    markerType = buildMarkers(lines, segment.markers);
  }
  if (segment.parts.length > 0) {
    hint = buildParts(lines, segment.parts);
  }
  if (hint) {
    return [lastKey, lastMap];
  }
  var duration = version < 3 ? Math.round(segment.duration) : buildDecimalFloatingNumber(segment.duration, getNumberOfDecimalPlaces(segment.duration));
  lines.push("#EXTINF:".concat(duration, ",").concat(unescape(encodeURIComponent(segment.title || ''))));
  if (segment.byterange) {
    lines.push("#EXT-X-BYTERANGE:".concat(buildByteRange(segment.byterange)));
  }
  Array.prototype.push.call(lines, "".concat(segment.uri)); // URIs could be redundant when EXT-X-BYTERANGE is used
  return [lastKey, lastMap, markerType];
}
function buildMap(map) {
  var attrs = ["URI=\"".concat(map.uri, "\"")];
  if (map.byterange) {
    attrs.push("BYTERANGE=\"".concat(buildByteRange(map.byterange), "\""));
  }
  return "#EXT-X-MAP:".concat(attrs.join(','));
}
function buildByteRange(_ref) {
  var offset = _ref.offset,
    length = _ref.length;
  return "".concat(length, "@").concat(offset);
}
function buildDateRange(dateRange) {
  var attrs = ["ID=\"".concat(dateRange.id, "\"")];
  if (dateRange.start) {
    attrs.push("START-DATE=\"".concat(utils.formatDate(dateRange.start), "\""));
  }
  if (dateRange.end) {
    attrs.push("END-DATE=\"".concat(dateRange.end, "\""));
  }
  if (dateRange.duration) {
    attrs.push("DURATION=".concat(dateRange.duration));
  }
  if (dateRange.plannedDuration) {
    attrs.push("PLANNED-DURATION=".concat(dateRange.plannedDuration));
  }
  if (dateRange.classId) {
    attrs.push("CLASS=\"".concat(dateRange.classId, "\""));
  }
  if (dateRange.endOnNext) {
    attrs.push("END-ON-NEXT=YES");
  }
  for (var _i2 = 0, _Object$keys = Object.keys(dateRange.attributes); _i2 < _Object$keys.length; _i2++) {
    var key = _Object$keys[_i2];
    if (key.startsWith('X-')) {
      if (typeof dateRange.attributes[key] === 'number') {
        attrs.push("".concat(key, "=").concat(dateRange.attributes[key]));
      } else {
        attrs.push("".concat(key, "=\"").concat(dateRange.attributes[key], "\""));
      }
    } else if (key.startsWith('SCTE35-')) {
      attrs.push("".concat(key, "=").concat(utils.byteSequenceToHex(dateRange.attributes[key])));
    }
  }
  return "#EXT-X-DATERANGE:".concat(attrs.join(','));
}
function buildMarkers(lines, markers) {
  var type = '';
  var _iterator12 = _createForOfIteratorHelper(markers),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var marker = _step12.value;
      if (marker.type === 'OUT') {
        type = 'OUT';
        lines.push("#EXT-X-CUE-OUT:DURATION=".concat(marker.duration));
      } else if (marker.type === 'IN') {
        type = 'IN';
        lines.push('#EXT-X-CUE-IN');
      } else if (marker.type === 'RAW') {
        var value = marker.value ? ":".concat(marker.value) : '';
        lines.push("#".concat(marker.tagName).concat(value));
      }
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  return type;
}
function buildParts(lines, parts) {
  var hint = false;
  var _iterator13 = _createForOfIteratorHelper(parts),
    _step13;
  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var part = _step13.value;
      if (part.hint) {
        var params = [];
        params.push('TYPE=PART', "URI=\"".concat(part.uri, "\""));
        if (part.byterange) {
          var _part$byterange = part.byterange,
            offset = _part$byterange.offset,
            length = _part$byterange.length;
          params.push("BYTERANGE-START=".concat(offset));
          if (length) {
            params.push("BYTERANGE-LENGTH=".concat(length));
          }
        }
        lines.push("#EXT-X-PRELOAD-HINT:".concat(params.join(',')));
        hint = true;
      } else {
        var _params2 = [];
        _params2.push("DURATION=".concat(part.duration), "URI=\"".concat(part.uri, "\""));
        if (part.byterange) {
          _params2.push("BYTERANGE=".concat(buildByteRange(part.byterange)));
        }
        if (part.independent) {
          _params2.push('INDEPENDENT=YES');
        }
        if (part.gap) {
          _params2.push('GAP=YES');
        }
        lines.push("#EXT-X-PART:".concat(_params2.join(',')));
      }
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }
  return hint;
}
function stringify(playlist) {
  utils.PARAMCHECK(playlist);
  utils.ASSERT('Not a playlist', playlist.type === 'playlist');
  var lines = new LineArray(playlist.uri);
  lines.push('#EXTM3U');
  if (playlist.version) {
    lines.push("#EXT-X-VERSION:".concat(playlist.version));
  }
  if (playlist.independentSegments) {
    lines.push('#EXT-X-INDEPENDENT-SEGMENTS');
  }
  if (playlist.start) {
    lines.push("#EXT-X-START:TIME-OFFSET=".concat(buildDecimalFloatingNumber(playlist.start.offset)).concat(playlist.start.precise ? ',PRECISE=YES' : ''));
  }
  if (playlist.isMasterPlaylist) {
    buildMasterPlaylist(lines, playlist);
  } else {
    buildMediaPlaylist(lines, playlist);
  }
  // console.log('<<<');
  // console.log(lines.join('\n'));
  // console.log('>>>');
  return lines.join('\n');
}
module.exports = stringify;

/***/ }),

/***/ "./types.js":
/*!******************!*\
  !*** ./types.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var utils = __webpack_require__(/*! ./utils */ "./utils.js");
var Rendition = /*#__PURE__*/_createClass(function Rendition(_ref) {
  var type = _ref.type,
    uri = _ref.uri,
    groupId = _ref.groupId,
    language = _ref.language,
    assocLanguage = _ref.assocLanguage,
    name = _ref.name,
    isDefault = _ref.isDefault,
    autoselect = _ref.autoselect,
    forced = _ref.forced,
    instreamId = _ref.instreamId,
    characteristics = _ref.characteristics,
    channels = _ref.channels;
  _classCallCheck(this, Rendition);
  utils.PARAMCHECK(type, groupId, name);
  utils.CONDITIONALASSERT([type === 'SUBTITLES', uri], [type === 'CLOSED-CAPTIONS', instreamId], [type === 'CLOSED-CAPTIONS', !uri], [forced, type === 'SUBTITLES']);
  this.type = type;
  this.uri = uri;
  this.groupId = groupId;
  this.language = language;
  this.assocLanguage = assocLanguage;
  this.name = name;
  this.isDefault = isDefault;
  this.autoselect = autoselect;
  this.forced = forced;
  this.instreamId = instreamId;
  this.characteristics = characteristics;
  this.channels = channels;
});
var Variant = /*#__PURE__*/_createClass(function Variant(_ref2) {
  var uri = _ref2.uri,
    _ref2$isIFrameOnly = _ref2.isIFrameOnly,
    isIFrameOnly = _ref2$isIFrameOnly === void 0 ? false : _ref2$isIFrameOnly,
    bandwidth = _ref2.bandwidth,
    averageBandwidth = _ref2.averageBandwidth,
    score = _ref2.score,
    codecs = _ref2.codecs,
    resolution = _ref2.resolution,
    frameRate = _ref2.frameRate,
    hdcpLevel = _ref2.hdcpLevel,
    allowedCpc = _ref2.allowedCpc,
    videoRange = _ref2.videoRange,
    stableVariantId = _ref2.stableVariantId,
    _ref2$audio = _ref2.audio,
    audio = _ref2$audio === void 0 ? [] : _ref2$audio,
    _ref2$video = _ref2.video,
    video = _ref2$video === void 0 ? [] : _ref2$video,
    _ref2$subtitles = _ref2.subtitles,
    subtitles = _ref2$subtitles === void 0 ? [] : _ref2$subtitles,
    _ref2$closedCaptions = _ref2.closedCaptions,
    closedCaptions = _ref2$closedCaptions === void 0 ? [] : _ref2$closedCaptions,
    _ref2$currentRenditio = _ref2.currentRenditions,
    currentRenditions = _ref2$currentRenditio === void 0 ? {
      audio: 0,
      video: 0,
      subtitles: 0,
      closedCaptions: 0
    } : _ref2$currentRenditio;
  _classCallCheck(this, Variant);
  // utils.PARAMCHECK(uri, bandwidth, codecs);
  utils.PARAMCHECK(uri, bandwidth); // the spec states that CODECS is required but not true in the real world
  this.uri = uri;
  this.isIFrameOnly = isIFrameOnly;
  this.bandwidth = bandwidth;
  this.averageBandwidth = averageBandwidth;
  this.score = score;
  this.codecs = codecs;
  this.resolution = resolution;
  this.frameRate = frameRate;
  this.hdcpLevel = hdcpLevel;
  this.allowedCpc = allowedCpc;
  this.videoRange = videoRange;
  this.stableVariantId = stableVariantId;
  this.audio = audio;
  this.video = video;
  this.subtitles = subtitles;
  this.closedCaptions = closedCaptions;
  this.currentRenditions = currentRenditions;
});
var SessionData = /*#__PURE__*/_createClass(function SessionData(_ref3) {
  var id = _ref3.id,
    value = _ref3.value,
    uri = _ref3.uri,
    language = _ref3.language;
  _classCallCheck(this, SessionData);
  utils.PARAMCHECK(id, value || uri);
  utils.ASSERT('SessionData cannot have both value and uri, shoud be either.', !(value && uri));
  this.id = id;
  this.value = value;
  this.uri = uri;
  this.language = language;
});
var Key = /*#__PURE__*/_createClass(function Key(_ref4) {
  var method = _ref4.method,
    uri = _ref4.uri,
    iv = _ref4.iv,
    format = _ref4.format,
    formatVersion = _ref4.formatVersion;
  _classCallCheck(this, Key);
  utils.PARAMCHECK(method);
  utils.CONDITIONALPARAMCHECK([method !== 'NONE', uri]);
  utils.CONDITIONALASSERT([method === 'NONE', !(uri || iv || format || formatVersion)]);
  this.method = method;
  this.uri = uri;
  this.iv = iv;
  this.format = format;
  this.formatVersion = formatVersion;
});
var MediaInitializationSection = /*#__PURE__*/_createClass(function MediaInitializationSection(_ref5) {
  var _ref5$hint = _ref5.hint,
    hint = _ref5$hint === void 0 ? false : _ref5$hint,
    uri = _ref5.uri,
    mimeType = _ref5.mimeType,
    byterange = _ref5.byterange;
  _classCallCheck(this, MediaInitializationSection);
  utils.PARAMCHECK(uri);
  this.hint = hint;
  this.uri = uri;
  this.mimeType = mimeType;
  this.byterange = byterange;
});
var DateRange = /*#__PURE__*/_createClass(function DateRange(_ref6) {
  var id = _ref6.id,
    classId = _ref6.classId,
    start = _ref6.start,
    end = _ref6.end,
    duration = _ref6.duration,
    plannedDuration = _ref6.plannedDuration,
    endOnNext = _ref6.endOnNext,
    _ref6$attributes = _ref6.attributes,
    attributes = _ref6$attributes === void 0 ? {} : _ref6$attributes;
  _classCallCheck(this, DateRange);
  utils.PARAMCHECK(id);
  utils.CONDITIONALPARAMCHECK([endOnNext === true, classId]);
  utils.CONDITIONALASSERT([end, start], [end, start <= end], [duration, duration >= 0], [plannedDuration, plannedDuration >= 0]);
  this.id = id;
  this.classId = classId;
  this.start = start;
  this.end = end;
  this.duration = duration;
  this.plannedDuration = plannedDuration;
  this.endOnNext = endOnNext;
  this.attributes = attributes;
});
var SpliceInfo = /*#__PURE__*/_createClass(function SpliceInfo(_ref7) {
  var type = _ref7.type,
    duration = _ref7.duration,
    tagName = _ref7.tagName,
    value = _ref7.value;
  _classCallCheck(this, SpliceInfo);
  utils.PARAMCHECK(type);
  utils.CONDITIONALPARAMCHECK([type === 'OUT', duration]);
  utils.CONDITIONALPARAMCHECK([type === 'RAW', tagName]);
  this.type = type;
  this.duration = duration;
  this.tagName = tagName;
  this.value = value;
});
var Data = /*#__PURE__*/_createClass(function Data(type) {
  _classCallCheck(this, Data);
  utils.PARAMCHECK(type);
  this.type = type;
});
var Playlist = /*#__PURE__*/function (_Data) {
  _inherits(Playlist, _Data);
  var _super = _createSuper(Playlist);
  function Playlist(_ref8) {
    var _this;
    var isMasterPlaylist = _ref8.isMasterPlaylist,
      uri = _ref8.uri,
      version = _ref8.version,
      _ref8$independentSegm = _ref8.independentSegments,
      independentSegments = _ref8$independentSegm === void 0 ? false : _ref8$independentSegm,
      start = _ref8.start,
      source = _ref8.source;
    _classCallCheck(this, Playlist);
    _this = _super.call(this, 'playlist');
    utils.PARAMCHECK(isMasterPlaylist);
    _this.isMasterPlaylist = isMasterPlaylist;
    _this.uri = uri;
    _this.version = version;
    _this.independentSegments = independentSegments;
    _this.start = start;
    _this.source = source;
    return _this;
  }
  return _createClass(Playlist);
}(Data);
var MasterPlaylist = /*#__PURE__*/function (_Playlist) {
  _inherits(MasterPlaylist, _Playlist);
  var _super2 = _createSuper(MasterPlaylist);
  function MasterPlaylist() {
    var _this2;
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MasterPlaylist);
    params.isMasterPlaylist = true;
    _this2 = _super2.call(this, params);
    var _params$variants = params.variants,
      variants = _params$variants === void 0 ? [] : _params$variants,
      currentVariant = params.currentVariant,
      _params$sessionDataLi = params.sessionDataList,
      sessionDataList = _params$sessionDataLi === void 0 ? [] : _params$sessionDataLi,
      _params$sessionKeyLis = params.sessionKeyList,
      sessionKeyList = _params$sessionKeyLis === void 0 ? [] : _params$sessionKeyLis;
    _this2.variants = variants;
    _this2.currentVariant = currentVariant;
    _this2.sessionDataList = sessionDataList;
    _this2.sessionKeyList = sessionKeyList;
    return _this2;
  }
  return _createClass(MasterPlaylist);
}(Playlist);
var MediaPlaylist = /*#__PURE__*/function (_Playlist2) {
  _inherits(MediaPlaylist, _Playlist2);
  var _super3 = _createSuper(MediaPlaylist);
  function MediaPlaylist() {
    var _this3;
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MediaPlaylist);
    params.isMasterPlaylist = false;
    _this3 = _super3.call(this, params);
    var targetDuration = params.targetDuration,
      _params$mediaSequence = params.mediaSequenceBase,
      mediaSequenceBase = _params$mediaSequence === void 0 ? 0 : _params$mediaSequence,
      _params$discontinuity = params.discontinuitySequenceBase,
      discontinuitySequenceBase = _params$discontinuity === void 0 ? 0 : _params$discontinuity,
      _params$endlist = params.endlist,
      endlist = _params$endlist === void 0 ? false : _params$endlist,
      playlistType = params.playlistType,
      isIFrame = params.isIFrame,
      _params$segments = params.segments,
      segments = _params$segments === void 0 ? [] : _params$segments,
      _params$prefetchSegme = params.prefetchSegments,
      prefetchSegments = _params$prefetchSegme === void 0 ? [] : _params$prefetchSegme,
      lowLatencyCompatibility = params.lowLatencyCompatibility,
      partTargetDuration = params.partTargetDuration,
      _params$renditionRepo = params.renditionReports,
      renditionReports = _params$renditionRepo === void 0 ? [] : _params$renditionRepo,
      _params$skip = params.skip,
      skip = _params$skip === void 0 ? 0 : _params$skip,
      hash = params.hash;
    _this3.targetDuration = targetDuration;
    _this3.mediaSequenceBase = mediaSequenceBase;
    _this3.discontinuitySequenceBase = discontinuitySequenceBase;
    _this3.endlist = endlist;
    _this3.playlistType = playlistType;
    _this3.isIFrame = isIFrame;
    _this3.segments = segments;
    _this3.prefetchSegments = prefetchSegments;
    _this3.lowLatencyCompatibility = lowLatencyCompatibility;
    _this3.partTargetDuration = partTargetDuration;
    _this3.renditionReports = renditionReports;
    _this3.skip = skip;
    _this3.hash = hash;
    return _this3;
  }
  return _createClass(MediaPlaylist);
}(Playlist);
var Segment = /*#__PURE__*/function (_Data2) {
  _inherits(Segment, _Data2);
  var _super4 = _createSuper(Segment);
  function Segment(_ref9) {
    var _this4;
    var uri = _ref9.uri,
      mimeType = _ref9.mimeType,
      data = _ref9.data,
      duration = _ref9.duration,
      title = _ref9.title,
      byterange = _ref9.byterange,
      discontinuity = _ref9.discontinuity,
      _ref9$mediaSequenceNu = _ref9.mediaSequenceNumber,
      mediaSequenceNumber = _ref9$mediaSequenceNu === void 0 ? 0 : _ref9$mediaSequenceNu,
      _ref9$discontinuitySe = _ref9.discontinuitySequence,
      discontinuitySequence = _ref9$discontinuitySe === void 0 ? 0 : _ref9$discontinuitySe,
      key = _ref9.key,
      map = _ref9.map,
      programDateTime = _ref9.programDateTime,
      dateRange = _ref9.dateRange,
      _ref9$markers = _ref9.markers,
      markers = _ref9$markers === void 0 ? [] : _ref9$markers,
      _ref9$parts = _ref9.parts,
      parts = _ref9$parts === void 0 ? [] : _ref9$parts;
    _classCallCheck(this, Segment);
    _this4 = _super4.call(this, 'segment');
    // utils.PARAMCHECK(uri, mediaSequenceNumber, discontinuitySequence);
    _this4.uri = uri;
    _this4.mimeType = mimeType;
    _this4.data = data;
    _this4.duration = duration;
    _this4.title = title;
    _this4.byterange = byterange;
    _this4.discontinuity = discontinuity;
    _this4.mediaSequenceNumber = mediaSequenceNumber;
    _this4.discontinuitySequence = discontinuitySequence;
    _this4.key = key;
    _this4.map = map;
    _this4.programDateTime = programDateTime;
    _this4.dateRange = dateRange;
    _this4.markers = markers;
    _this4.parts = parts;
    return _this4;
  }
  return _createClass(Segment);
}(Data);
var PartialSegment = /*#__PURE__*/function (_Data3) {
  _inherits(PartialSegment, _Data3);
  var _super5 = _createSuper(PartialSegment);
  function PartialSegment(_ref10) {
    var _this5;
    var _ref10$hint = _ref10.hint,
      hint = _ref10$hint === void 0 ? false : _ref10$hint,
      uri = _ref10.uri,
      duration = _ref10.duration,
      independent = _ref10.independent,
      byterange = _ref10.byterange,
      gap = _ref10.gap;
    _classCallCheck(this, PartialSegment);
    _this5 = _super5.call(this, 'part');
    utils.PARAMCHECK(uri);
    _this5.hint = hint;
    _this5.uri = uri;
    _this5.duration = duration;
    _this5.independent = independent;
    _this5.duration = duration;
    _this5.byterange = byterange;
    _this5.gap = gap;
    return _this5;
  }
  return _createClass(PartialSegment);
}(Data);
var PrefetchSegment = /*#__PURE__*/function (_Data4) {
  _inherits(PrefetchSegment, _Data4);
  var _super6 = _createSuper(PrefetchSegment);
  function PrefetchSegment(_ref11) {
    var _this6;
    var uri = _ref11.uri,
      discontinuity = _ref11.discontinuity,
      _ref11$mediaSequenceN = _ref11.mediaSequenceNumber,
      mediaSequenceNumber = _ref11$mediaSequenceN === void 0 ? 0 : _ref11$mediaSequenceN,
      _ref11$discontinuityS = _ref11.discontinuitySequence,
      discontinuitySequence = _ref11$discontinuityS === void 0 ? 0 : _ref11$discontinuityS,
      key = _ref11.key;
    _classCallCheck(this, PrefetchSegment);
    _this6 = _super6.call(this, 'prefetch');
    utils.PARAMCHECK(uri);
    _this6.uri = uri;
    _this6.discontinuity = discontinuity;
    _this6.mediaSequenceNumber = mediaSequenceNumber;
    _this6.discontinuitySequence = discontinuitySequence;
    _this6.key = key;
    return _this6;
  }
  return _createClass(PrefetchSegment);
}(Data);
var RenditionReport = /*#__PURE__*/_createClass(function RenditionReport(_ref12) {
  var uri = _ref12.uri,
    lastMSN = _ref12.lastMSN,
    lastPart = _ref12.lastPart;
  _classCallCheck(this, RenditionReport);
  utils.PARAMCHECK(uri);
  this.uri = uri;
  this.lastMSN = lastMSN;
  this.lastPart = lastPart;
});
module.exports = {
  Rendition: Rendition,
  Variant: Variant,
  SessionData: SessionData,
  Key: Key,
  MediaInitializationSection: MediaInitializationSection,
  DateRange: DateRange,
  SpliceInfo: SpliceInfo,
  Playlist: Playlist,
  MasterPlaylist: MasterPlaylist,
  MediaPlaylist: MediaPlaylist,
  Segment: Segment,
  PartialSegment: PartialSegment,
  PrefetchSegment: PrefetchSegment,
  RenditionReport: RenditionReport
};

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var options = {};
function THROW(err) {
  if (!options.strictMode) {
    if (!options.silent) {
      console.error(err.message);
    }
    return;
  }
  throw err;
}
function ASSERT(msg) {
  for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    options[_key - 1] = arguments[_key];
  }
  var _iterator = _createForOfIteratorHelper(options.entries()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        index = _step$value[0],
        param = _step$value[1];
      if (!param) {
        THROW(new Error("".concat(msg, " : Failed at [").concat(index, "]")));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function CONDITIONALASSERT() {
  for (var _len2 = arguments.length, options = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    options[_key2] = arguments[_key2];
  }
  var _iterator2 = _createForOfIteratorHelper(options.entries()),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _slicedToArray(_step2.value, 2),
        index = _step2$value[0],
        _step2$value$ = _slicedToArray(_step2$value[1], 2),
        cond = _step2$value$[0],
        param = _step2$value$[1];
      if (!cond) {
        continue;
      }
      if (!param) {
        THROW(new Error("Conditional Assert : Failed at [".concat(index, "]")));
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function PARAMCHECK() {
  for (var _len3 = arguments.length, options = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    options[_key3] = arguments[_key3];
  }
  var _iterator3 = _createForOfIteratorHelper(options.entries()),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _step3$value = _slicedToArray(_step3.value, 2),
        index = _step3$value[0],
        param = _step3$value[1];
      if (param === undefined) {
        THROW(new Error("Param Check : Failed at [".concat(index, "]")));
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}
function CONDITIONALPARAMCHECK() {
  for (var _len4 = arguments.length, options = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    options[_key4] = arguments[_key4];
  }
  var _iterator4 = _createForOfIteratorHelper(options.entries()),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _step4$value = _slicedToArray(_step4.value, 2),
        index = _step4$value[0],
        _step4$value$ = _slicedToArray(_step4$value[1], 2),
        cond = _step4$value$[0],
        param = _step4$value$[1];
      if (!cond) {
        continue;
      }
      if (param === undefined) {
        THROW(new Error("Conditional Param Check : Failed at [".concat(index, "]")));
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}
function INVALIDPLAYLIST(msg) {
  THROW(new Error("Invalid Playlist : ".concat(msg)));
}
function toNumber(str) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  if (typeof str === 'number') {
    return str;
  }
  var num = radix === 10 ? Number.parseFloat(str, radix) : Number.parseInt(str, radix);
  if (Number.isNaN(num)) {
    return 0;
  }
  return num;
}
function hexToByteSequence(str) {
  if (str.startsWith('0x') || str.startsWith('0X')) {
    str = str.slice(2);
  }
  var numArray = [];
  for (var i = 0; i < str.length; i += 2) {
    numArray.push(toNumber(str.slice(i, i + 2), 16));
  }
  return Uint8Array.from(numArray);
}
function byteSequenceToHex(sequence) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : sequence.length;
  if (end <= start) {
    THROW(new Error("end must be larger than start : start=".concat(start, ", end=").concat(end)));
  }
  var array = [];
  for (var i = start; i < end; i++) {
    array.push("0".concat((sequence[i] & 0xFF).toString(16).toUpperCase()).slice(-2));
  }
  return "0x".concat(array.join(''));
}
function tryCatch(body, errorHandler) {
  try {
    return body();
  } catch (err) {
    return errorHandler(err);
  }
}
function splitAt(str, delimiter) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var lastDelimiterPos = -1;
  for (var i = 0, j = 0; i < str.length; i++) {
    if (str[i] === delimiter) {
      if (j++ === index) {
        return [str.slice(0, i), str.slice(i + 1)];
      }
      lastDelimiterPos = i;
    }
  }
  if (lastDelimiterPos !== -1) {
    return [str.slice(0, lastDelimiterPos), str.slice(lastDelimiterPos + 1)];
  }
  return [str];
}
function trim(str) {
  var _char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  if (!str) {
    return str;
  }
  str = str.trim();
  if (_char === ' ') {
    return str;
  }
  if (str.startsWith(_char)) {
    str = str.slice(1);
  }
  if (str.endsWith(_char)) {
    str = str.slice(0, -1);
  }
  return str;
}
function splitByCommaWithPreservingQuotes(str) {
  var list = [];
  var doParse = true;
  var start = 0;
  var prevQuotes = [];
  for (var i = 0; i < str.length; i++) {
    var curr = str[i];
    if (doParse && curr === ',') {
      list.push(str.slice(start, i).trim());
      start = i + 1;
      continue;
    }
    if (curr === '"' || curr === '\'') {
      if (doParse) {
        prevQuotes.push(curr);
        doParse = false;
      } else if (curr === prevQuotes[prevQuotes.length - 1]) {
        prevQuotes.pop();
        doParse = true;
      } else {
        prevQuotes.push(curr);
      }
    }
  }
  list.push(str.slice(start).trim());
  return list;
}
function camelify(str) {
  var array = [];
  var nextUpper = false;
  var _iterator5 = _createForOfIteratorHelper(str),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var ch = _step5.value;
      if (ch === '-' || ch === '_') {
        nextUpper = true;
        continue;
      }
      if (nextUpper) {
        array.push(ch.toUpperCase());
        nextUpper = false;
        continue;
      }
      array.push(ch.toLowerCase());
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return array.join('');
}
function formatDate(date) {
  var YYYY = date.getUTCFullYear();
  var MM = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  var DD = ('0' + date.getUTCDate()).slice(-2);
  var hh = ('0' + date.getUTCHours()).slice(-2);
  var mm = ('0' + date.getUTCMinutes()).slice(-2);
  var ss = ('0' + date.getUTCSeconds()).slice(-2);
  var msc = ('00' + date.getUTCMilliseconds()).slice(-3);
  return "".concat(YYYY, "-").concat(MM, "-").concat(DD, "T").concat(hh, ":").concat(mm, ":").concat(ss, ".").concat(msc, "Z");
}
function hasOwnProp(obj, propName) {
  return Object.hasOwnProperty.call(obj, propName);
}
function setOptions() {
  var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  options = Object.assign(options, newOptions);
}
function getOptions() {
  return Object.assign({}, options);
}
module.exports = {
  THROW: THROW,
  ASSERT: ASSERT,
  CONDITIONALASSERT: CONDITIONALASSERT,
  PARAMCHECK: PARAMCHECK,
  CONDITIONALPARAMCHECK: CONDITIONALPARAMCHECK,
  INVALIDPLAYLIST: INVALIDPLAYLIST,
  toNumber: toNumber,
  hexToByteSequence: hexToByteSequence,
  byteSequenceToHex: byteSequenceToHex,
  tryCatch: tryCatch,
  splitAt: splitAt,
  trim: trim,
  splitByCommaWithPreservingQuotes: splitByCommaWithPreservingQuotes,
  camelify: camelify,
  formatDate: formatDate,
  hasOwnProp: hasOwnProp,
  setOptions: setOptions,
  getOptions: getOptions
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});