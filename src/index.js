const DomNodeCollection = require('./dom_node_collection');

const _docReadyCallbacks = [];
let _docReady = false; 

window.$1 = (arg) => { 
  switch(typeof arg) { 
    case 'function': 
      registerDocReadyCallBack(arg)
    break; 
    case 'string': 
      return selectMatchingNodes(arg);
    break; 
    case 'object': 
      if (arg instanceof HTMLElement) { 
        return new DomNodeCollection([arg]);
      }
    break; 
  }
}; 


$1.ajax = (options) => { 
  const request = new XMLHttpRequest();
  options = $1.extend(settings, options)
  options.method.toUpperCase();

  request.open(options.method, options.url, true)

  request.onload = (e) => { 
    if (request.status === 200) {
      options.success(request.response)
    } else { 
      options.error()
    }
  }

  request.send()
}

const settings = { 
  url: 'The current page', 
  method: 'GET', 
  data: {}, 
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  success: () => {},
  error: () => {}
}


//helper functions
$1.extend = (targetObj, ...objects) => {
  objects.forEach(obj => {
    for (var key in obj) {
      targetObj[key] = obj[key];
    }
  });

  return targetObj;
}

function selectMatchingNodes(string) { 
  var nodeList = document.querySelectorAll(string);
  var arrayList = Array.from(nodeList);

  return new DomNodeCollection(arrayList);
}

function registerDocReadyCallBack(func) { 
  if (!_docReady) { 
    _docReadyCallbacks.push(func);
  } else { 
    func();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  _docReady = true;
  _docReadyCallbacks.forEach(func => func());
}); 




