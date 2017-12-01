<template>
	<div id="style">
		<div>
			<div class="foo grey darken-4">
				<h3 style="color: white">grey darken-4</h3>
			</div>
			<div class="foo grey darken-2">
				<h3 style="color: white">grey darken-2</h3>
			</div>
			<div class="foo grey lighten-3">
				<h3>grey lighten-3</h3>
			</div>
			<div class="foo grey lighten-4">
				<h3>grey lighen-4</h3>
			</div>
			<div class="foo light-green lighten-3">
				<h3>light-green lighten-3</h3>
			</div>
			<div class="foo light-green">
				<h3>light-green</h3>
			</div>
			<div class="foo light-green darken-3">
				<h3>light-green darken-3</h3>
			</div>
			<div class="foo yellow accent-4">
				<h3>yellow accent-4</h3>
			</div>
			<div class="foo yellow accent-2">
				<h3>yellow accent-2</h3>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.foo {
		width: 100vw;
		height: 10vh;
		h3 {
			line-height: 10vh;
		}
	}
</style>

<script>
	export default {
		name: 'Styleguide',
		data () {
			return {
			}
		}
	}
</script>