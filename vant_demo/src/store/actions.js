import {getContactList,addContactByForm,addContactByJson,editContact,delContact} from "api/contact.js"
export default {
  //发送请求获取list数据
  async getContactList(store){
    const {code,data:list} = await getContactList()
    if(code === 200){
      store.commit("updateList",list)
    }
  },

  //新增联系人
  async addContact(store,{name,tel}){
    //获取数据
    const {data:{id:chosenContactId}} =
      await addContactByJson({name,tel})
    //重新获取list数据
    await store.dispatch("getContactList")
    //更新state的list数据
    //新增完毕后 新增的那个联系人就是 选中的联系人
    store.commit("updateChosenId",chosenContactId)
  },

  //修改联系人
  async editContact(store,{name,tel,id}){
    const {data:{id:chosenContactId}} =
      await editContact({name,tel,id})
    //重新获取list数据
    await store.dispatch("getContactList")
    //更新state的list数据
    store.commit("updateChosenId",chosenContactId)
  },

  // 删除联系人
  async delContact(store,{id}){
    await delContact(id)
    //删除的那一条正好是选中的那一条 则清空chosenContactId (先动id 再动list)
    if (store.state.chosenContactId === id) {
      store.commit("updateChosenId",null)
    }
    await store.dispatch("getContactList")
  }
}
