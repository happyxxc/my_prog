Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedCity:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  /**
   * 选择城市：核心逻辑——回传数据给页面index
   */
  selectCity(e) {
    // 1、获取选中的城市（从data-city中取）
    this.setData({
      selectedCity:e.detail.value
    })
    // 2、城市选择页中定位 index 页面，并将所选城市传给index页面
    const pages = getCurrentPages();
    //const indexPage = pages[0]
    const indexPage = pages.find(page => page.route === 'pages/index/index');
    indexPage._upDateCity(this.data.selectedCity)

    // 3、返回上级页面
    wx.navigateBack({
      delta: 1 
    });
  },

  /**
   * 未选择城市，直接返回页面1：保持页面1按钮原值
   */
  onUnload() {
    
  }
});