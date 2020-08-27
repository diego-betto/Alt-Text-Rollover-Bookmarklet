(function(){
  if (document.querySelector('#alt-text-rollover-bookmark-swatch')) {
    return;
  }

  // create and style swatch 
  let altDisplay = document.createElement('div');
  document.body.appendChild(altDisplay);
  altDisplay.id = 'alt-text-rollover-bookmark-swatch';
  altDisplay.style.position = 'fixed';
  altDisplay.style.background = 'yellow';
  altDisplay.style.cursor = 'move';
  altDisplay.style.padding = '10px';
  altDisplay.style.fontFamily = 'Sans-serif';
  altDisplay.style.maxWidth = '250px';
  altDisplay.style.overflow = 'scroll';
  altDisplay.style.top = '10px';
  altDisplay.style.left = '10px';
  altDisplay.style.fontSize = '16px';
  altDisplay.style.color = 'black';
  altDisplay.innerHTML = "Roll over any image<br>Drag to where you want me";
  altDisplay.style.boxShadow = '3px 3px 20px #333'

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
  altDisplay.addEventListener('mousedown', initiatedrag);

  let allimgs = document.querySelectorAll('img');
  allimgs.forEach(i => {
    i.addEventListener('mouseover',e => {
      e.target.style.opacity = 0.7;
      let out = 'Image: ' + e.target.src.replace(/\/([^\/])/g,'/ $1') +'<br><br>';
      if(e.target.getAttribute('alt') === null) {
        altDisplay.style.border = '1px solid #c00';
        out += 'No alt attribute!';
      } else {
        if(e.target.alt === '') {
          altDisplay.style.border = '1px solid yellow';
          out += 'Empty alt text!';
        }
        if (e.target.alt !== '') {
          altDisplay.style.border = '1px solid yellow';
          out += `"${e.target.alt}"`;
        }
      }
      altDisplay.innerHTML = out;
    });
    i.addEventListener('mouseout',e => {
      e.target.style.opacity = 1;
    });
  });
})();