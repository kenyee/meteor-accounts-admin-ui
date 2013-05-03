// user admin collections

getAppUsers = function(regex, pagemax, curpage) {
  var userid = (Meteor.isClient) ? Meteor.userId() : this.userId;
  var user = Meteor.users.findOne({ _id: userid });
  if (!Roles.userIsInRole(user, ['admin','user-admin'])) {
    console.log("user is not an admin");
    return null;
  }
  var users = null;
  if (regex) {
    users = Meteor.users.find({
      $or: [{ 'profile.name': { $regex: regex, $options: 'i' } },
	    { 'emails.address': { $regex: regex, $options: 'i' } }] }
	    , {sort: {'profile.name': 1}});
  } else {
    var page = 0;
    users = Meteor.users.find({}, {sort: {'profile.name': 1}});
  }
  return users;
}
getAllRoles = function() {
  return Meteor.roles.find({}, {sort: {'profile.name': 1}});
}

if (Meteor.isClient) {  
  // subscribe to published data
  Deps.autorun(function () {
    Meteor.subscribe("appUsers", Session.get("userFilter"), Session.get("usersPerPage"), Session.get("userPage"));
    Meteor.subscribe("allRoles");
  });
}
if (Meteor.isServer) {
  Meteor.publish("appUsers", getAppUsers);
  Meteor.publish("allRoles", getAllRoles);
}
