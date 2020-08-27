(function(){
  if (document.querySelector('#alt-text-rollover-bookmark-swatch')) {
    return;
  }
  let styles = document.createElement('link');
  styles.setAttribute('rel','stylesheet');
  styles.setAttribute('href','https://codepo8.github.io/Alt-Text-Rollover-Bookmarklet/alt-text-rollover.css');
//  styles.setAttribute('href','alt-text-rollover.css');
  document.querySelector('head').appendChild(styles);
  let altDisplay = document.createElement('div');
  document.body.appendChild(altDisplay);
  let draghead = document.createElement('h1');
  draghead.innerHTML = 'Drag here';
  altDisplay.appendChild(draghead);
  let swatchtext = document.createElement('p');
  altDisplay.appendChild(swatchtext);
  altDisplay.id = 'alt-text-rollover-bookmark-swatch';
  swatchtext.innerHTML = "Roll over any image<br>Drag to where you want me";

  let closebutton = document.createElement('button');
  closebutton.innerText = 'ⅹ';
  closebutton.title = 'close';
  draghead.appendChild(closebutton);
  closebutton.addEventListener('click', ev => {
    ev.target.parentNode.remove();
    styles.parentNode.removeChild(styles);
    allimgs.forEach(i => {
      i.removeEventListener('mouseover', overimg);
      i.removeEventListener('mouseout', outimg);
    });
    let scripts = document.querySelectorAll('script');
    scripts.forEach(s => {
      if(s.src.indexOf('alt-text-rollover.js') !== -1) {
        s.parentNode.removeChild(s);
      }
    });
  })


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
    altDisplay.style.top = (altDisplay.offsetTop - swatchy) + "px";
    altDisplay.style.left = (altDisplay.offsetLeft - swatchx) + "px";
  }
  const enddrag = _ => {
    document.removeEventListener('mouseup', enddrag);
    document.removeEventListener('mousemove', startdrag);
  }
  draghead.addEventListener('mousedown', initiatedrag);

  const outimg = e => {
    e.target.style.opacity = 1;
  };
  const overimg = e => {
    altDisplay.classList.remove('error');
    e.target.style.opacity = 0.7;
    let out = 'Image: ' + e.target.src.replace(/\/([^\/])/g,'/ $1') +'<br><br>';
    if(e.target.getAttribute('alt') === null) {
      altDisplay.classList.add('error');
      out += 'No alt attribute!';
    } else {
      if(e.target.alt === '') {
        out += 'Empty alt text!';
      }
      if (e.target.alt !== '') {
        out += `"${e.target.alt}"`;
      }
    }
    swatchtext.innerHTML = out;
  };

  let allimgs = document.querySelectorAll('img');
  allimgs.forEach(i => {
    i.addEventListener('mouseover', overimg);
    i.addEventListener('mouseout', outimg);
  });
})();