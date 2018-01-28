<template src="./template.html"></template>
<style lang="scss" scoped src="./style.scss"></style>

<script>
import axios from 'axios'
import {BASE_URL} from '../../shared/constants'
import auth from '../../shared/auth'

export default {
	name: 'LogIn',
	data () {
		return {
			valid: false,
			pass_visible: false,
			passwordRules: [
			(v) => !!v || 'Password is required',
			(v) => v.length >= 8 || 'Password must be at least 8 characters'
			],
			emailRules: [
			(v) => !!v || 'E-mail is required',
			(v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
			],
			email: '',
			password: '',
			passwordConf: '',
			registerMode: false,
			snackbar: false,
			snackbarRequestFailed: false
		}
	},
	methods: {
		handleSubmit() {
			const data = {
				"email": this.email,
				"password": this.password
			}
			axios.post('http://localhost:3000/auth/sign_in', data)
			.then(response => {
				auth.setToken(response)
				this.$router.push('Profile')
			})
			.catch(error => {
				console.log(error)
			})
		},

		handleClear() {
			this.email = ''
			this.password = ''
		},

		handleRegister() {
			this.registerMode = true
		},

		handleSubmitRegister() {
			if (this.password === this.passwordConf) {
				const url = BASE_URL + '/auth'
				const data = {
					"email": this.email,
					"password": this.password
				}
				axios.post(url, data)
				.then(response => {
					auth.setToken(response)
					this.$router.push('Profile')
				})
				.catch(error => {
					console.log(error)
					this.snackbarRequestFailed = true
				})
			} else {
				this.snackbar = true
			}
		}
	}
}
</script>