import axios from 'axios'
import {BASE_URL} from '../shared/constants'

class auth {
	static setToken(response) {
		console.log(response)
		const head = response.headers
		const auth_token = {
			'access-token' : head['access-token'],
			'client' : head.client,
			'expiry' : head.expiry,
			'uid' : head.uid,
		}
		localStorage.setItem("auth", JSON.stringify(auth_token))
	}
	
	static getToken() {
		const token = JSON.parse(localStorage.getItem("auth"))
		return token
	}	

	static isAuthed() {
		const token = this.getToken()
		if (token && new Date(token.expiry * 1000) > Date.now()) {
			return true
		}
		return false
	}
}

export default auth