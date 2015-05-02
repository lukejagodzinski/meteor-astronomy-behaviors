Astronomy.Behavior = function(behaviorDefinition) {
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
  if (_.has(Behaviors, behaviorDefinition.name)) {
    throw new Error(
      'The behavior with the name "' +
      behaviorDefinition.name + '" is already defined'
    );
  }

  // Add a behavior definition to the global list of behaviors.
  Behaviors[behaviorDefinition.name] = behaviorDefinition;

  // Add aliases.
  if (
    _.has(behaviorDefinition, 'aliases') &&
    _.isArray(behaviorDefinition.aliases)
  ) {
    _.each(behaviorDefinition.aliases, function(alias) {
      Behaviors[alias] = Behaviors[behaviorDefinition.name];
    });
  }
};
