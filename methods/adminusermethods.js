//// User admin methods
if (typeof(AdminUser) === 'undefined') {
  AdminUser = {};
  // add callback functions for deletingUserMethod(id), savingUserMethod(options) if you want
  // returning false from those callbacks cancel the delete/save methods
}

Meteor.methods({
  deleteUser: function(options) {
    // options should include: id
    options = options || {};
    if (! (typeof options.id === "string")) {
      throw new Meteor.Error(400, "Required parameter missing");
    }
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }
    if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
      throw new Meteor.Error(401, "Unauthorized to delete user");
    }
    var user = Meteor.users.findOne({ _id: options.id });
    if (user == null) {
      throw new Meteor.Error(402, "User not found");
    }
    // call custom delete hook
    if (AdminUser.deletingUserMethod && !AdminUser.deletingUserMethod(options.id)) {
      // returning false from savingUser cancels delete
      return false;
    }
    Meteor.users.remove({ _id: options.id });
    //console.log("User " + options.id + " deleted");
  },
  updateUser: function(options) {
    // options should include: id, username, email, roles
    options = options || {};
    if ( !(typeof options.id === "string") ||
      !(typeof options.username === "string") ||
      !(typeof options.email === "string") ||
      !(options.roles instanceof Array) ) {
      throw new Meteor.Error(400, "Required parameter missing");
    }
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }
    if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
      throw new Meteor.Error(401, "Unauthorized to edit user");
    }
    var user = Meteor.users.findOne({ _id: options.id });
    if (user == null) {
      throw new Meteor.Error(402, "User not found");
    }
    // call custom update hook
    if (AdminUser.savingUserMethod && !AdminUser.savingUserMethod(options)) {
      // returning false from savingUser cancels delete
      return false;
    }
    // now do the actual user update (this is painful because of the subarrays)
    if (user.email) {
      Meteor.users.update({ _id: options.id, 'emails.address': user.emails[0].address },
			{ $set: {'profile.name': options.username,
			    'emails.$.address': options.email,
			    roles: options.roles}
			});
    } else {
      // OAuth users don't always have the emails array
      Meteor.users.update({ _id: options.id },
			{ $set: {'profile.name': options.username,
			    emails: [{ "address": options.email, "verified": false}],
			    roles: options.roles}
			});
    }
  }
});


createUserAdminRoles = function() {
  try {
    Roles.createRole("admin");
    Roles.createRole("user-admin");
  } catch (error) {
  }
};

/*
AdminUser.deletingUserMethod = function(id) {
  console.log('blocking user delete of ' + id);
  return false;
};

AdminUser.savingUserMethod = function(options) {
  console.log('blocking user update of ' + options.id);
  return false;
};
*/