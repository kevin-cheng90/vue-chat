<template>
	<div>
		<div class="header-info">
			<h2 class="text-center">Real-Time Chat</h2>
			<h5 class="text-center">Powered by Vue.js & Firebase</h5>
		</div>
		<button id="addRoomButton" type="button" class="btn btn-primary" v-on:click="addRoom()">
			Add another room
		</button>

		<!--
		Form for entering a new room
		<div>
			<div style="max-width:200px; margin:auto;">
				<form @submit.prevent="Chat">
					<input type="text" class="form-control">
					<button class="btn btn-primary" type="button">Enter</button>
				</form>
			</div>
		</div>
		-->
		<!-- Chatbox component lies within this container -->
		<div class="container chat chat-body">
			<div class="row">
				<div id="name-and-chat1" class="name-and-chat col-md-6">
					<span id="chatbox1-name" class="col-md-6" style="color: rgb(50, 200, 50);">
						<div style="float:left;">{{chatroom}}</div>
						<!-- &#x2573 is an X icon to close the chat -->
						<button class="closeComponent" v-on:click="triggerClose()">&#x2573;</button>
					</span>
					<ChatBox ref="component1" id="chatbox1" :name="name" :chatroom="chatroom"/>

				</div>
				<div id="name-and-chat2" class="name-and-chat col-md-6">
					<span id="chatbox2-name" class="col-md-6" style="max-height: 50px;">
						<div style="float:left">{{name}}</div>
						<div style="float:right">X</div>
					</span>				
					<ChatBox id="chatbox2" :name="name" :chatroom="'HOMEWORK HELP'"/>
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
		this.rooms = 1;
		return {
			messages: []
		}
	},
	// Wait until DOM is loaded
	mounted() {
		// Testing for future functions 
		// document.getElementById("name-and-chat1").classList.remove("col-md-6");
		// document.getElementById("name-and-chat1").classList.add("col-md-12");
	},
	methods: {
		addRoom() {
			/* 
				adds another chatbox component
			*/
			var addRoomButton = document.getElementById("addRoomButton");
			addRoomButton.hidden = true;

		},
		triggerClose() {
			// Need to hide close button of the other component
			this.$refs.component1.close();
		}
	}
}

</script>

<style>

.chat {
	height: 100%;
}

.header-info {
	padding-top: 20px;
	color: rgb(220, 220, 220);
}

.closeComponent {
	color: rgb(255, 255, 255); 
	border: none; 
	outline: none; 
	box-shadow: none;
	background: none;
	float:right
}


.closeComponent:hover {
	font-weight: bolder;
	color: rgb(255, 230, 0);
}


</style>