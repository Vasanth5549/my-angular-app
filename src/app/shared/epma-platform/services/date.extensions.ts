interface Date {
  getTimestamp(): number;
  ToLocaleString(): string;
}

Date.prototype.getTimestamp = function () {
  return this.getTime();
};
Date.prototype.ToLocaleString = function () {
  return this.toLocaleString();
};