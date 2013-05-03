Package.describe({
  summary : "Extensable User Admin UI for Meteor"
});

Package.on_use(function(api) {
  api.use('jquery', 'client');
  api.use('bootstrap', 'client');
  api.use('templating', 'client');

  var path = Npm.require('path');

  api.add_files(path.join('common', 'user-helpers.js'), ['client', 'server']);

  api.add_files(path.join('dialogs', 'deleteuser.html'), 'client');
  api.add_files(path.join('dialogs', 'deleteuser.js'), 'client');
  api.add_files(path.join('dialogs', 'edituser.html'), 'client');
  api.add_files(path.join('dialogs', 'edituser.js'), 'client');
  api.add_files(path.join('dialogs', 'infouser.html'), 'client');
  api.add_files(path.join('dialogs', 'infouser.js'), 'client');
  
  api.add_files(path.join('templates', 'adminusers.html'), 'client');
  api.add_files(path.join('templates', 'adminusers.js'), 'client');

  api.add_files(path.join('methods', 'adminusermethods.js'), 'server');
});
