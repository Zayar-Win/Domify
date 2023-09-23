// const root = document.querySelector("[x-data]");
// let rawData = getInitialData();
// let data = observe(rawData);
// registerEventListeners();

// function registerEventListeners() {
//   walkDom(root, (el) => {
//     if (el.hasAttribute("@click")) {
//       let expression = el.getAttribute("@click");
//       console.log(eval(`with (data){(${expression})}`));
//       el.addEventListener("click", () => {
//         eval(`with (data){(${expression})}`);
//       });
//     }
//   });
// }

// function observe(data) {
//   return new Proxy(data, {
//     set(target, key, value) {
//       target[key] = value;
//       refreshDom();
//     },
//   });
// }

// function getInitialData() {
//   const data = root.getAttribute("x-data");
//   return eval(`(${data})`)
// }

// function refreshDom() {
//   walkDom(root, (el) => {
//     if (el.hasAttribute("x-text")) {
//       let expression = el.getAttribute("x-text");
//       el.innerText = eval(`with(data) {(${expression})}`);
//     }
//   });
// }

// function walkDom(el, callback) {
//   callback(el);

//   el = el.firstElementChild;

//   while (el) {
//     walkDom(el, callback);
//     el = el.nextElementSibling;
//   }
// }

const root = document.querySelector('[x-data]');
const rawData = getInitialData(root);
const data = observe(rawData);//to do something when data add or set 
registerEventListeners()

function registerEventListeners(){
  walkDom(root,(el) => {
    let callback = el.getAttribute('@click');
    el.addEventListener('click',() =>{
      eval(`with(data){(${callback})}`);
    })
  })
}

function getInitialData(root){
  let data = root.getAttribute('x-data');
  return eval(`(${data})`)
}

function walkDom(el,callback){
  callback(el);
  el = el.firstElementChild;
  while(el){
    walkDom(el,callback);
    el = el.nextElementSibling;
  }
}

function observe(data){
  return new Proxy(data,{
    set(target,key,newValue,receiver){
      target[key] = newValue;
      // refreshDom()
    }
  })
}