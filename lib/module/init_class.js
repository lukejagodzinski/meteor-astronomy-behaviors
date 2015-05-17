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
  if (!_.has(Behaviors, behaviorName)) {
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
  Class = Astro.Utils.findClass(this, function(Class) {
    return Class.hasBehavior(behaviorName);
  });

  if (Class) {
    throw new Error(
      'The "' + behaviorName + '" behavior had already been added to the "' +
      this.getName() + '" class schema '
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

methods.getBehaviors = function() {
  return this.schema.behaviors;
};

methods.addBehavior = function(behaviorName, behaviorData) {
  // We have to make sure that all the necessary data is provided. Later, when
  // calling behavior methods, we shouldn't think about checking whether user
  // provided all the data. It's why we are doing it here.

  // Check if the behavior name has been provided
  checks.behaviorName.call(this, behaviorName);
  // Check if the given bahavior exists.
  checks.exists.call(this, behaviorName);
  // Check if the behavior data is an object.
  checks.behaviorData.call(this, behaviorName, behaviorData);
  // Check if the given behavior is already added to this or parent schemas.
  checks.added.call(this, behaviorName);

  // Get copy of behavior. We have to make copy because use could pass custom
  // options and we can't share these options among all schemas with given
  // behavior.
  var behavior = EJSON.clone(Behaviors[behaviorName]);

  // Init a copy of the behavior with the behavior data passed to the class
  // schema.
  if (_.isFunction(behavior.oninitbehavior)) {
    behavior.oninitbehavior(behaviorData);
  }

  // Init schema with behavior.
  if (_.isFunction(behavior.oninitclass)) {
    behavior.oninitclass(this);
  }

  // Add behavior copy to behaviors list of given schema under the key equal
  // to behavior type.
  this.schema.behaviors[behaviorName] = behavior;
};

methods.addBehaviors = function(behaviors) {
  if (_.isArray(behaviors)) {

    _.each(behaviors, function(behaviorName) {
      this.addBehavior(behaviorName, {});
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

onInitClass = function(schemaDefinition) {
  var Class = this;

  _.extend(Class, methods);

  // Add the "behaviors" attribute to the schema.
  Class.schema.behaviors = {};

  if (_.has(schemaDefinition, 'behaviors')) {
    Class.addBehaviors(schemaDefinition.behaviors);
  }
};
