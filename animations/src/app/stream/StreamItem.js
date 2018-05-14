"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamItem = /** @class */ (function () {
    function StreamItem(_element) {
        this._element = _element;
        this._identifier = new Date().getTime();
    }
    Object.defineProperty(StreamItem.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamItem.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    StreamItem.prototype.toString = function () {
        return this._identifier.toString();
    };
    return StreamItem;
}());
exports.StreamItem = StreamItem;
//# sourceMappingURL=StreamItem.js.map