Astro.createModule({
  name: 'behaviors',
  events: {
    initclass: onInitClass,
    initinstance: onInitInstance
  }
});
