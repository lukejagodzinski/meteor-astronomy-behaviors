var prototype = Astronomy.Schema.prototype;

prototype.getBehavior = function(type) {
  if (!_.isString(type)) {
    return;
  }

  return this._behaviors[type];
};

prototype.getBehaviors = function() {
  return this._behaviors;
};

prototype.addBehavior = function(behaviorData) {
  // We have to make sure that all the necessary data is provided. Later, when
  // calling behavior methods, we shouldn't think about checking whether user
  // provided all the data. It's why we are doing it here.

  // Check if behavior data is an object.
  if (!_.isObject(behaviorData)) {
    throw new Error(
      'The behavior data in `' + this.getName() +
      '` class schema has to be an object'
    );
  }
  // Check if behavior type has been provided.
  if (!_.has(behaviorData, 'type')) {
    throw new Error(
      'The behavior type in `' + this.getName() +
      '` class schema can not be empty'
    );
  }
  // Check whether given bahavior type exists.
  if (!_.has(Behaviors, behaviorData.type)) {
    throw new Error(
      'The `' + behaviorData.type + '` behavior type in `' + this.getName() +
      '` class schema does not exist'
    );
  }
  // Check if given behavior type is already added to this schema.
  if (_.has(this._behaviors, behaviorData.type)) {
    throw new Error(
      'The `' + behaviorData.type + '` behavior type in `' + this.getName() +
      '` class schema is already defined'
    );
  }

  // Get copy of behavior. We have to make copy because use could pass custom
  // options and we can't share these options among all schemas with given
  // behavior.
  var behavior = new Object(Behaviors[behaviorData.type]);

  // Init copy of behavior with behavior data passed to class schema.
  behavior.init(behaviorData);

  // Add behavior copy to behaviors list of given schema under the key equal
  // to behavior type.
  this._behaviors[behaviorData.type] = behavior;

  // Init schema with behavior.
  behavior.initSchema(this);
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
  }
};
