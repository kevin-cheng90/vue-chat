<template>
	<div class="container">
		<div class="card login">
			<div class="card body">
				<!-- Login text and form -->
				<h2 class="card-title text-center">Login</h2>
				<form @submit.prevent="login" class="text-center">
					<div class="form">
						<label for="chatroom">Enter a room</label>
						<input type="text" class="form-control" name="chatroom" v-model="chatroom">
						<label for="name">Enter your name</label>
						<input type="text" class="form-control" placeholder="Please enter your name..." name="name" v-model="name">
						<p v-if="errorText" class="text-danger"> {{ errorText }}</p>
					</div>
					<button type="submit" class="btn btn-primary">Enter Chat</button>
				</form>
			</div>
		</div>
	</div>
</template>


<script> 
export default {
	name: "login",
	data() {
		return {
			name: "",
			// Initial chatroom value when the page loads is "main"
			chatroom: "main",
			errorText: null
		}
	},
	methods: {
		login() {
			// Send the name of the user and name of the chat room
			// as parameters
			if (this.name && this.chatroom) {
				this.$router.push({
					name:"Chat",
					params: {
						name: this.name,
						chatroom: this.chatroom.toUpperCase()
					}
				})
			} else {
				this.errorText = "Please enter a name and chatroom before entering!";
			}
		}
	}
}
</script>

<style>
	.login {
		max-width: 450px;
		margin-top: 50px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>