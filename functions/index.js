const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase_tools = require("firebase-tools");

admin.initializeApp();


// Checks the last room messaged when a message is created
// and deletes messages if there are over 10;
exports.cleanMessages = functions.firestore
	// rooms/{room_name}/messages/{document_ID}/(message)
	.document('rooms/{room_name}/messages/{message}')
	.onCreate((snap, context) => {
		const ref = admin.firestore().collection("rooms").orderBy("lastMessageTime", "desc").limit(1);
		return ref.get().then(roomDoc => {
			roomDoc.forEach((doc) => {
				// Gets the messageCount field value
				let messageCount = doc.data().messageCount;
				// Store 10 messages so 10 is the osffset
				let amountToDelete = messageCount-10
				if (amountToDelete > 0) {
					// Deletes oldest message 
					const messagesRef = admin.firestore().collection(doc.ref.path + "/messages").orderBy("timestamp").limit(1);
					return messagesRef.get().then(messageDoc => {
						messageDoc.forEach((message) => {
							const messages = message.data();
							console.log("messages: " + messages);

							message.ref.delete().then(() => {
								// Increments messageCount value to accurately reflect new value
								const FieldValue = admin.firestore.FieldValue;
								const pathArray = doc.ref.path.split("/");
								let roomFieldVal = admin.firestore().collection(pathArray[0]).doc(pathArray[1]).update({
									"messageCount": FieldValue.increment(-1)
								});
								console.log("Message deleted Successfully");
							}).catch((error) => {
								console.log("Error deleting message: " + error);
							})
						})
					});
				}
			});
		}).catch((error) => {
			console.log("Error retrieving room document: " + error);
		});
	});



// Checks for when a room is created and deletes
// one when there are more than 5 rooms. 
// Deletes the room that has been idle longest (oldest lastMessageTime)
exports.cleanRooms = functions.firestore
	.document("rooms/{room_name}")
	.onCreate((snap, context) => {
		const ref = admin.firestore().collection("rooms").orderBy("lastMessageTime");
		return ref.onSnapshot(snapshot => {
			i = 0;
			size = snapshot.size;
			amountToDelete = size - 5;
			console.log("room count: " + size);
			snapshot.forEach((doc) => {
				if (i < amountToDelete) {
					// rooms/{room_name}/messages/{documentid}/(message)
				    // Deletes all the messages in the room first
					firebase_tools.firestore
				        .delete(doc.ref.path + "/messages", {
				        	project: process.env.GCLOUD_PROJECT,
				        	recursive: true,
				        	yes: true,
					        token: functions.config().fb.token
			       		}).then(() => {
					       	// Deletes the room after the messages are deleted 
			       			doc.ref.delete().then(() => {
			       				console.log(doc.ref.path  + "deleted successfully!");
			       			}).catch((error) => {
			       				console.log("Error removing room: " + error);
			       			});
			       		});
				}
				i++;
			});
		});
	});