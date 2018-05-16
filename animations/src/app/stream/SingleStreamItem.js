"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingleStreamItem = /** @class */ (function () {
    function SingleStreamItem(_element) {
        this._element = _element;
        this._identifier = new Date().getTime();
    }
    Object.defineProperty(SingleStreamItem.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleStreamItem.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    SingleStreamItem.prototype.toString = function () {
        return this._identifier.toString();
    };
    return SingleStreamItem;
}());
exports.SingleStreamItem = SingleStreamItem;
//# sourceMappingURL=SingleStreamItem.js.map