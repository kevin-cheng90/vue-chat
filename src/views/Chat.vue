<template>
	<div>
		<div class="header-info">
			<h2 class="text-center">Real-Time Chat</h2>
			<h5 class="text-center">Powered by Vue.js & Firebase</h5>
		</div>
		
		<button id="addRoomButton" type="button" class="btn btn-primary" v-on:click="addRoom()">
			Add another room
		</button>
		
				
		
		<div class="container chat">
			<div class="row">
				<ChatBox class="col-md-6" :name="name" :chatroom="chatroom"/>
				<ChatBox class="col-md-6" :name="name" :chatroom="'HOMEWORK HELP'"/>

				<!--
				<div class="chat1 col-md-6">
					<h5>{{ chatroom }}</h5>
					<div class="card">
						<div class="card-body">
							<-- Display "No messages yet" if there are no messages in DB ->
							<p class="text-secondary nomessages" v-if="messages.length == 0">
								[No messages yet]
							</p>
							<-- Display messages if there are any in the DB ->
							<div class="messages" v-chat-scroll="{always:false, smooth:true}">
								<div v-for="message in messages" :key="message.id">
									<span class="text-info">[{{ message.name }}]:</span>
									<span>{{ message.message }}</span>
									<span class="text-secondary time">{{ message.timestamp }}</span>
								</div>
							</div>
						</div>
						<div class="card-action">
							<CreateMessage :name="name" :chatroom="chatroom"/>
						</div>
					</div>
				</div>
				<div class="chat2 col-md-6">
					<div class="card">
						<div class="card-body">
							<p>Hello this is chat 2</p>
						</div>
					</div>
				</div>
				-->
			</div>
		</div>
	</div>
</template>

<script>
//import CreateMessage from "@/components/CreateMessage";
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
	methods: {
		addRoom() {
			/* 
				adds another chatbox component
			*/
			var addRoomButton = document.getElementById("addRoomButton");
			addRoomButton.hidden = true;
		}
	}
}

</script>

<style>

.header-info {
	padding-top: 20px;
	color: rgb(200, 200, 200);
}

#addRoomButton{
}

</style>