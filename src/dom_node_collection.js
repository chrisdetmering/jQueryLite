class DomNodeCollection {

  constructor(nodes)  {
    this.nodes = nodes;
  }


  each(callback) { 
    this.nodes.forEach(callback);
  }

  changeHTML(html) {
    this.each(node => {
      node.innerHTML = html;
    });
  }

  html(html) { 
    if (html === undefined) { 
      return this.nodes[0].innerHTML;
    } else { 
      this.changeHTML(html)
    }
  }

  empty() { 
    this.html(""); 
  }

  changeHTML(html) { 
    this.each(node => {
      node.innerHTML = html;
    });
  }

  //simplify and refactor
  append(content) { 
    if (typeof content === 'object') { 
      this.handleElementOrDomNodes(content)
    } else { 
      this.addToInnerHTML(content)
    }
  }

  handleElementOrDomNodes(content) { 
    if (content instanceof HTMLElement) { 
      this.addToInnerHTML(content.outerHTML)
    } else { 
      this.addAndRemove(content)
    }
  }

  addToInnerHTML(content) { 
    this.each(node => {
      node.innerHTML += content;
    }) 
  }

  addAndRemove(content) { 
    this.each(selectedNode => {
      content.each(node => {
        selectedNode.innerHTML += node.outerHTML;
        node.remove();
      })
    })
  }

  //attr 

  attr(name, value) { 
    if (arguments.length < 2) { 
      this.each(node => { node.setAttribute(name, value) });
    } else { 
      return this.nodes[0].getAttribute(name);
    }
  }

  addClass(newClass) { 
    this.each(element =>{ 
      element.classList.add(newClass)
    });
  }
  
  removeClass(newClass) {
    this.each(element => {
      element.classList.remove(newClass)
    });
  }

  children() { 
    var children = [];
    this.each(node => { 
        children = children.concat(Array.from(node.children)); 
    });
    return new DomNodeCollection(children); 
  }
   
  parent() { 
    var parents = [];
    this.each(node => {
       parents.push(node.parentNode);
    });

    return new DomNodeCollection(parents);
  }

  find(selector) { 
    var found = [];
    this.each(node => { 
      found = found.concat(Array.from(node.querySelectorAll(selector))); 
    });

    return new DomNodeCollection(found); 
  }

  remove() {
    this.each(node => node.remove());
  }


  on(event, callback) { 
    this.each(node => { 
      node.setAttribute(event, callback)
      node.addEventListener(event, callback);
    })
  }
 
  off(event) { 
    this.each(node => {
      let callback = node.getAttribute(event)
      node.removeEventListener(event, callback);
    })
  }


  
}


module.exports = DomNodeCollection