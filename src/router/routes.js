import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/Home'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Profile from '@/pages/Profile'
import UploadPhoto from '@/pages/AddPhoto'
import UpdatePhoto from '@/pages/UpdatePhoto'
import Explore from '@/pages/Explore'
import AddTag from '@/pages/AddTag'
import About from '@/pages/About'
import UserProfile from '@/pages/UserProfile'
import HomeFollowing from '@/pages/HomeFollowing'
Vue.use(Router);

function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
  if(Vue.getToken()!= null)
    isAuthenticated = true;
  else
    isAuthenticated= false;
  if(isAuthenticated) 
  {
    next(); // allow to enter route (Page)
  } 
  else
  {
    next('/login'); // go to '/login';
  }
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomePage
      }
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        default: Login
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        default: Signup
      }
    },
    {
      path: '/upload',
      name: 'UploadPhoto',
      beforeEnter : guardMyroute,
      components: {
        default: UploadPhoto
      }
    },
    {
      path: '/UpdatePhoto',
      name: 'UpdatePhoto',
      beforeEnter : guardMyroute,
      components: {
        default: UpdatePhoto
      },
      props: (route) => ({ query: route.query.q })
    },
    {
      path: '/about',
      name: 'About',
      components: {
        default: About
      }
    },
    {
      path: '/addtag',
      name: 'AddTag',
      beforeEnter : guardMyroute,
      components: {
        default: AddTag
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      beforeEnter : guardMyroute,
      components: {
        default: Profile
      },
    },
    {
      path: '/user',
      name: 'user',
      beforeEnter : guardMyroute,
      components: {
        default: UserProfile
      },
      props: (route) => ({ query: route.query.q })
    },
    {
      path: '/explore',
      name: 'Explore',
      beforeEnter : guardMyroute,
      components: {
        default: Explore
      }
    },
    {
      path: '/homeFollowing',
      name: 'Following',
      beforeEnter : guardMyroute,
      components: {
        default: HomeFollowing
      }
    },

  ],
  mode: 'history'
})
