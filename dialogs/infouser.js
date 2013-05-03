///////////////////////////////////////////////////////////////////////////////
// User Info Dialog

openInfoUserDialog = function(userid) {
  if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
    return;
  }
  Template.infoUserDialog.user = Meteor.users.findOne({ _id: userid });
  if (Template.infoUserDialog.user) {
    Session.set("dlgInfoUserId", userid);
    Session.set("dlgUserName", displayName(Template.infoUserDialog.user));
    Session.set("showInfoUserDialog", true);
  }
};
Template.infoUserDialog.events({
  'click .cancel': function () {
    Session.set("showInfoUserDialog", false);
    return false;
  }
});
Template.infoUserDialog.helpers({
  user: function() {
    return Template.infoUserDialog.user;
  },
  username: function () {
    return Session.get("dlgUserName");
  }
});
