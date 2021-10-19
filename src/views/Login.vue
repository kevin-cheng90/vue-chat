<template>
	<div class="container">
		<div class="card-container">
			<div class="row">
				<div class="app-info-container col-md-6">
					<div class="app-info">
							<span class="app-name">
								CHAT APP
							</span>
							<span class="app-description">
								Join a room and chat with friends!
							</span>
					</div>
				</div>
				<div class="login col-md-5">
					<div class="card body card-login">
						<!-- Login text and form -->
						<h2 class="card-title text-center text-yellow">Login</h2>
						<form @submit.prevent="login" class="text-center" autocomplete="off">
							<label for="chatroom" class="text-yellow">Enter a room</label>
							<input type="text" class="form-control entry-box" name="chatroom" v-model="chatroom">
							<label for="name" class="text-yellow">Enter your name</label>
							<input type="text" class="form-control entry-box" placeholder="Please enter your name..." name="name" v-model="name" autofocus>
							<p v-if="errorText" class="text-danger"> {{ errorText }}</p>
							<button type="submit" id="login-submit" class="btn">Enter Chat</button>
						</form>
					</div>
				</div>
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
			chatroom: "Main",
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
	.app-info-container {

	}

	/* CSS Breaks at 768px so handle that later */
	.app-info {
		margin-top: 20vh;
	}

	.app-description {
		font-size: 1.6em;
		display: inline-block;
	}

	.app-name {
		font-size: 4em;
		color: rgb(255, 200, 0);
		margin: auto;
	}


	.login {
		max-width: 450px;
		max-height: 450px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.card-container {
		padding-top: 50px;
		min-height: 100vh;
		height: 100%;
		padding-bottom: 50px;
	}

	.card-login {
		margin-top: 10vh;
		background-color: rgb(40, 40, 40) !important; 
	}

	.card-title {
		font-size: 3em;
		padding-bottom: 10px;
		margin-top: 5px;
	}

	.entry-box {
		color: rgb(245, 245, 245) !important;
		background-color: rgb(50, 50, 50) !important;
		border: rgb(40, 40, 40) !important;
		margin-bottom: 10px;
		margin-left: 2.5%;
		max-width: 95%;
	}

	.entry-box:focus {
		box-shadow: none !important;
		border: 1px solid !important;
		border-color: rgb(255, 200, 0) !important;
	}

	#login-submit {
		color: rgb(255, 200, 0);
		margin-top: 10px;
		margin-bottom: 15px;
		font-weight: bold;
		border-width: 3px;
		border-radius: 0;
		border-color: rgb(255, 200, 0);
		background-color: rgb(40, 40, 40);
	}

	#login-submit:focus {
		box-shadow: none;
		border: 3px solid;
		color: rgb(40, 40, 40);
		background-color: rgb(255, 200, 0);
		border-color: rgb(255, 200, 0);
	}

	#login-submit:hover {
		color: rgb(40, 40, 40);
		background-color: rgb(255, 200, 0);
		border-color: rgb(255, 200, 0);
	}


</style>