<template>
	<div>
		<video id="video" ref="video" controls autoplay style="height: 500px; width: 500px"></video>
		<form>
			<textarea id="incoming"></textarea>
			<button type="submit">submit</button>
		</form>
		<pre id="outgoing"></pre>
	</div>
</template>

<style lang="scss" scoped>
	#canvas {
		width: 500px;
		height: 500px;
		background-color: grey;
	}
</style>

<script>
	export default {
		name: 'ViewPage',
		data () {
			return {
				title: "Stream",
				str: ""
			}
		},
		mounted: function () {
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
		},		
		methods: {
		}
	}
</script>