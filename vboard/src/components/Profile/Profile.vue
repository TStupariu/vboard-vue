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
	async created() {
		const token = await auth.getToken()
		let config = {
		  headers: token
		}
		const response = await axios.get(BASE_URL + '/profile/' + token.uid, config)
		auth.setToken(response.config)
		if (response.data.profile) {
			this.exists = true
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
				profile_picture_url: this.profile.profile_picture_url
			}
			console.log(data)
			let response = await axios.post(BASE_URL + '/profile/create', data, config)
			auth.setToken(response)
			console.log(response)
		}
	}
}
</script>