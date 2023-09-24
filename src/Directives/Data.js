class Data {
  constructor(data) {
    this.data = data;
  }

  addData(data) {
    this.data = {...this.data,...data};
  }
}