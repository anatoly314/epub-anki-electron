import Epub from "@/views/Epub";
import Markdown from "@/views/Markdown";

export const routes = [{
    path: '/',
    component: Epub,
    name: 'epub'
},{
    path: '/markdown',
    component: Markdown,
    name: 'markdown'
}];
