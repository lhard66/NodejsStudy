var staff = [{
  "id": 1,
  "name": "张三",
  "dutytimes": 5
}, {
  "id": 2,
  "name": "李四",
  "dutytimes": 0
}, {
  "id": 3,
  "name": "王五",
  "dutytimes": 3
}, {
  "id": 4,
  "name": "田六",
  "dutytimes": 2
}];


var getId = function() {
  var random = parseInt(Math.random() * 100);
  return '' + Date.now() + random;
}
var storage = window.localStorage;
var vm = new Vue({
  el: '#app',
  data: {
    //此处通过异步请求赋值。
    //members: storage['duty_members'] ? JSON.parse(storage['duty_members']) : [],
    members: '',
    num: '',
    name: '',
    info: ''
  },
  mounted: function() {
    //this.members = staff;
    var mv = this;
    axios.get('http://127.0.0.1:3000/duty/listmem')
      .then(function(response) {
        // console.log(response.data);
        mv.members = response.data;
      }).catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    save: function() {
      storage['duty_members'] = JSON.stringify(vm.members);
    },
    delMember: function(id) {
      vm.members.forEach(function(mem, index) {
        if (mem._id == id) {
          vm.members.splice(index, 1);
          //删除数据库中的数据
          axios.get('http://127.0.0.1:3000/duty/delmem/', {
              params: {
                'id': id
              }
            }).then(function(response) {
              console.log(response.data)
            }).catch(function(error) {
              console.log(error)
            })
            //vm.save();
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
      //vm.save();
      //后台部分
      axios.post('http://127.0.0.1:3000/duty/addmem', {
        params: {
          "num": vm.num,
          "name": vm.name,
          "dutytimes": 0
        }
      }).then(function(response) {
        let obj = response.data;
        console.log(obj);
      }).catch(function(err) {
        console.log(err);
      })
      vm.num = '';
      vm.name = '';
      vm.info = '';
      //将焦点移至工号文本框内
      document.getElementById('num').focus();
    }
  }
});
