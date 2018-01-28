import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld/HelloWorld'
import Styleguide from '@/components/Styleguide/Styleguide'
import StreamPage from '@/components/StreamPage/StreamPage'
import ViewPage from '@/components/ViewPage/ViewPage'
import LogIn from '@/components/LogIn/LogIn'
import Dashboard from '@/components/Dashboard/Dashboard'
import Profile from '@/components/Profile/Profile'
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
	}
	]
})
