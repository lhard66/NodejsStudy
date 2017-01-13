var chinaWeek = ['日', '一', '二', '三', '四', '五', '六'];
//var storage = window.localStorage;
// var getId = function() {
//   var random = parseInt(Math.random() * 1000);
//   return '' + Date.now() + random;
// }
var url='';
var vm = new Vue({
  el: '#app',
  data: {
    //company: storage['duty_company'] ? JSON.parse(storage['duty_company']) : [],
    //members: storage['duty_members'] ? JSON.parse(storage['duty_members']) : [],
    company: '',
    members: '',
    selmembers: []
  },
  mounted: function() {
    var mv = this;
    axios.get('/duty/listmem')
      .then(function(response) {
        console.log(response.data);
        mv.members = response.data;
      }).catch(function(err) {
        console.log(err);
      });
    axios.get('/duty/listduty')
      .then(function(response) {
        mv.company = response.data;
        console.log(response.data)
      }).catch(function(err) {
        console.log(err)
      })
  },
  methods: {  
    addMember: function() {
      var vm = this;
      var mSelmembers = this.selmembers
      this.selmembers.forEach(function(name) {
        for (var num in vm.members) {
          var employee = vm.members[num];
          if (employee.name == name) {
            employee.dutytimes += 1;
          }
        }
      });
      axios.post('/duty/addduty', {
          "date": Date.now(),
          "members": mSelmembers
        }).then(function(response) {
          if (response.data == 'err') {
            return;
          }
          vm.company.unshift({
            "_id": response.data,
            "date": Date.now(),
            "members": mSelmembers
          });
        }).catch(function(err) {
          console.log(err)
        })
        
        //重置多选按钮
      this.selmembers = [];
    },
    remove: function(id) {      
      axios.get('/duty/delduty', {
        params: {
          'id': id
        }
      }).then(function(response) {
        console.log(response.data)
      }).catch(function(err) {
        console.log(err)
      })

      this.company.forEach(function(element, index) {
        if (id == element._id) {
          this.company.splice(index, 1);
          this.saveCompany();
          return;
        }
      }.bind(this));
    }
  },
  filters: {
    dutydate: function(val) {
      var dateObj = new Date(parseInt(val));
      var month = dateObj.getMonth() + 1;
      var date = dateObj.getDate();
      var weekNum = dateObj.getDate();
      var week = '日';
      if (weekNum >= 0 && weekNum <= 6) {
        var week = chinaWeek[weekNum];
      }
      return month + '月' + date + '日，周' + week;
    }
  }
})
