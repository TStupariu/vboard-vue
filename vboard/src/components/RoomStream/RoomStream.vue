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

		// let p = new SimplePeer({ initiator: true, trickle: false, stream: myStream })

		db.ref(`rooms/${this.room_id}/peer`).on("value", (snapshot) => {
			let snap = snapshot.val()
			let peer_id = -1
			for (var pid in snap) {
				peer_id = pid
			}

			let p = new SimplePeer({ initiator: true, trickle: false, stream: myStream })
			// let p = new SimplePeer({ initiator: true, trickle: false, stream: myStream, channelName: `vboard_${this.room_id}`})

			p.on('signal', (data) => {
				let foo = db.ref(`rooms/${this.room_id}/peer/${peer_id}`).once("value", (peerdata) => {
					const currentStreamer = peerdata.val().streamer
					if (!currentStreamer) {
						db.ref(`rooms/${this.room_id}/peer/${peer_id}`).set({streamer: data})					
						document.querySelector('#outgoing').textContent = JSON.stringify(data)	
					}
				})
			})

			db.ref(`rooms/${this.room_id}/peer/${peer_id}/receiver`).on("value", (recsnap) => {
				const receiverData = recsnap.val()
				p.signal(receiverData)
			})
		})


		// var SimplePeer = require('simple-peer')

		// var canvas = document.querySelector("#canvas");
		// var myStream = canvas.captureStream(30);

		// var p = new SimplePeer({ initiator: true, trickle: false, stream: myStream, channelName: `vboard_${this.room_id}`})

		// p.on('signal', function (data) {
		// 	document.querySelector('#outgoing').textContent = JSON.stringify(data)
		// })

		// document.querySelector('form').addEventListener('submit', function (ev) {
		// 	ev.preventDefault()
		// 	p.signal(JSON.parse(document.querySelector('#incoming').value))
		// })

		// p.on('connect', function () {
		// 	console.log('CONNECT')
		// })
	}
}
</script>

