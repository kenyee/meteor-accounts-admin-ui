meteor-accounts-admin-ui
=======================

This is a User Admin UI for Meteor.js' Accounts.  It provides a way to add roles to users and change their usernames and email addresses.

How to use
----------

	mrt add accounts-admin-ui
	
Add a call to createUserAdminRoles in your Meteor.startup code.
This will add the admin and user-admin roles (if you have custom roles for your
own applicaton, you should also add them during startup):

		Meteor.startup(function () {
		  createUserAdminRoles();
		});

In addition, the first user has to have the roles set manually.  You can do this in
MongoDB directly by doing this (replace xxx with the appropriate ID):

		db.users.update({"_id" : "xxx"}, {$set: {roles: ["admin", "user-admin"]}})

or you can use the Roles package's API to do this in your startup() function:

		Roles.addUsersToRoles("xxx", ["admin", "user-admin"]);


Customizing Templates
---------------------

Add an .html file to your application with these templates defined:

		<template name="customUserListHeaders">
		</template>
		<template name="customUserListFields">
		</template>

		<template name="customUserInfoFields">
		</template>
		<template name="customUserEditFields">
		</template>

The customUserListFields/Headers templates are used to add more user properties
to the list of users view.
The customUserEditFields template is used to edit extra user properties in the
edit user dialog.

Client-Side User Update Hooks
-----------------------------

On the browser/client side, you can add hooks for deleting and saving a user
by adding this to your client side Javascript:

		AdminUser.deletingUser = function(id) {
		  if (console) {
		    console.log("Deleting user " + id);
		  }
		  return true;
		};

		AdminUser.savingUser = function(id, template) {
		  if (console) {
		    console.log("Saving user " + id);
		  }
		  // set AdminUser.customUserProps w/ any custom properties you want to set
		  return true;
		};

Server-Side User Update Hooks
-----------------------------

On the server side, you can hook into the deletion/saving process by adding
this to your server-side Javascript:

		AdminUser.deletingUserMethod = function(id) {
		  console.log('blocking user delete of ' + id);
		  return false;
		};

		AdminUser.savingUserMethod = function(options) {
		  console.log('blocking user update of ' + options.id);
		  return false;
		};

On saving, if you have any extra properties that you added on the client, they'll
end up on the server in the options.custom field so you can handle them in your
savingUserMethod.

Using Mini-Pages Package
---------------------------

In your mini-pages configuration, add an appropriate URL for the admin pages:

		'/admin': { to: 'adminusers', nav: 'adminusers', before: [loggingIn,bounceNonUserAdmin] },

The bounceNonUserAdmin() function is provided by this package and will redirect
the user to "/" if the user-admin or admin roles are not detected.

Using Iron-Router Package
-------------------------

In your iron-router configuration, add this:

		Router.configure({
		  layoutTemplate: 'layout'
		});

		Router.map(function () {
		  this.route('home', {
		    path: '/',
		    template: 'home'
		  });

		  this.route('admin', {
		    path: '/admin',
		    template: 'adminusers',
		    onBeforeAction: function() {
		      if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
		        this.redirect("/");
		      }
		    }
		  });
		});


Contributing
------------

If anyone wants to improve on this, please submit a pull request w/ your changes.
