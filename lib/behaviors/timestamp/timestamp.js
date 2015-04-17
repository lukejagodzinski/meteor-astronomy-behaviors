// List of events that will be added to the schema.
var events = {
  beforeInsert: function() {
    console.log('beforeInsert', this);
    // Get class.
    var Class = this.constructor;
    // Get class schema.
    var schema = Class.schema;
    // Get `Timestamp` behavior from given schema.
    var behavior = schema.getBehavior('Timestamp');

    // If `hasCreatedField` option is set.
    if (behavior.options.hasCreatedField) {
      // Set value for created field.
      this.set(behavior.options.createdFieldName, new Date());
    }
  },
  beforeUpdate: function() {
    // Get class schema.
    var schema = this.constructor;
    // Get `Timestamp` behavior from given schema.
    var behavior = schema.getBehavior('Timestamp');

    // If `hasUpdatedField` option is set.
    if (behavior.options.hasUpdatedField) {
      // Set value for updated field.
      this.set(behavior.options.updatedFieldName, new Date());
    }
  }
};

Astronomy.Behavior({
  name: 'Timestamp',
  options: {
    hasCreatedField: true,
    createdFieldName: 'createdAt',
    hasUpdatedField: true,
    updatedFieldName: 'updatedAt'
  },
  init: function(behaviorData) {
    // Update behavior options with options defined by user in the class schema
    // for given behavior.
    if (_.isObject(behaviorData) && _.has(behaviorData, 'options')) {
      if (_.has(behaviorData.options, 'hasCreatedField') &&
        _.isBoolean(behaviorData.options.hasCreatedField)) {
        this.options.hasCreatedField = behaviorData.options.hasCreatedField;
      }
      if (_.has(behaviorData.options, 'createdFieldName') &&
        _.isString(behaviorData.options.createdFieldName)) {
        this.options.createdFieldName = behaviorData.options.createdFieldName;
      }
      if (_.has(behaviorData.options, 'hasUpdatedField') &&
        _.isBoolean(behaviorData.options.hasUpdatedField)) {
        this.options.hasUpdatedField = behaviorData.options.hasUpdatedField;
      }
      if (_.has(behaviorData.options, 'updatedFieldName') &&
        _.isString(behaviorData.options.updatedFieldName)) {
        this.options.updatedFieldName = behaviorData.options.updatedFieldName;
      }
    }
  },
  initSchema: function(schema) {
    // Add created field to schema if not disabled.
    if (this.options['hasCreatedField']) {
      // Get created field name (can be overridden by user).
      var createdFieldName = this.options['createdFieldName'];
      // Add field of `Date` type.
      schema.addField(createdFieldName, {
        type: Date,
        default: null
      });
    }

    // Add updated field to schema if not disabled.
    if (!this.options['hasUpdatedField']) {
      // Get updated field name (can be overridden by user).
      var updatedFieldName = this.options['updatedFieldName'];
      // Add field of `Date` type.
      schema.addField(updatedFieldName, {
        type: Date,
        default: null
      });
    }

    // Add events to schema.
    schema.addEvents(events);
  }
});
