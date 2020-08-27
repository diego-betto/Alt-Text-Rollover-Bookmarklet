(function(){
  let altDisplay = document.createElement('div');
  document.body.appendChild(altDisplay);
  altDisplay.style.position = 'fixed';
  altDisplay.style.background = 'yellow';
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

  altDisplay.onmousedown = initiatedrag;

  let swatchx = 0;
  let swatchy = 0;
  let mousex = 0;
  let mousey = 0;

  function initiatedrag(e) {
    e = e || window.event;
    e.preventDefault();
    mousex = e.clientX;
    mousey = e.clientY;
    document.onmouseup = enddrag;
    document.onmousemove = startdrag;
  }
  function startdrag(e) {
    e = e || window.event;
    e.preventDefault();
    swatchx = mousex - e.clientX;
    swatchy = mousey - e.clientY;
    mousex = e.clientX;
    mousey = e.clientY;
    altDisplay.style.top = (altDisplay.offsetTop - swatchy) + "px";
    altDisplay.style.left = (altDisplay.offsetLeft - swatchx) + "px";
  }
  function enddrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

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