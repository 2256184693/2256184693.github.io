let obj = { name: "abc", info: { a: [1, 2] } };
let handles = {
  set(target, key, value) {
    console.log("set update", key);
    return Reflect.set(target, key, value);
  },
  get(target, key) {
    console.log('get', key, typeof target[key]);
    if (typeof target[key] === "object") {
      return new Proxy(target[key], handles);
    }
    return Reflect.get(target, key);
  }
};
let proxy = new Proxy(obj, handles);
// proxy.name = "happy";
// console.log(proxy.info.a);
// console.log(proxy.name);
let p1 = new Proxy([1, 2], handles);

console.log(p1.push(123));