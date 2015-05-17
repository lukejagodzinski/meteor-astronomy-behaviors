Package.describe({
  summary: 'Behaviors for Meteor Astronomy',
  version: '0.4.0',
  name: 'jagi:astronomy-behaviors',
  git: 'https://github.com/jagi/meteor-astronomy-behaviors.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@0.8.0');
  api.use('underscore');

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles('lib/module/global.js', ['client', 'server']);
  api.addFiles('lib/module/utils.js', ['client', 'server']);
  api.addFiles('lib/module/behavior.js', ['client', 'server']);
  api.addFiles('lib/module/init_class.js', ['client', 'server']);
  api.addFiles('lib/module/module.js', ['client', 'server']);
});
