Astro.utils.findBehavior = function(Class, behaviorName) {
  return Astro.utils.findInClass(Class, function(Class) {
    return Class.getBehavior(behaviorName);
  });
};
