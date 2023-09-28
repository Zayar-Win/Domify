const root = document.querySelectorAll('[x-data]');
const mainRoots = Array.from(root).filter(el => !el.parentNode.hasAttribute('x-data'))
const rawDatas = getInitialData(root);
const datas = observe(rawDatas);//to do something when data add or set 

registerEventListeners();

function registerEventListeners(){
  mainRoots.forEach((el,i) => (
    walkDom(el,(el) => {
      if(el.hasAttribute("@click")){
        let callback = el.getAttribute('@click');
        let currentData = datas[i];
        el.addEventListener('click',() =>{
          eval(`with(currentData){(${callback})}`);
          console.log(currentData);
        })
      }
    })
  ))
}

function getInitialData(root){
  let datas = [];
  root.forEach(el => {
    if(el.hasAttribute('x-data')&& !el.parentNode.hasAttribute('x-data')){
      let rawData = el.getAttribute('x-data');
      let data = new Data(eval(`(${rawData})`));
      el = el.children[0];
      walkDom(el,(el,data) => {
        if(el.hasAttribute('x-data')){
          let rawData = el.getAttribute('x-data');
           data.addData(eval(`(${rawData})`));
        }
      },data)
      datas.push(data);
    }
  })
  return datas;
}

function walkDom(el,callback,data){
  callback(el,data);
  el = el.firstElementChild;
  while(el){
    walkDom(el,callback,data);
    el = el.nextElementSibling;
  }
}

function refreshDom(){
  mainRoots.forEach((el,i) => (
    walkDom(el,(el) => {
      if(el.hasAttribute('x-text')) {
        let expression = el.getAttribute('x-text');
        el.innerText = datas[i][`${expression}`];
      }
      if(el.hasAttribute('x-show')){
        let expression = el.getAttribute('x-show');
        let showOrNot = datas[i][`${expression}`];
        el.style.display = showOrNot ? 'block' : 'none';
      }
    })
    
  ))
}

function observe(datas){
  return datas.map(data => 
    new Proxy(data.data,{
      set(target,key,newValue,receiver){
        target[key] = newValue;
        refreshDom()
      }
    })
    )
}

refreshDom();