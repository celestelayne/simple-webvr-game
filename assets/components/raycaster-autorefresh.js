AFRAME.registerComponent('raycaster-autorefresh', {
    init: function () {
        var el = this.el;
        this.el.addEventListener('model-loaded', function () {
          console.log('the raycaster')
            // var cursorEl = el.querySelector('[raycaster]');
            // cursorEl.components.raycaster.refreshObjects();
        });
    }
});
