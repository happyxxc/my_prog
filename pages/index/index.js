// index.js

Page({
  data: {

    //*********************     筛选框        **************************************
    // city：选择地区
    // categories：选择组别
    // categoryIndex：组别索引
    // dates：组别索引
    // dateIndex：日期索引


    //地区
    city: '全部地区',
    //组别
    categories: ['全部组别', '混合组', '男子组', '女子组'],
    categoryIndex: 0,
    //日期（待开发）
    dates: ['全部日期', '本周', '本月', '下月'],
    dateIndex: 0
  },

  // 跳转到城市选择页
  goToCitySelect() {
    // 跳转时携带当前选中的城市（可选）
    wx.navigateTo({
      url: '/pages/cityselector/cityselector'
    })
  },
  // 城市筛选变化，自定义方法
  _upDateCity(cityvalue) {
    this.setData({
      city: cityvalue
    });

    //调试用
    console.log('选中地区：', cityvalue);
  },
  
  // 赛事组别筛选变化
  onCategoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value
    });

    //调试用
    console.log('选中组别：', this.data.categories[e.detail.value]);
  },
  
  // 日期筛选变化
  onDateChange(e) {
    this.setData({
      dateIndex: e.detail.value
    });

    //调试用
    console.log('选中日期：', this.data.dates[e.detail.value]);
  },
  
  // 搜索按钮点击（未实现）
  onSearch() {
    wx.showToast({
      title: '搜索功能触发',
      icon: 'none'
    });
    // 实际应用中可打开搜索页或显示搜索框
  },
})

