<template>
	<div>
		<h1>room with id {{room_id}}</h1>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-toolbar color="yellow">
						<h2>Participants</h2>
					</v-toolbar>
					<v-list>
						<v-list-tile avatar v-for="item in participants" v-bind:key="item.name" @click="">
							<v-list-tile-content>
								<v-list-tile-title v-text="item.name"></v-list-tile-title>
							</v-list-tile-content>
							<v-list-tile-avatar>
								<img v-bind:src="item.profile_picture_url" onerror="this.src='http://www.pvhc.net/img61/plllorvnvyktknrdhmuw.png';"/>
							</v-list-tile-avatar>
						</v-list-tile>
					</v-list>
				</v-card>
			</v-flex>
		</v-layout>
		<v-btn @click="navigateToStream()">STREAM</v-btn>
	</div>
</template>

<script>
import axios from "axios"
import { BASE_URL } from "../../shared/constants"
import auth from "../../shared/auth"

export default {
	name: "Room",
	data() {
		return {
			room_id: null,
			participants: [],
			room: {},
		}
	},
	async mounted() {
  	this.room_id = this.$route.params.room_id
  	const config = {
  		headers: await auth.getToken()
  	};
  	const response = await axios.get(BASE_URL + "/room/getRoomById/" + this.room_id, config);
  	auth.setToken(response.config)
  	this.participants = response.data.participants
  	this.room = response.data.room
  },
  methods: {
  	async navigateToStream() {
  		const config = {
  			headers: await auth.getToken()
  		};
  		const response = await axios.get(BASE_URL + "/room/userIsOwner/" + this.room_id + "/" + config.headers.uid, config);
  		auth.setToken(response.config)
  		const isOwner = response.data.isOwner
  		console.log(isOwner)
  		if (isOwner) {
  			this.$router.push({name: 'RoomStream', params: {room_id: this.room_id}})
  		} else {
  			this.$router.push({name: 'RoomView', params: {room_id: this.room_id}})
  		}
  	}
  }
}
</script>

