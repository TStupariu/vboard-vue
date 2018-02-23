<template>
	<div>
		<div>
			<h1>Stream for room with id {{room_id}}</h1>
		</div>
		<canvas-stream />
		<form>
			<textarea id="incoming"></textarea>
			<button type="submit">submit</button>
		</form>
		<pre id="outgoing"></pre>
	</div>
</template>

<script>
import axios from "axios"
import { BASE_URL } from "../../shared/constants"
import auth from "../../shared/auth"
import Canvas from "../Canvas/Canvas.vue"
import {db} from '../../firebase'

export default {
	name: "RoomStream",
	data() {
		return {
			room_id: null,
			used_ids: []
		}
	},
	components: {
		'canvas-stream': Canvas
	},
	mounted() {
		this.room_id = this.$route.params.room_id

		var SimplePeer = require('simple-peer')
		var canvas = document.querySelector("#canvas");
		var myStream = canvas.captureStream(30);

		db.ref(`rooms/${this.room_id}/peer`).on("value", (snapshot) => {
			let snap = snapshot.val()
			let peer_id = -1
			for (var pid in snap) {
				peer_id = pid
			}

			if (this.used_ids.indexOf(peer_id) === -1 && peer_id !== -1) {
				console.log("IN YOUR ANUS")
				let p = new SimplePeer({ initiator: true, trickle: false, stream: myStream })	
				this.used_ids.push(peer_id)

				p.on('signal', (data) => {
					let foo = db.ref(`rooms/${this.room_id}/peer/${peer_id}`).once("value", (peerdata) => {
						const currentStreamer = peerdata.val() && peerdata.val().streamer ? peerdata.val().streamer : false
						if (!currentStreamer) {
							db.ref(`rooms/${this.room_id}/peer/${peer_id}`).set({streamer: data})					
							document.querySelector('#outgoing').textContent = JSON.stringify(data)	
						}
					})
				})

				db.ref(`rooms/${this.room_id}/peer/${peer_id}/receiver`).on("value", (recsnap) => {
					const receiverData = recsnap.val()
					if (receiverData) {
						p.signal(receiverData)	
					}
				})
			}
		})
	}
}
</script>

