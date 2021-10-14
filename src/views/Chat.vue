<template>


	<div class="container chat">
		<h2 class="text-primary text-center">Real-Time Chat</h2>
		<h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>

		<h5>{{ chatroom }}</h5>
		<div class="card">
			<div class="card-body">
				<!-- Display "No messages yet" if there are no messages in DB -->
				<p class="text-secondary nomessages" v-if="messages.length == 0">
					[No messages yet]
				</p>
				<!-- Display messages if there are any in the DB -->
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
		console.log(this.chatroom);
		//  db connection to get messages in the current chatroom 
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
	}
}

</script>

<style>
.chat h2{
	font-size: 2.6em;
	margin-bottom: 0px;
}

.chat h5{
	margin-top: 0px;
	margin-bottom: 40px;

}
.chat span{
	font-size: 1.2em;
}

.chat .time{
	display: block;
	font-size: 0.7em;
}

.messages {
	max-height: 300px;
	overflow: auto;
}
</style>