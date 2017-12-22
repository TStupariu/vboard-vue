<template>
	<!-- <canvas ref="canvas" id='canvas'></canvas> -->
	<div>
		<canvas ref="canvas" id='canvas'></canvas>
		<!-- <video id="video" ref="video" controls autoplay style="height: 500px; width: 500px"></video> -->
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
		name: 'StreamPage',
		data () {
			return {
				title: "Stream",
			}
		},
		mounted: function () {
			var SimplePeer = require('simple-peer')

			var canvas = document.querySelector("#canvas");
			var myStream = canvas.captureStream(15);
			var ctx = canvas.getContext("2d");
			ctx.fillRect(100,100,100,100);
	
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
			})
			
			p.on('data', function (data) {
			  console.log('data: ' + data)
			})
		},		
		methods: {
		}
	}
</script>