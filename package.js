Package.describe({
  summary: 'Behaviors for Meteor Astronomy',
  version: '0.2.0',
  name: 'jagi:astronomy-behaviors',
  git: 'https://github.com/jagi/meteor-astronomy-behaviors.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@0.4.1');
  api.use('underscore');

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles('lib/module/global.js', ['client', 'server']);
  api.addFiles('lib/module/schema.js', ['client', 'server']);
  api.addFiles('lib/module/behavior.js', ['client', 'server']);
  api.addFiles('lib/module/module.js', ['client', 'server']);
});
