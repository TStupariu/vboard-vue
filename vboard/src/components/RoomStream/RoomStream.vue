<template>
	<div>
		<h1>Stream for room with id {{room_id}}</h1>
	</div>
</template>

<script>
import axios from "axios"
import { BASE_URL } from "../../shared/constants"
import auth from "../../shared/auth"

export default {
	name: "RoomStream",
	data() {
		return {
			room_id: null,
		}
	},
	mounted() {
		this.room_id = this.$route.params.room_id
	}
}
</script>

