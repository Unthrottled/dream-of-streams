"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseStreamItem = /** @class */ (function () {
    //Sure would be nice to have a Mono or Flux :)
    function BaseStreamItem(_element) {
        this._element = _element;
        this._identifier = new Date().getTime();
    }
    Object.defineProperty(BaseStreamItem.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseStreamItem.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    BaseStreamItem.prototype.toString = function () {
        return this._identifier.toString();
    };
    return BaseStreamItem;
}());
exports.BaseStreamItem = BaseStreamItem;
//# sourceMappingURL=BaseStreamItem.js.map