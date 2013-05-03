///////////////////////////////////////////////////////////////////////////////
// Delete User Dialog

openDeleteUserDialog = function(userid) {
  if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
    return;
  }
  var user = Meteor.users.findOne({ _id: userid });
  if (user) {
    Session.set("dlgDeleteUserId", userid);
    Session.set("dlgUserName", displayName(user));
    Session.set("showDeleteUserDialog", true);
  }
};
Template.deleteUserDialog.events({
  'click .confirm': function (event, template) {
      if (AdminUser.deletingUser && !AdminUser.deletingUser(Session.get("dlgDeleteUserId"))) {
	// returning false from deletingUser cancels delete
	return false;
      }
      Meteor.call('deleteUser', {
        id: Session.get("dlgDeleteUserId")
      }, function (error, userId) {
        if (error) {
	  alert('Could not delete user! ' + error.reason);
	}
      });
    Session.set("showDeleteUserDialog", false);
    return false;
  },
  'click .cancel': function () {
    Session.set("showDeleteUserDialog", false);
    return false;
  }
});
Template.deleteUserDialog.helpers({
  username: function () {
    return Session.get("dlgUserName");
  }
});
