Astro.createBehavior = function(behaviorDefinition) {
  // Add the behavior definition to the global list of behaviors.
  var behavior = Astro.behaviors[behaviorDefinition.name] =
    new Astro.Behavior(behaviorDefinition);

  return behavior;
};
