<template src="./template.html"></template>
<style lang="scss" scoped src="./style.scss"></style>

<script>
import axios from 'axios'
import {BASE_URL} from '../../shared/constants'
import auth from '../../shared/auth'

export default {
	name: 'Dashboard',
	data () {
		return {
			publicRooms: []
		}
	},
	async mounted() {
		const config = {
			headers: await auth.getToken()
		}
		const response = await axios.get(BASE_URL + '/room/publicRooms', config)
		auth.setToken(response.config)
		this.publicRooms = response.data.rooms
	},
	methods: {
	}
}
</script>