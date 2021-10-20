const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase_tools = require("firebase-tools");

admin.initializeApp();


// Checks the last room messaged when a message is created
// and deletes messages if there are over 10;
exports.onMessageCreate = functions.firestore
	// rooms/{room_name}/messages/{document_ID}/(message)
	.document('rooms/{room_name}/messages/{document_ID}')
	.onCreate((snap, context) => {
		const ref = admin.firestore().collection("rooms").orderBy("lastMessageTime", "desc").limit(1);
		ref.onSnapshot(snapshot => {
			// iterates over only 1 document since we limited it to 1
			snapshot.forEach((doc) => {
				// doc.ref.path + "messages" = rooms/{room_name}/messages
				const messagesRef = admin.firestore().collection(doc.ref.path + "/messages").orderBy("timestamp");
				messagesRef.onSnapshot(snapshot2 => {
					i = 0;
					size = snapshot2.size;
					amountToDelete = size - 10;
					// now we can loop through the messages and delete the oldest ones
					snapshot2.forEach((message_doc) => {
						if (i < amountToDelete) {
							message_doc.ref.delete().then(() => {
								console.log("Message deleted successfully");
							}).catch((error) => {
								console.log("Error deleting message: " + error);
							})
						}
						i++;
					});
				});
			});
		});
	});



// Checks for when a room is created and deletes
// one when there are more than 5 rooms. 
// Deletes the room that has been idle longest (oldest lastMessageTime)
exports.onRoomCreate = functions.firestore
	.document("rooms/{room_name}")
	.onCreate((snap, context) => {
		const ref = admin.firestore().collection("rooms").orderBy("lastMessageTime");
		ref.onSnapshot(snapshot => {
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