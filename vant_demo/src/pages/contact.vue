<!--带数据库版本-->
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
import {mapState,mapMutations,mapActions,mapGetters} from "vuex";
export default {
  data() {
    return {
      editingContact: {}, //联系人编辑组件的回显数据
      showList: false, //控制联系人列表是否隐藏
      showEdit: false, //控制联系人编辑是否隐藏
      isEdit: false,  // 控制联系人编辑组件;是否多一个删除按钮
    };
  },
  computed: {
    ...mapState(["list"]),
    ...mapGetters(["cardType","currentContact"]),
    chosenContactId:{
      get(){
        return this.$store.state.chosenContactId
      },
      set(chosenContactId){
        this.updateChosenId(chosenContactId)
      }
    }
  },
  methods: {
    ...mapActions(["getContactList","addContact","editContact","delContact"]),
    ...mapMutations(["updateChosenId"]),
    // 添加联系人
    onAdd() {
      this.editingContact = {};//清空编辑页面的数据
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
    async onSave(info) {
      this.showEdit = false; //关闭编辑页
      this.showList = false; //关闭列表页
      if (this.isEdit) {
       //是编辑的情况
        await this.editContact(info)
      } else {
        //做新增操作(保存按钮)  发送请求新增数据 只是数据库中多了一条数据
        //一定要保证list先更新 chosenContactId再更新
        //没有await会报错 但是不影响界面的渲染 报错的原因是因为currentContact为undefined
        await this.addContact(info)
      }
    },
    async onDelete(info) {
      //info:当前联系人
      this.showEdit = false; //关闭编辑页
      await this.delContact(info)
    },
    // 选中联系人
    onSelect() {
      this.showList = false;//关闭列表界面
    }
  },
  async created() {
    //发送请求获取list数据
    await this.getContactList()
    //后续操作需要在请求完成之后再进行的 加await
  }
};
</script>

<style scoped>

</style>
