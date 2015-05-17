Astro.Utils.findBehavior = function(Class, behaviorName) {
  return Astro.Utils.findInClass(Class, function(Class) {
    return Class.getBehavior(behaviorName);
  });
};
