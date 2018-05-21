"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingleStreamItem_1 = require("./SingleStreamItem");
var Observable_1 = require("rxjs/Observable");
var MultiStreamItem_1 = require("./MultiStreamItem");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var BaseStreamItemService = /** @class */ (function () {
    function BaseStreamItemService() {
    }
    BaseStreamItemService.prototype.createStreamItems = function (thisMany, options) {
        var _this = this;
        var replaySubject = new ReplaySubject_1.ReplaySubject();
        var elements = Observable_1.Observable.create(function (observer) {
            var itemToEmit = function () { return _this.createShape(options); };
            for (var i = 0; i < thisMany; ++i) {
                observer.next(itemToEmit());
            }
            observer.complete();
        });
        elements.subscribe(function (e) { return replaySubject.next(e); }, function (err) { return replaySubject.error(err); }, function () { return replaySubject.complete(); });
        return new MultiStreamItem_1.MultiStreamItem(replaySubject);
    };
    BaseStreamItemService.prototype.createStreamItem = function (options) {
        return new SingleStreamItem_1.SingleStreamItem(Observable_1.Observable.of(this.createShape(options)));
    };
    return BaseStreamItemService;
}());
exports.BaseStreamItemService = BaseStreamItemService;
//# sourceMappingURL=BaseStreamItemService.js.map