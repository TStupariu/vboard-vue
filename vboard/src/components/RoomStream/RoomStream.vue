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
		var myStream = canvas.captureStream(15);

		var p = new SimplePeer({ initiator: true, trickle: false, stream: myStream})
		
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
			var ctx = canvas.getContext("2d");
			ctx.fillStyle="#FF0000";
			ctx.fillRect(100,100,100,100);
		})
		
		p.on('data', function (data) {
			console.log('data: ' + data)
		})
	}
}
</script>

