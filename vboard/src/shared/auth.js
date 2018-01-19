class auth {
	static setToken(response) {
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
		const token = JSON.parse(localStorage.getItem("auth", JSON.stringify('auth')))
		return token
	}	
}

export default auth