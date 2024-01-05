export default class Car {
  constructor(brand, motor, color) {
    this._color = color;
    this._motor = motor;
    this._brand = brand;
  }

  static get [Symbol.species]() {
    return this.prototype.constructor;
  }

  cloneCar() {
    return new (this.constructor[Symbol.species])();
  }
}
