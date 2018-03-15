<template src="./template.html"></template>
<style lang="scss" scoped src="./style.scss"></style>

<script>
import axios from "axios";
import { BASE_URL } from "../../shared/constants";
import auth from "../../shared/auth";

export default {
  name: "Dashboard",
  data() {
    return {
      publicRooms: [],
      privateRooms: [],
      dialog: false,
      password: "",
      currentPrivate: null
    };
  },
  async mounted() {
    const config = {
      headers: await auth.getToken()
    };
    const response = await axios.get(BASE_URL + "/room/publicRooms", config)
    this.publicRooms = response.data.rooms
    auth.setToken(response.config)
    const config2 = {
      headers: await auth.getToken()
    };
    const response2 = await axios.get(BASE_URL + "/room/privateRooms", config2)
    this.privateRooms = response2.data.rooms
    auth.setToken(response.config)
  },
  methods: {
    async joinRoom(room) {
      const config = {
        headers: await auth.getToken()
      }
      const data = {
        user_email: config.headers.uid,
        room_id: room.id
      }
      const response = await axios.post(BASE_URL + "/room/joinPublic", data, config)
      console.log(response)
      auth.setToken(response.config);
      this.$router.push({name: 'Room', params: {room_id: response.data.userRoom.room_id}})
    },
    async promptPassword(room) {
      this.dialog = true
      this.currentPrivate = room
    },
    async joinPrivateRoom() {
      const config = {
        headers: await auth.getToken()
      }
      console.log(this.password)
      const data = {
        user_email: config.headers.uid,
        room_id: this.currentPrivate.id,
        password: this.password
      }
      const response = await axios.post(BASE_URL + "/room/joinPrivate", data, config)
      auth.setToken(response.config);
      if (response.data.userRoom) {
        this.$router.push({name: 'Room', params: {room_id: response.data.userRoom.room_id}}) 
      } else {
        alert("Invalid password!")
      }
      this.dialog = false
      this.password = ""
    },
    seeRoom(room) {
      this.$router.push({name: 'Room', params: {room_id: room.id}})
    }
  }
};
</script>