import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld/HelloWorld'
import Styleguide from '@/components/Styleguide/Styleguide'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	{
		path: '/style',
		name: 'Styleguide',
		component: Styleguide
	}, {
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	}
	]
})
