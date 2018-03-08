<template>
	<div>
		<h1>View for room with id {{room_id}}</h1>
		<div>
			<video id="video" ref="video" controls autoplay style="height: 450px; width: 800px"></video>
			<form>
				<textarea id="incoming"></textarea>
				<button type="submit">submit</button>
			</form>
			<pre id="outgoing"></pre>
			<chat :roomid="room_id" />
		</div>
	</div>
</template>

<script>
import axios from "axios"
import { BASE_URL } from "../../shared/constants"
import auth from "../../shared/auth"
import {db} from "../../firebase"
import Chat from "../Chat/Chat.vue"

export default {
	name: "RoomView",
	data() {
		return {
			room_id: null,
			user_id: null,
			streamer_code: null,
			peer_code: null
		}
	},
	components: {
		'chat': Chat
	},
	created() {
		this.room_id = this.$route.params.room_id
		document.addEventListener('beforeunload', this.handler)
	},
	async mounted() {
		let SimplePeer = require('simple-peer')
		let p = new SimplePeer({ initiator: false, trickle: false })

		const config = {
			headers: await auth.getToken()
		}
		const response = await axios.get(BASE_URL + '/users/getIdByEmail/' + config.headers.uid, config)
		auth.setToken(response.config)
		this.user_id = response.data.user_id
		
		db.ref(`rooms/${this.room_id}/peer`).set({[this.user_id]: ''})

		db.ref(`rooms/${this.room_id}/peer/${this.user_id}/streamer`).on("value", (peerdata) => {
			let data = peerdata.val()
			if (data) {
				this.streamer_code = data
				p.signal(this.streamer_code)	
			}
		})

		p.on('signal', (data) => {
			this.peer_code = data
			db.ref(`rooms/${this.room_id}/peer/${this.user_id}`).update({receiver: this.peer_code})
			document.querySelector('#outgoing').textContent = JSON.stringify(data)
		})

		p.on('connect', function () {
			console.log('CONNECT')
			p.send('whatever' + Math.random())
			var video = document.querySelector('video')
			video.srcObject = this.str
			video.onloadedmetadata = function(e) {
				video.play();
			};
		})

		p.on('stream', function (stream) {
			this.str = stream
		})
	},
	methods: {
		handler() {
			console.log("Baby please don't go")
		}
	}
}
</script>

