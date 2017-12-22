import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld/HelloWorld'
import Styleguide from '@/components/Styleguide/Styleguide'
import StreamPage from '@/components/StreamPage/StreamPage'
import ViewPage from '@/components/ViewPage/ViewPage'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	{
		path: '/stream',
		name: 'StreamPage',
		component: StreamPage
	},
	{
		path: '/view',
		name: 'ViewPage',
		component: ViewPage
	},
	{
		path: '/style',
		name: 'Styleguide',
		component: Styleguide
	},
	{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	}
	]
})
