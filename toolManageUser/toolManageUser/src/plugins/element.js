import Vue from 'vue'
import {
    Button, Dialog, Input, Message, MessageBox, Carousel, CarouselItem, Pagination, Breadcrumb, BreadcrumbItem, Form,
    FormItem,Checkbox,Tabs,TabPane,Rate,Tag,Dropdown,DropdownItem,DropdownMenu,Col
} from 'element-ui'
// 在调用 Vue.use 前，给 Message 添加 install 方法
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.component(Dialog.name, Dialog)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Col.name, Col)
Vue.component(Rate.name, Rate)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Pagination.name, Pagination)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Tag.name, Tag)
