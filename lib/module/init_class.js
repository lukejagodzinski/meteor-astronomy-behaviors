var checks = {};

checks.behaviorName = function(behaviorName) {
  if (!_.isString(behaviorName)) {
    throw new Error(
      'The behavior name in the "' + this.getName() +
      '" class schema has to be a string'
    );
  }
};

checks.exists = function(behaviorName) {
  if (!_.has(Astro.behaviors, behaviorName)) {
    throw new Error(
      'The "' + behaviorName + '" behavior in "' + this.getName() +
      '" class schema does not exist'
    );
  }
};

checks.behaviorData = function(behaviorName, behaviorData) {
  if (!_.isObject(behaviorData)) {
    throw new Error(
      'The behavior data in "' + this.getName() +
      '" class schema has to be an object'
    );
  }
};

checks.added = function(behaviorName) {
  var Class = this;

  if (Class.hasBehavior(behaviorName)) {
    throw new Error(
      'The "' + behaviorName + '" behavior in the "' +
      this.getName() + '" class schema had already been added'
    );
  }
};

var methods = {};

methods.hasBehavior = function(behaviorName) {
  // Check if the behavior name has been provided
  checks.behaviorName.call(this, behaviorName);

  return _.has(this.schema.behaviors, behaviorName);
};

methods.getBehavior = function(behaviorName) {
  // Check if the behavior name has been provided
  checks.behaviorName.call(this, behaviorName);

  return this.schema.behaviors[behaviorName];
};

methods.getBehaviors = function(behaviorsNames) {
  if (_.isArray(behaviorsNames)) {
    return _.pick(this.schema.behaviors, behaviorsNames);
  }
  return this.schema.behaviors;
};

methods.addBehavior = function(behaviorName, behaviorData) {
  behaviorData = behaviorData || {};

  // Check if the behavior name has been provided
  checks.behaviorName.call(this, behaviorName);
  // Check if the given bahavior exists.
  checks.exists.call(this, behaviorName);
  // Check if the behavior data is an object.
  checks.behaviorData.call(this, behaviorName, behaviorData);
  // Check if the given behavior is already added to this or parent classes.
  checks.added.call(this, behaviorName);

  // Add behavior copy to behaviors list of given schema under the key equal
  // to behavior type.
  this.schema.behaviors[behaviorName] = behaviorData;

  // Get behavior definition.
  var behavior = Astro.behaviors[behaviorName];
  // Trigger "addbehavior" event.
  if (behavior.events && behavior.events.addbehavior) {
    behavior.events.addbehavior.call(this, behaviorData);
  }
};

methods.addBehaviors = function(behaviors) {
  if (_.isArray(behaviors)) {

    _.each(behaviors, function(behaviorName) {
      this.addBehavior(behaviorName);
    }, this);

  } else if (_.isObject(behaviors)) {

    _.each(behaviors, function(behavior, behaviorName) {
      this.addBehavior(behaviorName, behavior);
    }, this);

  } else {

    // Behaviors data has to be an object or an array.
    throw new Error(
      'The behavior data in the "' + this.getName() +
      '" class schema has to ' +
      'be an object or an array'
    );

  }
};

Astro.eventManager.on('initClass', function(schemaDefinition) {
  var Class = this;

  _.extend(Class, methods);

  // Add the "behaviors" attribute to the schema.
  Class.schema.behaviors = {};

  if (_.has(schemaDefinition, 'behaviors')) {
    Class.addBehaviors(schemaDefinition.behaviors);

    // Trigger on "initclass" event if it is provided. We do it here because we
    // are already in the process of execution "initclass" events, so adding it
    // to class would have no effect.
    _.each(Class.getBehaviors(), function(behaviorData, behaviorName) {
      var behavior = Astro.behaviors[behaviorName];
      if (behavior.events && behavior.events.initclass) {
        behavior.events.initclass.call(Class, schemaDefinition);
      }
    });
  }
});
