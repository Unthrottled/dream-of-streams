"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiStreamItem = /** @class */ (function () {
    //Sure would be nice to have a Mono or Flux :)
    function MultiStreamItem(_element) {
        this._element = _element;
        this._identifier = new Date().getTime();
    }
    Object.defineProperty(MultiStreamItem.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiStreamItem.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    MultiStreamItem.prototype.toString = function () {
        return this._identifier.toString();
    };
    return MultiStreamItem;
}());
exports.MultiStreamItem = MultiStreamItem;
//# sourceMappingURL=MultiStreamItem.js.map