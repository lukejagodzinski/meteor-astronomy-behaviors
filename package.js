Package.describe({
  summary: 'Behaviors for Meteor Astronomy',
  version: '0.6.0',
  name: 'jagi:astronomy-behaviors',
  git: 'https://github.com/jagi/meteor-astronomy-behaviors.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@0.10.0');
  api.use('underscore');

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles([
    'lib/module/global.js',
    'lib/module/behavior.js',
    'lib/module/class_behavior.js',
    'lib/module/create_behavior.js',
    'lib/module/init_definition.js',
    'lib/module/init_schema.js',
    'lib/module/init_class.js'
  ], ['client', 'server']);
});
