<template>
	<div>
		<div class="header-info">
			<h2 class="text-center">Real-Time Chat</h2>
			<h5 class="text-center">Powered by Vue.js & Firebase</h5>
		</div>
		<button id="add-room-button" type="button" class="btn" v-on:click="addRoomClick()">Add another room</button>

		<div id="add-new-room" style="max-width:300px; margin:auto;" hidden="true">
			<form @submit.prevent="enterNewRoom" autocomplete="off">
				<div style="display:flex; justify-content: space-between;">
					<input type="text" id="room-name-input" class="form-control room-name-input" placeholder="Enter a room name...">
					<button id="enter-room-btn" class="btn" type="button" v-on:click="enterNewRoom">Enter</button>
				</div>
				<p class="text-danger" v-if="errorText">{{errorText}}</p>

			</form>
		</div>

		<!-- Chatbox component lies within this container -->
		<div class="container chat chat-body">
			<div id="chat-container" class="row">

				<div id="name-and-chat1" class="name-and-chat col-md-8" style="margin:auto;" v-if="initialRoom" :key="initialRoom">
					<span id="chatbox1-name" class="col-md-12 chatbox-description">
						<div class="room-name">{{initialRoom}}</div>
						<!-- &#x2573 is an X icon to close the chat -->
						<button id="close-chat1" class="close-chat" v-on:click="triggerClose(1)" hidden="true">&#x2573;</button>
					</span>
					<ChatBox ref="component1" id="chatbox1" :name="name" :chatroom="initialRoom"/>
				</div>

				<div id="name-and-chat2" class="name-and-chat col-md-6" v-if="newRoom" :key="newRoom">
					<span id="chatbox2-name" class="col-md-12 chatbox-description">
						<div class="room-name">{{newRoom}}</div>
						<button id="close-chat2" class="close-chat" v-on:click="triggerClose(2)">&#x2573;</button>
					</span>
					<ChatBox ref="component2" id="chatbox2" :name="name" :chatroom="newRoom.toUpperCase()"/>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import ChatBox from "@/components/ChatBox";


export default {
	name: "Chat",
	props: ['name', "chatroom"],
	components: { 
		ChatBox
	},
	data() {
		return {
			initialRoom: this.chatroom,
			newRoom: null,
			errorText: null,
			messages: []
		}
	},
	methods: {
		addRoomClick() {
			/* 
				reveals the text box for the user to type in their new room
			*/
			var addRoomButton = document.getElementById("add-room-button");
			var addNewRoom = document.getElementById("add-new-room");
			addRoomButton.hidden = true;
			addNewRoom.hidden = false;
			document.getElementById("room-name-input").focus();
		},
		enterNewRoom() {
			/* 
				changes chatbox size and the second chatroom
			*/
			this.newRoom = document.getElementById("room-name-input").value;
			if (this.newRoom) {
				this.newRoom = this.newRoom.toUpperCase();
				document.getElementById("name-and-chat1").classList.remove("col-md-8");
				document.getElementById("name-and-chat1").classList.add("col-md-6");
				document.getElementById("close-chat1").hidden = false;
				document.getElementById("add-new-room").hidden = true;
				document.getElementById("room-name-input").value = null;
			}
			else {
				this.errorText = "Please enter a room name!";
			}
		},

		triggerClose(component_num) {
			/* 
				handles closing the chatbox		
			*/
			var component_1 = this.$refs.component1
			var component_2 = this.$refs.component2

			// Close chatbox 1
			if (component_1 != null && component_num == 1) {
				// Sets chatbox 2 to chatbox 1 and closes chatbox 2
				this.initialRoom = this.newRoom;
				this.newRoom = null;

			}
			// Close chatbox 2
			else if (component_2 != null && component_num == 2) {
				// Set newRoom to null, which close chatbox 2
				this.newRoom = null;
				var name_chat = document.getElementById("name-and-chat1").classList;
				// resize chatbox;
				if (name_chat.contains("col-md-6")) {
					name_chat.remove("col-md-6");
					name_chat.add("col-md-8")
				}
			}
			// readd the "add another room" button
			document.getElementById("close-chat1").hidden = true;
			document.getElementById("add-room-button").hidden = false;

		}
	}
}

</script>

<style>

#add-room-button {
	color: rgb(255, 200, 0);
	margin-top: 10px;
	margin-left: 10px;
	box-shadow: none;
	font-weight: bold;
	border-width: 3px;
	border-radius: 0;
	border-color: rgb(255, 200, 0);
	background-color: rgb(25, 25, 25);
}

#add-room-button:hover {
	color: rgb(25, 25, 25);
	background-color: rgb(255, 200, 0);
}

#add-room-button:focus {
	color: rgb(25, 25, 25);
	background-color: rgb(255, 200, 0);
}

.chat {
	min-height: 100vh;
	height: 100%;
}

.chatbox-description {
	display: flex; 
	justify-content: space-between;
	max-width: 98%;
	margin: auto;
	color: rgb(255, 200, 0);
}

.close-chat {
	color: rgb(255, 255, 255); 
	border: none; 
	outline: none;
	box-shadow: none;
	background: none;
	float:right
}

.close-chat:hover {
	font-weight: bolder;
	color: rgb(255, 200, 0);
}

.header-info {
	padding-top: 20px;
	color: rgb(220, 220, 220);
}

#enter-room-btn {
	color: rgb(255, 200, 0);
	margin-left: 5px;
	box-shadow: none;
	font-weight: bold;
	border-width: 2px;
	border-radius: 0;
	border-color: rgb(255, 200, 0);
	background-color: rgb(25, 25, 25);
}

#enter-room-btn:hover {
	color: rgb(25, 25, 25);
	background-color: rgb(255, 200, 0);
}

#enter-room-btn:focus {
	color: rgb(25, 25, 25);
	background-color: rgb(255, 200, 0);
}

.room-name {
	font-size: 1.4em;
}

#room-name-input {
	color: rgb(245, 245, 245);
	background-color: rgb(60, 60, 60);
	border: rgb(40, 40, 40);
	height: 40px;
}

#room-name-input:focus {
	box-shadow: none;
	border: 1px solid;
	border-color: rgb(255, 200, 0);
}

</style>