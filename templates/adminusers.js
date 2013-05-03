//// user list admin
if (typeof(AdminUser) === 'undefined') {
  AdminUser = {};
  // add callback functions for deletingUser(id), savingUser(id, template) if you want
  // returning false from those callbacks cancel the delete/save events
}

// this function can be used by your mini-pages routing
bounceNonUserAdmin = function() {
  if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
    this.redirect("/");
  }
}

function getFilteredUsers()
{
  // this converts the search string into a wildcard regex before calling getAppUsers
  var regex = null;
  if (Session.get("matchstring") != null) {
    regex = ".*" + Session.get("matchstring") + ".*";
  }
  var users = getAppUsers(regex);
  return users;
}

Template.adminusers.helpers({
  users: function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
      return null;
    }
    return getFilteredUsers();
  },
  useremail: function() {
    // bit of a pain because we can't just use emails[0].address with OAuth users
    var thisuser = Meteor.users.findOne({ _id: this._id });
    var email = contactEmail(thisuser);
    if (email == null) {
      return "";
    } else {
      return email;
    }
  },
  searchstring: function() {
    return Session.get("userFilter");
  },
  isNotMe: function() {
    if (Session.get("userFilter")) {
      return (this._id != Meteor.userId());
    } else {
      return true;
    }
  },
  showDeleteUserDialog: function() {
    return Session.get("showDeleteUserDialog");
  },
  showEditUserDialog: function() {
    return Session.get("showEditUserDialog");
  },
  showInfoUserDialog: function() {
    return Session.get("showInfoUserDialog");
  }
});

function getUIDFromEvent(event)
{
  return $(event.target).parent().parent().attr('uid')
}

var timerid = null;
Template.adminusers.events({
  'keypress .search-query': function(event) {
    if (event.charCode == 13) {
	alert('you hit enter');
	event.stopPropagation();
	return false;
    }
  },
  'keyup .search-query': function(event, template) {
    clearTimeout(timerid);
    timerid = setTimeout(function() {
	var search = template.find(".search-query").value;
	Session.set("userFilter", search);
      }, 1000);
    return false;
  },
  'click .icon-trash': function(event, template) {
    var id = getUIDFromEvent(event);
    if (id) {
      openDeleteUserDialog(id);
    }
  },
  'click .icon-edit': function(event, template) {
    var id = getUIDFromEvent(event);
    if (id) {
      openEditUserDialog(id);
    }
  },
  'click .icon-info-sign': function(event, template) {
    var id = getUIDFromEvent(event);
    if (id) {
      openInfoUserDialog(id);
    }
  }
});
