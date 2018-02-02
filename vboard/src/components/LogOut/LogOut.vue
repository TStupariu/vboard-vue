<template>
	<div>
		<div v-if='success'>
			<h1>You have been logged out!</h1>
			<h3>Redirecting you in {{remaining}} seconds</h3>
			<v-btn dark flat @click="handleSkip()">Skip</v-btn>
		</div>
		<div v-if='!success'>
			<h1>An error occured!</h1>
		</div>
	</div>
</template>
<style lang="scss" scoped></style>
<script>
import axios from 'axios'
import {BASE_URL} from '../../shared/constants'
import auth from '../../shared/auth'

export default {
	name: 'LogOut',
	data () {
		return {
			remaining: 5,
			success: false
		}
	},
	async mounted() {
		const config = {
			headers: await auth.getToken()
		}
		try {
			const response = await axios.delete(BASE_URL + '/auth/sign_out', config)	
			this.success = true		
			auth.clearToken()
			this.decreaseCountDown()
		}
		catch(e) {
			console.log("ERROR " + e)
		}
	},
	methods: {
		decreaseCountDown() {
			setTimeout(() => {
				this.remaining = this.remaining - 1
				if (this.remaining === 0) {
					this.$router.push('LogIn')
				} else {
					this.decreaseCountDown()	
				}
			}, 1000)
		},
		handleSkip() {
			this.$router.push('LogIn')
		}
	}
}
</script>