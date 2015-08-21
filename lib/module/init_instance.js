Astro.eventManager.on('initInstance', function(attrs) {
  var doc = this;
  var Class = doc.constructor;
  var behaviors = Class.getBehaviors();

  _.each(behaviors, function(behaviorData, behaviorName) {
    var behavior = Astro.behaviors[behaviorName];
    if (behavior.events && behavior.events.initinstance) {
      behavior.events.initinstance.call(Class, attrs);
    }
  });
});
