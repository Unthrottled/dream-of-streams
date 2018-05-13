export class StreamItem {

    constructor() {
        this._identifier = new Date().getTime();
    }

    private _identifier: number;

    get identifier(): number {
        return this._identifier;
    }

    toString(): String {
        return this._identifier.toString();
    }
}