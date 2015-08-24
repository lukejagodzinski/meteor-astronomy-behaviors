Astro.eventManager.on('initSchema', function(schemaDefinition) {
  var schema = this;

  // Add the "behaviors" attribute to the schema.
  schema.behaviors = schema.behaviors || {};
});
