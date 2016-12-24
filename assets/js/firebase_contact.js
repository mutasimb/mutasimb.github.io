var database = firebase.database();

function postNewMessage(vEmail, vName, vMsg, vPhone = false) {
  var newMessage = {
    email: vEmail,
    name: vName,
    msg: vMsg
  };

  if(vPhone) newMessage['phone'] = vPhone;

  var newKey = firebase.database().ref().child('posts').push().key,
      updates = {};

  updates['/posts/' + newKey] = newMessage;

  return firebase.database().ref().update(updates);
}
