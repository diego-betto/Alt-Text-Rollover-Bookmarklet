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
  altDisplay.style.fontSize = '14px';
  altDisplay.style.color = 'black';
  let allimgs = document.querySelectorAll('img');
  allimgs.forEach(i => {
    i.addEventListener('mouseover',e => {
      e.target.style.opacity = 0.7;
      altDisplay.style.left = '10px';
      let out = 'Image: ' + e.target.src +'<br><br>';
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
          out += e.target.alt
        }
      }
      altDisplay.innerHTML = out;
    });
    i.addEventListener('mouseout',e => {
      e.target.style.opacity = 1;
    });
  });
})();