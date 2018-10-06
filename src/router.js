import Vue from 'vue'
import Router from 'vue-router'
import ShowAllComponent from './views/show-all.vue';
import AddNewComponent from './views/add-new.vue';
import DeleteComponent from './views/delete.vue';
import EditComponent from './views/edit.vue';
import ShowOneComponent from './views/show.vue';
import NotFoundComponent from './views/not-found.vue';

Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            redirect: '/tasks'
        }, {
            name: 'tasks',
            path: '/tasks',
            component: ShowAllComponent
        },
        {
            name: 'add-new',
            path: '/new',
            component: AddNewComponent
        },
        {
            name: 'task',
            path: '/task/:id',
            component: ShowOneComponent,
        },
        {
            path: '/task/:id/edit',
            name: 'edit',
            component: EditComponent
        },
        {
            path: '/task/:id/delete',
            name: 'delete',
            component: DeleteComponent
        },


        {
            path: '*',
            component: NotFoundComponent
        }
    ]
})