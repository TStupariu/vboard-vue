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

export default {
	name: "RoomView",
	data() {
		return {
			room_id: null,
		}
	},
	mounted() {
		this.room_id = this.$route.params.room_id

		var SimplePeer = require('simple-peer')
		var p = new SimplePeer({ initiator: false, trickle: false })
		
		p.on('error', function (err) { console.log('error', err) })
		
		p.on('signal', function (data) {
			console.log('SIGNAL', JSON.stringify(data))
			document.querySelector('#outgoing').textContent = JSON.stringify(data)
		})
		
		document.querySelector('form').addEventListener('submit', function (ev) {
			ev.preventDefault()
			p.signal(JSON.parse(document.querySelector('#incoming').value))
		})
		
		p.on('connect', function () {
			console.log('CONNECT')
			p.send('whatever' + Math.random())
			var video = document.querySelector('video')
			video.srcObject = this.str
			video.onloadedmetadata = function(e) {
				video.play();
			};
			console.log(this.str)
		})
		
		p.on('data', function (data) {
			console.log('data: ' + data)
		})

		p.on('stream', function (stream) {
				// var video = document.querySelector('video')
				// video.srcObject = stream
				this.str = stream
			})
	}
}
</script>

