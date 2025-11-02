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
    dateSelect:['全部日期','选择日期'],
    dateSelectIndex:0,
    showCalendar:false,
    date:{
      year:'',
      month:'',
      day:'',
      all: true 
    },
    dateShow:'全部日期',
    
    // 分页相关参数
    pageSize: 5, // 每页显示5个
    currentPage: 1, // 当前页码
    hasMore: true, // 是否还有更多数据
    
    // 原始赛事数据
    allMatches: [
      {
        id: 1,
        title: '北京秋季城市杯',
        date: {
          year:'2025',
          month:'10',
          day:'28'
        },
        location: '朝阳体育中心橄榄球场',
        status: 'upcoming', // upcoming: 即将开始, ended: 已结束
        image: 'https://placehold.co/400x300/e9f1fa/1a73e8?text=Rugby+Match+1',
        city: '北京',
        category: '混合组'
      },
      {
        id: 2,
        title: '京津冀橄榄球联谊赛',
        date: {
          year:'2025',
          month:'11',
          day:'11'
        },
        location: '北京奥林匹克体育中心',
        status: 'upcoming',
        image: 'https://placehold.co/400x300/fff3e0/ff9800?text=Rugby+Match+2',
        city: '北京',
        category: '男子组'
      },
      {
        id: 3,
        title: '北京业余橄榄球联赛',
        date: {
          year:'2025',
          month:'11',
          day:'1'
        },
        location: '各区体育中心',
        status: 'ended',
        image: 'https://placehold.co/400x300/e8f5e8/4caf50?text=Rugby+Match+3',
        city: '北京',
        category: '女子组'
      },
      {
        id: 4,
        title: '全国橄榄球赛分区赛',
        date: {
          year:'2025',
          month:'12',
          day:'5'
        },
        location: '上海体育中心',
        status: 'upcoming',
        image: 'https://placehold.co/400x300/ffebee/f44336?text=Rugby+Match+4',
        city: '上海',
        category: '男子组'
      },
      {
        id: 5,
        title: '青少年橄榄球训练营',
        date: {
          year:'2025',
          month:'11',
          day:'20'
        },
        location: '北京朝阳公园',
        status: 'upcoming',
        image: 'https://placehold.co/400x300/f3e5f5/9c27b0?text=Rugby+Match+5',
        city: '北京',
        category: '混合组'
      },
      {
        id: 6,
        title: '华东地区橄榄球邀请赛',
        date: {
          year:'2025',
          month:'12',
          day:'15'
        },    
        location: '南京奥体中心',
        status: 'upcoming',
        image: 'https://placehold.co/400x300/e0f7fa/03a9f4?text=Rugby+Match+6',
        city: '南京',
        category: '男子组'
      },
      {
        id: 7,
        title: '春季橄榄球联赛预热赛',
        date: {
          year:'2025',
          month:'1',
          day:'10'
        },    
        location: '广州天河体育中心',
        status: 'upcoming',
        image: 'https://placehold.co/400x300/f1f8e9/8bc34a?text=Rugby+Match+7',
        city: '广州',
        category: '女子组'
      },
      {
        id: 8,
        title: '冬季橄榄球友谊赛',
        date: {
          year:'2025',
          month:'1',
          day:'25'
        },    
        location: '深圳湾体育中心',
        status: 'upcoming',
        image: 'https://placehold.co/400x300/fafafa/607d8b?text=Rugby+Match+8',
        city: '深圳',
        category: '混合组'
      }
    ],
    
    // 显示的赛事数据
    matches: []

  },
  
  onLoad() {
    // 初始化时加载第一页数据
    this._loadMatches();
  },
  
  onShow() {
    // 页面显示时重置为第一页并重新加载5个数据
    this.setData({
      currentPage: 1,
      matches: []
    });
    this._loadMatches();
  },
  

  // 加载赛事数据（带筛选功能）
  _loadMatches() {
    const { allMatches, currentPage, pageSize, city, categoryIndex, categories, date } = this.data;
    
    // 进行筛选
    let filteredMatches = allMatches.filter(match => {
      // 城市筛选
      const cityMatch = city === '全部地区' || match.city === city;
      // 组别筛选
      const categoryMatch = categoryIndex === 0 || match.category === categories[categoryIndex];
      // 日期筛选
      const dateMatch = date.all || (match.date.year === date.year && match.date.month === date.month && match.date.day === date.day);
      
      return cityMatch && categoryMatch && dateMatch;
    });
    
    // 分页处理
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageMatches = filteredMatches.slice(start, end);
    
    // 更新显示的数据
    this.setData({
      matches: pageMatches,
      hasMore: end < filteredMatches.length
    });
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
      city: cityvalue,
      currentPage: 1 // 重置页码
    });
    
    // 应用筛选并重新加载数据
    this._loadMatches();
    
    console.log('选中地区：', cityvalue);
  },
  
  // 赛事组别筛选变化
  onCategoryChange(e) {
    // 将字符串类型的索引转换为数字类型
    const index = Number(e.detail.value);
    this.setData({
      categoryIndex: index,
      currentPage: 1 // 重置页码
    });
    
    // 应用筛选并重新加载数据
    this._loadMatches();
    
    console.log('选中组别：', this.data.categories[index]);
  },
  
  // 日期筛选变化
  onDateChange(event){
    // 将event.detail.value转换为数字类型
    const index = Number(event.detail.value);
    console.log('Picker返回的索引值:', index);
    
    // 始终更新dateSelectIndex为Picker返回的索引值
    this.setData({
      dateSelectIndex: index
    });
    
    if (this.data.dateSelect[index] === '选择日期') {
      this._onDisplayDate();
    } else {
      // 当选择全部日期时，设置date中all为true
      this.setData({
        date:{
          all: true
        },
        dateShow: '全部日期'
      });
      
      // 重置页码并重新加载数据
      this.setData({ currentPage: 1 });
      this._loadMatches();
    }
    
    console.log('更新后的dateSelectIndex:', this.data.dateSelectIndex);
  },

  _onDisplayDate(){
    this.setData({ showCalendar: true });
  },
  onCloseCalendar(){
    this.setData({ showCalendar: false });
  },
  onConfirmDate(event){
    console.log('选择的日期:', event.detail);
    const date = this._formatDate(event.detail);
    this.setData({
      showCalendar: false,
      date: date ,
      dateShow: `${date.month}月${date.day}日`,
      currentPage: 1 // 重置页码
    });
    
    // 应用筛选并重新加载数据
    this._loadMatches();
  },
  _formatDate(date) {
    date = new Date(date);
    // 将返回的日期组件转换为字符串类型，与赛事数据中的类型保持一致
    return {
      year: String(date.getFullYear()),
      month: String(date.getMonth() + 1),
      day: String(date.getDate()),
      all: false
    };
  },
  
  // 搜索按钮点击（未实现）
  onSearch() {
    wx.showToast({
      title: '搜索功能触发',
      icon: 'none'
    });
    // 实际应用中可打开搜索页或显示搜索框
  },
  
  // 赛事详情点击事件
  onMatchDetail(e) {
    const matchId = e.currentTarget.dataset.id;
    // 这里可以跳转到赛事详情页
    wx.showToast({
      title: `查看赛事ID: ${matchId}`,
      icon: 'none'
    });
    // 实际应用中可以使用wx.navigateTo跳转到详情页
    // wx.navigateTo({
    //   url: `/pages/matchDetail/matchDetail?id=${matchId}`
    // });
  },
  
  // 监听上拉触底事件（下拉加载更多）
  onReachBottom() {
    console.log('上拉触底被触发', this.data.currentPage, this.data.hasMore);
    
    // 判断是否还有更多数据
    if (this.data.hasMore) {
      // 显示加载提示
      wx.showLoading({
        title: '加载中...',
      });
      
      // 增加页码
      const nextPage = this.data.currentPage + 1;
      console.log('加载第', nextPage, '页');
      
      // 延迟一下模拟网络请求
      setTimeout(() => {
        const { allMatches, pageSize, matches, city, categoryIndex, categories, date } = this.data;
        
        // 先筛选
        let filteredMatches = allMatches.filter(match => {
          const cityMatch = city === '全部地区' || match.city === city;
          const categoryMatch = categoryIndex === 0 || match.category === categories[categoryIndex];
          const dateMatch = date.all || (match.date.year === date.year && match.date.month === date.month && match.date.day === date.day);
          return cityMatch && categoryMatch && dateMatch;
        });
        
        // 再分页
        const start = (nextPage - 1) * pageSize;
        const end = start + pageSize;
        const newPageMatches = filteredMatches.slice(start, end);
        
        console.log('新数据数量:', newPageMatches.length);
        
        // 合并数据并更新页码
        this.setData({
          matches: [...matches, ...newPageMatches],
          currentPage: nextPage,
          hasMore: end < filteredMatches.length
        });
        
        console.log('更新后总数:', this.data.matches.length, '是否有更多:', this.data.hasMore);
        
        // 隐藏加载提示
        wx.hideLoading();
        
        // 如果没有更多数据，显示提示
        if (!this.data.hasMore) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          });
        }
      }, 500);
    } else {
      console.log('没有更多数据可加载');
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 1000
      });
    }
  },
})

