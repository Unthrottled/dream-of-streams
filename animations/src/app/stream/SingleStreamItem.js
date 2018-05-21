"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseStreamItem_1 = require("./BaseStreamItem");
var SingleStreamItem = /** @class */ (function (_super) {
    __extends(SingleStreamItem, _super);
    //Sure would be nice to have a Mono or Flux :)
    function SingleStreamItem(_element) {
        return _super.call(this, _element) || this;
    }
    return SingleStreamItem;
}(BaseStreamItem_1.BaseStreamItem));
exports.SingleStreamItem = SingleStreamItem;
//# sourceMappingURL=SingleStreamItem.js.map