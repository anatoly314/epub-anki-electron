import Epub from "@/components/Epub";
import Markdown from "@/components/Markdown";

export const routes = [{
    path: '/',
    component: Epub,
    name: 'epub'
},{
    path: '/markdown',
    component: Markdown,
    name: 'markdown'
}];
