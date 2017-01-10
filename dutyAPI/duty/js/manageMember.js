var getId = function() {
  var random = parseInt(Math.random() * 100);
  return '' + Date.now() + random;
}
var storage = window.localStorage;
var vm = new Vue({
  el: '#app',
  data: {
    members: storage['duty_members'] ? JSON.parse(storage['duty_members']) : [],
    num: '',
    name: '',
    info: ''
  },
  methods: {
    save: function() {
      storage['duty_members'] = JSON.stringify(vm.members);
    },
    delMember: function(id) {
      vm.members.forEach(function(mem, index) {
        if (mem.id == id) {
          vm.members.splice(index, 1);
          vm.save();
          return;
        }
      });
    },
    addmember: function() {
      //数据合法性验证
      var info = '';
      if (vm.num == '' || vm.name == '') {
        vm.info = '姓名或密码不为空'
        return;
      }
      this.members.push({
        "id": getId(),
        "num": vm.num,
        "name": vm.name,
        "dutytimes": 0
      });
      vm.save();
      vm.num = '';
      vm.name = '';
      vm.info = '';
      //将焦点移至工号文本框内
      document.getElementById('num').focus();
    }
  }
});
