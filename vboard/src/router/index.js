import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld/HelloWorld'
import Styleguide from '@/components/Styleguide/Styleguide'
import StreamPage from '@/components/StreamPage/StreamPage'
import ViewPage from '@/components/ViewPage/ViewPage'
import LogIn from '@/components/LogIn/LogIn'
import LogOut from '@/components/LogOut/LogOut'
import Dashboard from '@/components/Dashboard/Dashboard'
import Profile from '@/components/Profile/Profile'
import CreateRoom from '@/components/CreateRoom/CreateRoom'
import Room from '@/components/Room/Room'
import RoomStream from '@/components/RoomStream/RoomStream'
import RoomView from '@/components/RoomView/RoomView'
import auth from '../shared/auth'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		beforeEnter: (to, from, next) => {
			let isAuthenticated = auth.isAuthed()
			if (isAuthenticated)
				next()
			else
				next({ path: 'LogIn' })
		}
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/login',
		name: 'LogIn',
		component: LogIn
	},	
	{
		path: '/logout',
		name: 'LogOut',
		component: LogOut,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/stream',
		name: 'StreamPage',
		component: StreamPage,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/view',
		name: 'ViewPage',
		component: ViewPage,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/style',
		name: 'Styleguide',
		component: Styleguide
	},
	{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/CreateRoom',
		name: 'CreateRoom',
		component: CreateRoom,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/Room/:room_id',
		name: 'RoomId',
		component: Room,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/Room',
		name: 'Room',
		component: Room,
		props: true,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/RoomStream',
		name: 'RoomStream',
		component: RoomStream,
		props: true,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	},
	{
		path: '/RoomView',
		name: 'RoomView',
		component: RoomView,
		props: true,
		beforeEnter: async (to, from, next) => {
			let isAuthenticated = await auth.isAuthed()
			next(isAuthenticated)
		}
	}
	]
})
