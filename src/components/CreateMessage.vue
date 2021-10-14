<template>
	<div class="container" style="margin-bottom: 30px">
		<form @submit.prevent="createMessage">
			<div class="form-group"> 
				<input type="text" name="message" class="form-control" placeholder="Enter Message ..." v-model="newMessage">
				<p class="text-danger" v-if="errorText">{{ errorText }}</p>
				<button class="btn btn-primary" type="submit" name="action">Submit</button>
			</div>
			
		</form>
	</div>
</template>

<script>
import fb from "@/firebase/init";

export default {
	name: "CreateMessage",
	props: ["name", "chatroom"],
	data() {
		return {
			newMessage: null,
			errorText: null
		}
	},
	methods: {
		/* 
			Creates a message 
		*/
		createMessage() {
			if (this.newMessage) {
				fb.collection("rooms").doc(this.chatroom).collection("messages").add({
					message: this.newMessage,
					name: this.name,
					timestamp: Date.now()
				}).catch(err => {
					console.log(err)
				})
				this.newMessage = null;
				this.errorText = null;
			} else {
				this.errorText = "A message must be entered before submitting";
			}
/*
				fb.collection(this.chatroom).add({
					message: this.newMessage,
					name: this.name,
					timestamp: Date.now()
				}).catch(err => {
					console.log(err)
				})
				this.newMessage = null;
				this.errorText = null;
			} else {
				this.errorText = "A message must be entered before submitting";
			}
*/
		}
	}
}


</script>