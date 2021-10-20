<template>
	<div>
		<div class="chat">
			<div id="chatbox" class="card">	
				<div class="card-body chat-body">
					<!-- Display "No messages yet" if there are no messages in DB -->
					<p class="text-secondary nomessages" v-if="messages.length == 0">
						[No messages yet]
					</p>
					<!-- Display messages if there are any in the DB -->
					<div class="messages" v-chat-scroll="{always:false, smooth:true}">
						<div v-for="message in messages" :key="message.id">
							<span class="text-yellow">[{{ message.name }}]:</span>
							<span>{{ message.message }}</span>
							<span class="text-secondary time">{{ message.timestamp }}</span>
						</div>
					</div>
				</div>
				<div class="card-action">
					<!-- Create message componenet using passed name and chatroom -->
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
		   list in reverse chronological order
		*/
		// ref makes db connection to get messages in the current chatroom 
		const ref = fb.collection("rooms").doc(this.chatroom).collection("messages").orderBy("timestamp");
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
		});
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

#chatbox {
	background-color: rgb(40, 40, 40);
}

.text-yellow {
	color: rgb(255, 200, 0);
}

.chat {
	padding-bottom: 40px;
	background-color: rgb(25,25,25);
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

.chat-body {
	height: 315px;
}

.messages {
	max-height: 300px;
	text-align: left;
	overflow: auto;
}

</style>