"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingleStreamItem_1 = require("./SingleStreamItem");
var MultiStreamItem_1 = require("./MultiStreamItem");
var BaseStreamItemService = /** @class */ (function () {
    function BaseStreamItemService() {
    }
    BaseStreamItemService.prototype.createStreamItems = function (thisMany, options) {
        var _this = this;
        var items = [];
        var itemToEmit = function () { return _this.createShape(options); };
        for (var i = 0; i < thisMany; ++i) {
            items.push(itemToEmit());
        }
        return new MultiStreamItem_1.MultiStreamItem(items);
    };
    BaseStreamItemService.prototype.createStreamItem = function (options) {
        return new SingleStreamItem_1.SingleStreamItem([this.createShape(options)]);
    };
    return BaseStreamItemService;
}());
exports.BaseStreamItemService = BaseStreamItemService;
//# sourceMappingURL=BaseStreamItemService.js.map