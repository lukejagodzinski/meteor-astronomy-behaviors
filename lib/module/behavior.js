var checks = {};

checks.behaviorDefinition = function(behaviorDefinition) {
  // Check parameters validity.
  if (!_.isObject(behaviorDefinition)) {
    throw new Error('The behavior definition has to be an object');
  }

  // Check if behavior name is provided.
  if (!_.has(behaviorDefinition, 'name')) {
    throw new Error('The behavior name can not be empty');
  }

  // Check if behavior name is a string.
  if (!_.isString(behaviorDefinition.name)) {
    throw new Error('The behavior name has to be a string');
  }

  // Check if behavior with given name already exists.
  if (_.has(Astro.behaviors, behaviorDefinition.name)) {
    throw new Error(
      'The behavior with the name "' +
      behaviorDefinition.name + '" is already defined'
    );
  }
};

Astro.createBehavior = function(behaviorDefinition) {
  // Check validity of the behavior definition.
  checks.behaviorDefinition(behaviorDefinition);

  // Initialize a module if the "init" method had been defined.
  if (_.isFunction(behaviorDefinition.init)) {
    behaviorDefinition.init();
  }

  // Add the behavior definition to the global list of behaviors.
  return Astro.behaviors[behaviorDefinition.name] = behaviorDefinition;
};
