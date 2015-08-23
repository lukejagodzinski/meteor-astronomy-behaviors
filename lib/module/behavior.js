var checkArguments = function(behaviorDefinition) {
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

Astro.Behavior = function Behavior(behaviorDefinition) {
  var behavior = this;
  checkArguments.apply(behavior, arguments);

  // Initialize a module if the "init" method had been defined.
  // TODO: REMOVE IT.
  if (_.isFunction(behaviorDefinition.init)) {
    behaviorDefinition.init();
  }

  Astro.Events.mixin(behavior);

  this.name = behaviorDefinition.name;
  this.options = behaviorDefinition.options || {};

  if (
    _.has(behaviorDefinition, 'events') &&
    _.isObject(behaviorDefinition.events)
  ) {
    _.each(behaviorDefinition.events, function(eventHandler, eventName) {
      behavior.on(eventName, eventHandler);
    });
  }
};

Astro.Behavior.prototype.copyEvents = function(Class) {
  var behavior = this;

  _.each(behavior._events, function(eventHandlers, eventName) {
    if (eventName !== 'addBehavior' && eventName !== 'initClass') {
      _.each(eventHandlers, function(eventHandler) {
        Class.addEvent(eventName, eventHandler);
      });
    }
  });
};
