<template>
	<div>
		<v-layout row wrap>
			<v-flex md10>
				<v-text-field name="input-chat" label="Say Something..." id="input-chat" v-model="message"></v-text-field>
			</v-flex>
			<v-flex md2>
				<v-btn color='blue' @click="send">Send</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-list two-line>
				<v-list-tile avatar v-for="chat in chats" :key="chat.sentAt" @click="">
					<v-list-tile-action>
						<v-icon v-if="chat.icon" color="pink">star</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-html="chat.sender"></v-list-tile-title>
						<v-list-tile-sub-title v-html="chat.message"></v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-layout>
	</div>	
</template>
<style lang="scss" scoped>

</style>

<script>
import auth from "../../shared/auth"
import {db} from "../../firebase"

export default {
	name: 'Chat',
	props: ['roomid'],
	data () {
		return {
			message: "",
			chats: [],
			room_id: null
		}
	},
	created() {
		console.log("CREATED", this.roomid);
	},
	mounted() {
		console.log("MOUNTED", this.roomid);
		db.ref(`rooms/${this.roomid}/chat`).orderByKey().limitToLast(10).on("value", (snapshot) => {
			this.setFirebaseDataToMessageList(snapshot.val());
		});
	},
	updated() {
		this.room_id = this.roomid ? this.roomid : null;
	},
	methods: {
		setFirebaseDataToMessageList(data) {
			console.log("Received", data)
			const list = data ? Object.keys(data).map(function (key) { return data[key]; }) : [];
			this.chats = list
		},
		send() {
			if (this.roomid) {
				const data = {
					message: this.message,
					sender: auth.getUser(),
					sentAt: new Date().getTime()
				}
				db.ref(`rooms/${this.roomid}/chat`).push(data)
				this.message = ""
			}
		}	
	}
}
</script>