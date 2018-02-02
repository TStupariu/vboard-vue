<template src="./template.html"></template>
<style lang="scss" scoped src="./style.scss"></style>

<script>
import axios from 'axios'
import {BASE_URL} from '../../shared/constants'
import auth from '../../shared/auth'

export default {
	name: 'Profile',
	data () {
		return {
			exists: false,
			profile: {
				name: '',
				profile_picture_url: ''
			}
		}
	},
	async mounted() {
		let response = await axios.get(BASE_URL + '/profile/' + await auth.getToken().uid)
		if (response.data.profile) {
			this.exists = true
			this.profile = response.data.profile
		} else {
			this.exists = false
		}
	},
	methods: {
		async handleSaveProfile() {
			const config = {
				headers: await auth.getToken()
			}
			const data = {
				name: this.profile.name,
				profile_picture_url: this.profile.profile_picture_url,
				email: await auth.getToken().uid
			}
			if (this.exists) {
				let response = await axios.post(BASE_URL + '/profile/update', data, config)
				auth.setToken(response.config)
			} else {
				let response = await axios.post(BASE_URL + '/profile/create', data, config)
				auth.setToken(response.config)
			}
		}
	}
}
</script>