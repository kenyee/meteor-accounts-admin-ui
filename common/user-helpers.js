//// User info helper methods because stuff isn't in a single spot for all auth methods :-P
displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  if (user.name)
    return user.name;
  if (user.emails && (user.emails.length > 0))
    return user.emails[0].address;
  if (user.services) {
     //Iterate through services
    for (var serviceName in user.services) {
      var serviceObject = user.services[serviceName];
      //If an 'id' isset then assume valid service
      if (serviceObject.id) {
	if (serviceObject.name) {
	  return serviceObject.name;
	}
	if (serviceObject.email) {
	  return serviceObject.email;
	}
      }
    }
  }
  return (user._id);
};

contactEmail = function (user) {
  if (!user) {
    return null;
  }
  if (user.emails && user.emails.length) {
    return user.emails[0].address;
  }
  if (user.services) {
     //Iterate through services
    for (var serviceName in user.services) {
      var serviceObject = user.services[serviceName];
      //If an 'id' isset then assume valid service
      if (serviceObject.id) {
	if (serviceObject.email) {
	  return serviceObject.email;
	}
      }
    }
  }
  return null;
};