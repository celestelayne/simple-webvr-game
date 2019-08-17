console.log('this is the cursor listener');

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    let el = this.el;
    el.addEventListener('click', function(evt){
      if (el.parentNode.hasChildNodes()){
        console.log('I was clicked', el);
        el.parentNode.removeChild(el);
      }
    })
  }
});
