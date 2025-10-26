// pages/match/match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 筛选条件数据
    areas: ['全部地区', '北京', '天津', '河北'],
    categories: ['全部组别', '业余组', '专业组', '青少年组'],
    dates: ['全部日期', '最近一周', '最近一月', '自定义'],
    areaIndex: 0,
    categoryIndex: 0,
    dateIndex: 0,
    
    // 赛事列表数据
    matches: [
      {
        id: 1,
        title: '北京秋季城市杯',
        date: '10月28日',
        location: '朝阳体育中心橄榄球场',
        status: '即将开始',
        imgUrl: 'https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/13a5995b44a14aafb2672138182317c2.png~tplv-a9rns2rl98-24-95-exif:960:960.png?rcl=20251024215207868FA584BAF240A21258&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1761918728&x-signature=ph6G4rz3K9eXZa%2FR7SzNiFOlLE0%3D',
        isFavorite: false
      },
      {
        id: 2,
        title: '京津冀腰旗橄榄球邀请赛',
        date: '11月11日',
        location: '北京奥林匹克体育中心',
        status: '即将开始',
        imgUrl: 'https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/fc884d55fa2348f280fbbeffdfeb133b.png~tplv-a9rns2rl98-24:720:720.png?rcl=2025102421590064E952D3609C5BA8B4A4&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1761919140&x-signature=v3RncSwVUJ6%2FfjIMIyn%2FeXCv734%3D',
        isFavorite: false
      },
      {
        id: 3,
        title: '北京业余腰旗橄榄球赛',
        date: '11月01日',
        location: '各区县体育中心',
        status: '已结束',
        imgUrl: 'https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/ec9138d4a64a46b7bf7778da2f6dd673.png~tplv-a9rns2rl98-24:720:720.png?rcl=202510242205508B553DC6BCC6C69108AC&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1761919550&x-signature=inKstKwbHsl0k5PtXBmAW0yJ6fU%3D',
        isFavorite: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉刷新逻辑
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 上拉加载更多逻辑
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '橄榄力赛事列表',
      path: '/pages/match/match'
    }
  },

  // 筛选器变化事件
  onAreaChange(e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },

  onCategoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },

  onDateChange(e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },

  // 搜索事件
  onSearch() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  },

  // 收藏按钮点击事件
  toggleFavorite(e) {
    const id = e.currentTarget.dataset.id
    const updatedMatches = this.data.matches.map(match => {
      if (match.id === id) {
        return { ...match, isFavorite: !match.isFavorite }
      }
      return match
    })
    this.setData({
      matches: updatedMatches
    })
  }
})