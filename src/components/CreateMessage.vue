<template>
	<div class="container" style="margin-bottom: 30px">
		<form @submit.prevent="createMessage" autocomplete="off">
			<div id="text-input" class="form-group"> 
				<input id="textbox" type="text" name="message" class="form-control" placeholder="Enter Message..." v-model="newMessage">
				<button id="textbtn" class="btn" type="submit" name="action">Submit</button>
			</div>
			<div>
				<p class="text-danger" v-if="errorText">{{ errorText }}</p>
			</div>

		</form>
	</div>
</template>

<script>
import fb from "@/firebase/init";
import firebase from "firebase/compat/app";

export default {
	name: "CreateMessage",
	props: ["name", "chatroom"],
	data() {
		return {
			messageBuffer: [],
			newMessage: null,
			errorText: null
		}
	},
	methods: {
		/*
			Limits users to 5 messages in 10 seconds
		*/
		spamFilter() {
			let newMessageTime = new Date();
			if (this.messageBuffer.length > 5) {
				// (new date - old date) / 1000 = difference in seconds
				if ((newMessageTime - this.messageBuffer[0]) / 1000 < 10) {
					this.errorText = "Your typing skills are amazing! Please wait before sending your next message.";
					return true;
				}
				else {
					// shift the buffer
					this.messageBuffer.shift();
					this.messageBuffer.push(newMessageTime);
					return false;
				}
			}
			// fill the buffer
			this.messageBuffer.push(newMessageTime);
			return false;
		},

		/* 
			Creates a message and adds it to the database
		*/
		createMessage() {
			if (this.newMessage) {
				if (this.spamFilter()) {
					return;
				}
				const roomRef = fb.collection("rooms").doc(this.chatroom);
				roomRef.collection("messages").add({
					message: this.newMessage,
					name: this.name,
					timestamp: Date.now()
				}).catch(err => {
					console.log(err)
				});
				// Add a timestamp for the last time the room was messaged in.
				// This will be used to choose which chat room to delete
				roomRef.set({
					lastMessageTime: Date.now(),
					messageCount: firebase.firestore.FieldValue.increment(1)
				},
				{
					merge:true
				});
				this.newMessage = null;
				this.errorText = null;
			} else {
				this.errorText = "A message must be entered before submitting";
			}
		}
	}
}


</script>

<style>
#text-input {
	display: flex;
	justify-content: space-between;
}

#textbox {
	color: rgb(245, 245, 245);
	background-color: rgb(60, 60, 60);
	border: rgb(40, 40, 40);
	height: 40px;
	margin-top: 20px;
}

#textbox:focus {
	box-shadow: none;
	border: 1px solid;
	border-color: rgb(255, 200, 0);
}

#textbtn {
	color: rgb(255, 200, 0);
	margin-top: 20px;
	margin-left: 10px;
	float: right;
	font-weight: bold;
	border-width: 3px;
	border-radius: 0;
	border-color: rgb(255, 200, 0);
	background-color: rgb(40, 40, 40);
}

#textbtn:focus {
	box-shadow: none;
	border: 3px solid;
	color: rgb(40, 40, 40);
	background-color: rgb(255, 200, 0);
	border-color: rgb(255, 200, 0);
}

#textbtn:hover {
	color: rgb(40, 40, 40);
	background-color: rgb(255, 200, 50);
	border-color: rgb(255, 200, 0);
}

</style>