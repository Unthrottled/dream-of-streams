"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamItemContainer = /** @class */ (function () {
    function StreamItemContainer(_items, _isCollection) {
        this._items = _items;
        this._isCollection = _isCollection;
        this._identifier = new Date().getTime();
    }
    Object.defineProperty(StreamItemContainer.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamItemContainer.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamItemContainer.prototype, "isCollection", {
        get: function () {
            return this._isCollection;
        },
        enumerable: true,
        configurable: true
    });
    return StreamItemContainer;
}());
exports.StreamItemContainer = StreamItemContainer;
//# sourceMappingURL=StreamItemContainer.js.map