(function(){
  if (document.querySelector('alt-swab')) {
    return;
  }
  class altSwab extends HTMLElement {
    constructor () {
      super();
    }
    static get observedAttributes() {
      return ['error','alttext','hidden'];
    }
    get error() {
      return this.hasAttribute('error');
    }
    get hidden() {
      return this.hasAttribute('error');
    }
    get alttext() {
      return this.hasAttribute('alttext');
    }
    get hidden() {
      return this.hasAttribute('hidden');
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if(this.shadowRoot){
        if (this.error) {
          this.shadowRoot.querySelector('div').classList.add('error');
        } else {
          this.shadowRoot.querySelector('div').classList.remove('error');
        }
        if (this.hidden) {
          this.shadowRoot.querySelector('div').classList.add('hidden');
        } else {
          this.shadowRoot.querySelector('div').classList.remove('hidden');
        }

        if (this.alttext) {
          this.shadowRoot.querySelector('p').innerHTML = this.getAttribute('alttext');
        } else {
          this.shadowRoot.querySelector('p').innerHTML = ''
        }
      }
    }
    connectedCallback () {
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
        <style>
        div {
          position: fixed;
          background: yellow;
          font-family: Sans-serif;
          max-width: 250px;
          overflow: scroll ;
          top: 10px;
          left: 10px;
          font-size: 16px;
          color:black;
          box-shadow:3px 3px 20px #333;
          border: 5px solid yellow;
          opacity: 0.95;
        }
        div.error {
          border: 5px solid firebrick;
        }
        div h1 {
          cursor: move;
          font-size: 1em;
          padding: .2em .5em;
          background: grey;
          margin: 0;
          font-weight: normal;
          position: relative;
        }
        div:hover {
          opacity: 1;
        }
        .hidden {
          display: none;
        }
        div.error {
          border: 5px solid firebrick;
        }
        
        div button {
          border: none;
          font-size: 18px;
          background: transparent;
          font-family: inherit;
          font-style: inherit;
          position: absolute;
          top: -2px;
          right: 2px;
        }
        div button:hover {
          color: yellow;
          background: black;
        }
        </style>
        <div>
          <h1>Drag here <button title="close">ⅹ</button></h1>
          <p></p>
        </div>
      `;
  
      shadowRoot.querySelector('button').addEventListener('click', e => {
        this.setAttribute('hidden',true);
      });

      let swatchx = 0;
      let swatchy = 0;
      let mousex = 0;
      let mousey = 0;
    
      const initiatedrag = ev => {
        ev = ev || window.event;
        ev.preventDefault();
        mousex = ev.clientX;
        mousey = ev.clientY;
        document.addEventListener('mouseup', enddrag);
        document.addEventListener('mousemove', startdrag);
      }
      const startdrag = (ev) => {
        ev = ev || window.event;
        ev.preventDefault();
        swatchx = mousex - ev.clientX;
        swatchy = mousey - ev.clientY;
        mousex = ev.clientX;
        mousey = ev.clientY;
        shadowRoot.querySelector('div').style.top = (shadowRoot.querySelector('div').offsetTop - swatchy) + "px";
        shadowRoot.querySelector('div').style.left = (shadowRoot.querySelector('div').offsetLeft - swatchx) + "px";
      }
      const enddrag = _ => {
        document.removeEventListener('mouseup', enddrag);
        document.removeEventListener('mousemove', startdrag);
      }
      shadowRoot.querySelector('h1').addEventListener('mousedown', initiatedrag);
    }
  }
  window.customElements.define('alt-swab', altSwab);
  
  
  let altDisplay = document.createElement('alt-swab');
  document.body.appendChild(altDisplay);
  altDisplay.setAttribute(
    'alttext', 
    'Roll over any image<br>Drag to where you want me'
  );
  altDisplay.removeAttribute('hidden');

  const outimg = e => {
    e.target.style.opacity = 1;
  };
  const overimg = e => {
    altDisplay.removeAttribute('error');
    altDisplay.removeAttribute('hidden');
    e.target.style.opacity = 0.7;
    let out = 'Image: ' + e.target.src.replace(/\/([^\/])/g,'/ $1') +'<br><br>';
    if(e.target.getAttribute('alt') === null) {
      altDisplay.setAttribute('error',1);
      out += 'No alt attribute!';
    } else {
      if(e.target.alt === '') {
        out += 'Empty alt text!';
      }
      if (e.target.alt !== '') {
        out += `"${e.target.alt}"`;
      }
    }
    altDisplay.setAttribute('alttext', out);
  };

  let allimgs = document.querySelectorAll('img');
  allimgs.forEach(i => {
    i.addEventListener('mouseover', overimg);
    i.addEventListener('mouseout', outimg);
  });
})();