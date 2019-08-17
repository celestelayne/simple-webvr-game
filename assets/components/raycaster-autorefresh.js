console.log('this is the raycaster autorefresh');

AFRAME.registerComponent('raycaster-autorefresh', {
    init: function () {
        const el = this.el;
        el.addEventListener('model-loaded', () => {
          console.log('the raycaster')
          const raycasterEl = el.querySelector('[raycaster]');
          raycasterEl.components.raycaster.refreshObjects();
        });
    }
});
