<template>
	<div>
		<div>
			<h1>Stream for room with id {{room_id}}</h1>
		</div>
		<canvas-stream :addedPeer="connectedPeer"/>
		<form>
			<textarea id="incoming"></textarea>
			<button type="submit">submit</button>
		</form>
		<pre id="outgoing"></pre>
		<chat :roomid="room_id" />
	</div>
</template>

<script>
import axios from "axios"
import { BASE_URL } from "../../shared/constants"
import auth from "../../shared/auth"
import Canvas from "../Canvas/Canvas.vue"
import {db} from '../../firebase'
import Chat from "../Chat/Chat.vue"

export default {
	name: "RoomStream",
	data() {
		return {
			room_id: null,
			used_ids: [],
			connectedPeer: null
		}
	},
	components: {
		'canvas-stream': Canvas,
		'chat': Chat
	},
	created() {
		this.room_id = this.$route.params.room_id
	},
	mounted() {
		var SimplePeer = require('simple-peer')
		var canvas = document.querySelector("#canvas");
		var myStream = canvas.captureStream(30);
		navigator.getUserMedia({ "audio": true, "video": false }, (audioStream) =>
		{
			var audioTrack = audioStream.getAudioTracks()[0];
			
			myStream.addTrack( audioTrack );
		}, function(error) { console.log(error);});



		db.ref(`rooms/${this.room_id}/peer`).on("value", (snapshot) => {
			let snap = snapshot.val()
			let peer_id = -1
			for (var pid in snap) {
				peer_id = pid

				if (this.used_ids.indexOf(peer_id) === -1 && peer_id !== -1) {
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

					p.on('close', () => {
						console.log(p)
					})

					p.on('connect', () => {
						console.log("PEER CONNECTED")
						this.connectedPeer = pid
					})

					db.ref(`rooms/${this.room_id}/peer/${peer_id}/receiver`).on("value", (recsnap) => {
						const receiverData = recsnap.val()
						if (receiverData) {
							p.signal(receiverData)	
						}
					})
				}
			}
		})
	}
}
</script>

