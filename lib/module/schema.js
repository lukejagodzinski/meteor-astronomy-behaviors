var prototype = Astronomy.Schema.prototype;

prototype.hasBehavior = function(type) {
  if (!_.isString(type)) {
    return false;
  }

  return _.has(this._behaviors, type);
};

prototype.getBehavior = function(type) {
  if (!_.isString(type)) {
    return;
  }

  return this._behaviors[type];
};

prototype.getBehaviors = function() {
  return this._behaviors;
};

prototype.addBehavior = function(behaviorName, behaviorData) {
  // We have to make sure that all the necessary data is provided. Later, when
  // calling behavior methods, we shouldn't think about checking whether user
  // provided all the data. It's why we are doing it here.

  // Check if behavior name has been provided.
  if (!_.isString(behaviorName)) {
    throw new Error(
      'The behavior name in `' + this.getName() +
      '` class schema has to be a string'
    );
  }

  // Check whether given bahavior exists.
  if (!_.has(Behaviors, behaviorName)) {
    throw new Error(
      'The `' + behaviorName + '` behavior in `' + this.getName() +
      '` class schema does not exist'
    );
  }

  // Check if behavior data is an object.
  if (!_.isObject(behaviorData)) {
    throw new Error(
      'The behavior data in `' + this.getName() +
      '` class schema has to be an object'
    );
  }

  // Check if given behavior is already added to this or parent schemas.
  var Class = this.getClass();
  var schema;
  if (schema = _.find(Class.schemas, function(schema) {
      return schema.hasBehavior(behaviorName);
    })) {
    throw new Error(
      'The `' + behaviorName + '` behavior had already been added in `' +
      schema.getName() + '` class schema '
    );
  }

  // Get copy of behavior. We have to make copy because use could pass custom
  // options and we can't share these options among all schemas with given
  // behavior.
  var behavior = new Object(Behaviors[behaviorName]);

  // Init copy of behavior with behavior data passed to the class schema.
  behavior.init(behaviorData);

  // Init schema with behavior.
  behavior.initSchema(this);

  // Add behavior copy to behaviors list of given schema under the key equal
  // to behavior type.
  this._behaviors[behaviorName] = behavior;
};

prototype.addBehaviors = function(behaviors) {
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
