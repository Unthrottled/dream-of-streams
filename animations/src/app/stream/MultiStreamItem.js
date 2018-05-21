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
var MultiStreamItem = /** @class */ (function (_super) {
    __extends(MultiStreamItem, _super);
    //Sure would be nice to have a Mono or Flux :)
    function MultiStreamItem(_element) {
        return _super.call(this, _element) || this;
    }
    return MultiStreamItem;
}(BaseStreamItem_1.BaseStreamItem));
exports.MultiStreamItem = MultiStreamItem;
//# sourceMappingURL=MultiStreamItem.js.map