(function(){
  let altDisplay = document.createElement('div');
  document.body.appendChild(altDisplay);
  altDisplay.style.position = 'absolute';
  altDisplay.style.background = 'yellow';
  altDisplay.style.padding = '10px';
  altDisplay.style.fontFamily = 'Sans-serif';
  altDisplay.style.maxWidth = '150px';
  altDisplay.style.overflow = 'scroll';
  altDisplay.style.top = '-100px';
  altDisplay.style.color = 'black';
  altDisplay.style.pointerEvents = 'none';
  let allimgs = document.querySelectorAll('img');
  let out = '';
  allimgs.forEach(i => {
    i.addEventListener('mouseover',e => {
      e.target.style.opacity = 0.7;
      let coords = e.target.getBoundingClientRect();
      altDisplay.style.top = coords.top + 5 + 'px';
      if(coords.left+coords.width+10+150 > window.innerWidth) {
        altDisplay.style.left = coords.left - 140 + 'px';
      } else {
        altDisplay.style.left = coords.left + coords.width - 30 + 'px';
      }
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