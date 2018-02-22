<template>
	<div>
		<h1>Add a new room</h1>
		<v-form>
			<v-text-field label="Name" v-model="name" />
			<v-checkbox label="Private" v-model="isPrivate"></v-checkbox>
			<span v-if="isPrivate">
				<v-text-field label="Password" v-model="password" :type="'password'" autocomplete="new-password"/>
			</span>
			<v-btn dark flat @click="handleCreateRoom">Create Room</v-btn>
		</v-form>
	</div>	
</template>

<script>
import axios from "axios"
import { BASE_URL } from "../../shared/constants"
import auth from "../../shared/auth"

export default {
	name: "CreateRoom",
	data() {
		return {
			name: "",
			isPrivate: false,
			password: ""
		}
	},
	methods: {
		async handleCreateRoom() {
			const config = {
				headers: await auth.getToken()
			}
			let data = {
				name: this.name,
				isPrivate: false,
				password: "",
				creatorEmail: config.headers.uid
			}
			if (this.isPrivate) {
				data.isPrivate = true,
				data.password = this.password
			}
			const response = await axios.post(BASE_URL + "/room/create", data, config)
			auth.setToken(response.config)
			this.$router.push({ name: 'Room', params: {room_id: response.data.room.id }})
		}
	}
}
</script>

