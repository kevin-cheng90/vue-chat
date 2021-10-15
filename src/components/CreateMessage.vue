<template>
	<div class="container" style="margin-bottom: 30px">
		<form @submit.prevent="createMessage" autocomplete="off">
			<div id="text-input" class="form-group"> 
				<input id="textbox" type="text" name="message" class="form-control" placeholder="Enter Message ..." v-model="newMessage">
				<p class="text-danger" v-if="errorText">{{ errorText }}</p>
				<button id="textbtn" class="btn btn-primary" type="submit" name="action">Submit</button>
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
			Creates a message and adds it to the database
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
	color: rgb(255, 255, 255);
	background-color: rgb(70, 70, 70);
	border: rgb(40, 40, 40);
	height: 40px;
	margin-top: 10px;
}

#textbox:focus {
	box-shadow: none;
	border: 1px solid;
	border-color: rgb(255, 230, 0);
	color: rgb(255, 255, 255);
}

#textbtn {
	color: rgb(255, 230, 0);
	margin-top: 10px;
	margin-left: 10px;
	float: right;
	font-weight: bold;
	border-width: 3px;
	border-radius: 0;
	border-color: rgb(255, 230, 0);
	background-color: rgb(55, 55, 55);
}

#textbtn:focus {
	box-shadow: none;
	border: 3px solid;
	color: rgb(30, 30, 30);
	background-color: rgb(255, 230, 0);
	border-color: rgb(255, 230, 0);
}

#textbtn:hover {
	color: rgb(30, 30, 30);
	background-color: rgb(255, 230, 0);
	border-color: rgb(255, 230, 0);
}

</style>