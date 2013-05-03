///////////////////////////////////////////////////////////////////////////////
// Edit User Dialog

openEditUserDialog = function(userid) {
  if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
    return;
  }
  Template.editUserDialog.user = Meteor.users.findOne({ _id: userid });
  if (Template.editUserDialog.user) {
    Session.set("editUserId", userid);
    Session.set("showEditUserDialog", true);
  }
};
Template.editUserDialog.events({
  'click .edituser .save': function (event, template) {
    if ($("form.edituser :input").jqBootstrapValidation("hasErrors")) {
      return;
    }
    var username = $.trim(template.find(".username").value);
    var email = template.find(".email").value;
    var roles = [];
    $('form.edituser input[name=roles]:checked').each(function() {
      roles.push($(this).val());
    });

    if (AdminUser.savingUser && !AdminUser.savingUser(Session.get('editUserId'), template)) {
      // returning false from savingUser cancels delete
      return false;
    }

    Meteor.call('updateUser', {
      id: Session.get('editUserId'),
      username: username,
      email: email,
      roles: roles,
      custom: AdminUser.customUserProps
    }, function (error) {
      if (error) {
	alert('Error saving user changes: ' + error.reason);
      }
    });
    Session.set("showEditUserDialog", false);
    return false;
  },

  'click .edituser .cancel': function () {
    Session.set("showEditUserDialog", false);
    return false;
  }
});
Template.editUserDialog.rendered = function() {
  $("form.edituser :input").jqBootstrapValidation();
};
Template.editUserDialog.helpers({
  user: function() {
    return Template.editUserDialog.user;
  },
  username: function() {
    return displayName(Template.editUserDialog.user);
  },
  useremail: function() {
    var email = contactEmail(Template.editUserDialog.user);
    return (email == null) ? "" : email;
  },
  roles: function() {
    return Roles.getAllRoles();
  },
  hasrole: function() {
    return Roles.userIsInRole(Template.editUserDialog.user, this.name);
  }
});
