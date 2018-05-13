
export class StreamItem {

    private _identifier: number;

    get identifier(): number {
        return this._identifier;
    }

    constructor() {
        this._identifier = new Date().getMilliseconds();
    }
}