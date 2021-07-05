<template>
  <div>
    <!-- 联系人卡片 点击卡片时 会显示整个联系人列表界面-->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
    />

    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :tel-validator="()=>true"
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenContactId: null,//代表被选中的联系人的id
      editingContact: {}, //联系人编辑组件的回显数据
      showList: false, //控制联系人列表是否隐藏
      showEdit: false, //控制联系人编辑是否隐藏
      isEdit: false,  // 控制联系人编辑组件;是否多一个删除按钮
      // 联系人列表
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      }]
    };
  },

  computed: {
    //cardType 依赖于 chosenContactId
    //卡片类型
    cardType() {
      //chosenContactId 有值代表是编辑卡片
      //chosenContactId 无值代表是新增卡片
      return this.chosenContactId !== null ? 'edit' : 'add';
    },

    //currentContact 依赖于 chosenContactId list
    //当前选中的联系人信息
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },

  methods: {
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };//清空编辑页面的数据
      this.isEdit = false;  //不显示编辑界面的删除按钮
      this.showEdit = true; //显示编辑界面
    },
    // 编辑联系人
    onEdit(item) {
      //item 当前修改的联系人的信息
      this.editingContact = item;
      this.isEdit = true; //显示编辑界面的删除按钮
      this.showEdit = true;//显示编辑界面
    },
    // 保存联系人
    onSave(info) {
      this.showEdit = false; //关闭编辑页
      this.showList = false; //关闭列表页

      if (this.isEdit) {
        //做修改操作(保证按钮 删除按钮)
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        //做新增操作(保证按钮)
        this.list.push(info);
      }

      //新增完毕后 新增的那个联系人就是 选中的联系人
      this.chosenContactId = info.id;
    },
    // 删除联系人
    onDelete(info) {
      //info:当前联系人
      this.showEdit = false; //关闭编辑页
      this.list = this.list.filter(item => item.id !== info.id);
      //删除的那一条正好是选中的那一条 则清空chosenContactId
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
    // 选中联系人
    onSelect() {
      this.showList = false;//关闭列表界面
    }
  }
};
</script>

<style scoped>

</style>
