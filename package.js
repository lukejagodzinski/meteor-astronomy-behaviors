Package.describe({
  summary: 'Behaviors for Meteor Astronomy',
  version: '0.1.1',
  name: 'jagi:astronomy-behaviors',
  git: 'https://github.com/jagi/meteor-astronomy-behaviors.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use('jagi:astronomy@0.2.0');
  api.use('underscore');

  // Module.
  api.addFiles('lib/module/global.js', ['client', 'server']);
  api.addFiles('lib/module/schema.js', ['client', 'server']);
  api.addFiles('lib/module/behavior.js', ['client', 'server']);
  api.addFiles('lib/module/module.js', ['client', 'server']);

  // Behaviors.
  api.addFiles('lib/behaviors/nestedset/node.js', ['client', 'server']);
  api.addFiles('lib/behaviors/nestedset/nestedset.js', ['client', 'server']);
  api.addFiles('lib/behaviors/sort/sort.js', ['client', 'server']);
  api.addFiles('lib/behaviors/timestamp/timestamp.js', ['client', 'server']);
});
