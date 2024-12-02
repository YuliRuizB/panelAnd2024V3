class GeoPoint {
    constructor(public _lat: number, public _long: number) {}
    get latitude() {
      return this._lat;
    }
    get longitude() {
      return this._long;
    }
  }