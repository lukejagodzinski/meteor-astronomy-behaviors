Astro.utils.behaviors = {
  findBehavior: function(Class, behaviorName) {
    return Astro.utils.class.findInClass(Class, function(Class) {
      return Class.getBehavior(behaviorName);
    });
  }
};
