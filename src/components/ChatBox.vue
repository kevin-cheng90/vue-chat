<template>
	<div>
		<div class="chat">
			<div id="chat-top" class="d-flex justify-content-between">
				<h4 class="chatRoomName">{{ chatroom }}</h4>
				<span id="closeComponent" v-on:click="close()">&#x2573;</span>
			</div>
			<div id="chatbox" class="card">	
				<div class="card-body">
					<!-- Display "No messages yet" if there are no messages in DB -->
					<p class="text-secondary nomessages" v-if="messages.length == 0">
						[No messages yet]
					</p>
					<!-- Display messages if there are any in the DB -->
					<div class="messages" v-chat-scroll="{always:false, smooth:true}">
						<div v-for="message in messages" :key="message.id">
							<span class="text-secondary time">{{ message.timestamp }}</span>
							<span class="text-yellow">[{{ message.name }}]:</span>
							<span>{{ message.message }}</span>
						</div>
					</div>
				</div>
				<div class="card-action">
					<CreateMessage :name="name" :chatroom="chatroom"/>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';
import moment from 'moment';

export default {
	name: 'Chat',
	props: ['name', "chatroom"],
	components: { 
		CreateMessage
	},
	data() {
		return {
			messages: []
		}
	},
	created() {
		/* 
		   put messages from database into "messages" 
		   list in chronological order
		*/
		// ref makes db connection to get messages in the current chatroom 
		let ref = fb.collection("rooms").doc(this.chatroom).collection("messages").orderBy("timestamp");
		ref.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if (change.type == "added") {
					let doc = change.doc;
					this.messages.push({
						id: doc.id,
						name: doc.data().name,
						message: doc.data().message,
						timestamp: moment(doc.data().timestamp).format("LTS")
					});
				}
			})
		})
	},
	methods: {
		close() {
			this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
		}
	}

}

</script>

<style>

.chatRoomName {
	font-size: 1.4em;
	padding-bottom: 0px;
	text-align: left;
	color: rgb(255, 230, 0);
}

#chatbox {
	background-color: rgb(55, 55, 55);
}

.text-yellow {
	color: rgb(255, 230, 0);
}

.chat {
	padding-bottom: 40px;
	background-color: rgb(40,40,40);
}

.chat h2{
	font-size: 2.6em;
	margin-bottom: 0px;
}

.chat h5{
	margin-top: 0px;
	margin-bottom: 40px;

}
.chat span{
	font-size: 1em;
}

.chat .time{
	display: block;
	font-size: 0.7em;
}

.messages {
	max-height: 300px;
	text-align: left;
	overflow: auto;
}

#closeComponent {
	position: relative;
	cursor: pointer;
	color: rgb(200, 200, 200);

}
#closeComponent:hover {
	font-weight: bolder;
	color: rgb(255, 230, 0);
}

#chat-top {
	padding-top: 50px;
	display: flex;
	justify-content: space-between;

}

</style>