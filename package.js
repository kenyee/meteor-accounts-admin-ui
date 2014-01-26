Package.describe({
  summary : "Extensible User Admin UI for Meteor"
});

Package.on_use(function(api) {
  // these two core packages have to be referenced as of Meteor 0.6.5
  api.use('standard-app-packages', ['client', 'server']);

  // other packages used
  api.use('jquery', 'client');
  api.use('bootstrap', 'client');
  api.use('jqbootstrapvalidation', 'client');
  api.use('roles', ['client', 'server']);

  var path = Npm.require('path');

  api.add_files(path.join('common', 'user-helpers.js'), ['client', 'server']);
  api.add_files(path.join('common', 'useradmin-collections.js'), ['client', 'server']);

  api.add_files(path.join('dialogs', 'deleteuser.html'), 'client');
  api.add_files(path.join('dialogs', 'deleteuser.js'), 'client');
  api.add_files(path.join('dialogs', 'edituser.html'), 'client');
  api.add_files(path.join('dialogs', 'edituser.js'), 'client');
  api.add_files(path.join('dialogs', 'infouser.html'), 'client');
  api.add_files(path.join('dialogs', 'infouser.js'), 'client');
  
  api.add_files(path.join('templates', 'adminusers.html'), 'client');
  api.add_files(path.join('templates', 'adminusers.js'), 'client');

  api.add_files(path.join('methods', 'adminusermethods.js'), 'server');

  // these exports should really have been done as UserAdmin.* methods :-(
  api.export && api.export('createUserAdminRoles', 'server');
  api.export && api.export('bounceNonUserAdmin', 'client');
  api.export && api.export('displayName');
  api.export && api.export('contactEmail');
});

