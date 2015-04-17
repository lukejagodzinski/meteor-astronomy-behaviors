Astronomy.Behavior = function(behaviorDefinition) {
  // Check parameters validity.
  if (!_.isObject(behaviorDefinition)) {
    throw new Error('Behavior definition has to be an object');
  }
  // Check if behavior name is provided.
  if (!_.has(behaviorDefinition, 'name')) {
    throw new Error('Behavior name can not be empty');
  }
  // Check if behavior name is a string.
  if (!_.isString(behaviorDefinition.name)) {
    throw new Error('Behavior name has to be a string');
  }
  // Check if behavior with given name already exists.
  if (_.has(Behaviors, behaviorDefinition.name)) {
    throw new Error('Behavior with the name `' + behaviorDefinition.name + '` is already defined');
  }

  // Add behavior constructor to global list of behaviors.
  Behaviors[behaviorDefinition.name] = behaviorDefinition;
};
