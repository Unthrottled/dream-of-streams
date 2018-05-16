"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamItemContainer = /** @class */ (function () {
    function StreamItemContainer(_element) {
        this._element = _element;
        this._identifier = new Date().getTime();
    }
    Object.defineProperty(StreamItemContainer.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamItemContainer.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    StreamItemContainer.prototype.toString = function () {
        return this._identifier.toString();
    };
    return StreamItemContainer;
}());
exports.StreamItemContainer = StreamItemContainer;
//# sourceMappingURL=StreamItem.js.map