(function(){
  const getposition = ev => {
    let x = ev.clientX;
    let y = ev.clientY;
    let pos = ev.target.getBoundingClientRect();
    return {
      x: x - pos.x|0,
      y: y - pos.y|0
    };
  }
  let altDisplay = document.createElement('div');
  document.body.appendChild(altDisplay);
  altDisplay.style.position = 'absolute';
  altDisplay.style.background = 'yellow';
  altDisplay.style.padding = '10px';
  altDisplay.style.fontFamily = 'Sans-serif';
  altDisplay.style.maxWidth = '150px';
  altDisplay.style.overflow = 'scroll';
  altDisplay.style.top = '-100px';
  altDisplay.style.fontSize = '14px';
  altDisplay.style.color = 'black';
  altDisplay.style.pointerEvents = 'none';
  let allimgs = document.querySelectorAll('img');
  allimgs.forEach(i => {
    i.addEventListener('mouseover',e => {
      e.target.style.opacity = 0.7;
      let mouse = getposition(e);
      let top = mouse.y + window.scrollY + 5 + 'px';
      let left = mouse.x + 5 + 'px';

      if(mouse.x+20+150 > window.innerWidth) {
        left = mouse.x - 160 + 'px';
      }

      altDisplay.style.top = top;
      altDisplay.style.left = left;

      if(e.target.alt === '') {
        altDisplay.style.border = '1px solid #c00';
        altDisplay.innerHTML = 'No alt text!';
      } else {
        altDisplay.style.border = '1px solid yellow';
        altDisplay.innerHTML = e.target.alt
      }
    });
    i.addEventListener('mouseout',e => {
      e.target.style.opacity = 1;
      altDisplay.style.left = '-100vw';
      altDisplay.innerHTML = ''
    });
  });
})();