import { createRouter, createWebHashHistory} from "vue-router";    
 const routes=[ {                                                  
         path:'/',                                                 
         name:'Login',                                              
         component: ()=> import ("/src/router/views/LoginPage.vue")       
     },
     {                                                  
        path:'/feed',                                                 
        name:'Feed',                                              
        component: ()=> import ("/src/router/views/FeedPage.vue")       
    }]                                                            
 const router =createRouter({                                      
     history:createWebHashHistory(),                               
     routes,                                                       
 })                                                                
 export default router; 