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
      publicRooms: []
    };
  },
  async mounted() {
    const config = {
      headers: await auth.getToken()
    };
    const response = await axios.get(BASE_URL + "/room/publicRooms", config)
    this.publicRooms = response.data.rooms
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
      auth.setToken(response.config);
      this.$router.push({name: 'Room', params: {room_id: response.data.userRoom.room_id}})
    },
    seeRoom(room) {
      this.$router.push({name: 'Room', params: {room_id: room.id}})
    }
  }
};
</script>