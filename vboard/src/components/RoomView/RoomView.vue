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
		</div>
	</div>
</template>

<script>
import axios from "axios"
import { BASE_URL } from "../../shared/constants"
import auth from "../../shared/auth"
import {db} from "../../firebase"

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
	async mounted() {
		this.room_id = this.$route.params.room_id

		let SimplePeer = require('simple-peer')
		let p = new SimplePeer({ initiator: false, trickle: false })
		console.log("updated")

		const config = {
			headers: await auth.getToken()
		}
		const response = await axios.get(BASE_URL + '/users/getIdByEmail/' + config.headers.uid, config)
		auth.setToken(response.config)
		this.user_id = response.data.user_id
		
		db.ref(`rooms/${this.room_id}/peer`).set({[this.user_id]: ''})

		db.ref(`rooms/${this.room_id}/peer/${this.user_id}/streamer`).on("value", (peerdata) => {
			let data = peerdata.val()
			this.streamer_code = data
			p.signal(this.streamer_code)
		})

		p.on('signal', (data) => {
			this.peer_code = data
			db.ref(`rooms/${this.room_id}/peer/${this.user_id}`).update({receiver: this.peer_code})
			document.querySelector('#outgoing').textContent = JSON.stringify(data)
		})



		// var SimplePeer = require('simple-peer')
		// var p = new SimplePeer({ initiator: false, trickle: false, channelName: `vboard_${this.room_id}_${this.user_id}` })

		// p.on('error', function (err) { console.log('error', err) })

		// p.on('signal', function (data) {
		// 	console.log('SIGNAL', JSON.stringify(data))
		// 	document.querySelector('#outgoing').textContent = JSON.stringify(data)
		// })

		// document.querySelector('form').addEventListener('submit', function (ev) {
		// 	ev.preventDefault()
		// 	p.signal(JSON.parse(document.querySelector('#incoming').value))
		// })

		// p.on('connect', function () {
		// 	console.log('CONNECT')
		// 	p.send('whatever' + Math.random())
		// 	var video = document.querySelector('video')
		// 	video.srcObject = this.str
		// 	video.onloadedmetadata = function(e) {
		// 		video.play();
		// 	};
		// })

		// p.on('stream', function (stream) {
		// 	this.str = stream
		// })
	}
}
</script>

