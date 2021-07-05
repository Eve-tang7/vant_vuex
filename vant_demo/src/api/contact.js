import axios from "axios";

const contact = axios.create({
  timeout:5000,
  baseURL:"http://localhost:9000/api"
})

//拦截器
contact.interceptors.request.use(function (config) {
  return config;
});

// 添加响应拦截器
contact.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

//获取联系人的列表数据
export const getContactList = ()=>contact.get
("/contactList")

//新增联系人
export const addContactByForm =({name,tel})=>{
  //对name，tel进行格式转化
  const formData = new FormData
  formData.append("name",name)
  formData.append("tel",tel)
  return contact.post("/contact/new/form",formData)
}
export const addContactByJson=({name,tel})=> contact.post
 ("/contact/new/json",{name,tel})

//编辑联系人
export const editContact = ({name,tel,id})=>contact.put
("/contact/edit",{name,tel,id})

//删除联系人
export const delContact = id=>contact.delete
("/contact",{params:{id}})
