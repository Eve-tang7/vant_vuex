export default {
  //cardType 依赖于 chosenContactId
  //卡片类型
  cardType(state) {
    //chosenContactId 有值代表是编辑卡片
    //chosenContactId 无值代表是新增卡片
    return state.chosenContactId !== null ? 'edit' : 'add';
  },

  //currentContact 依赖于 chosenContactId list
  //当前选中的联系人信息
  currentContact(state) {
    const id = state.chosenContactId;
    return id !== null ? state.list.filter
    (item => item.id === id)[0] : {};
  }
}
