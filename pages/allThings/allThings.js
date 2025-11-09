// pages/allThings/allThings.js
Page({
  data: {
    // 当前激活的Tab
    activeTab: 'teams',
    
    // 筛选数据
    regions: ['全部地区', '北京', '上海', '广州', '深圳', '成都', '杭州', '武汉'],
    regionIndex: 0,
    
    levels: ['全部级别', '职业级', '业余级', '高校级', '青少年级'],
    levelIndex: 0,
    
    sortOptions: ['名称排序', '成立时间', '冠军数量', '比赛场次'],
    sortIndex: 0,
    
    // 球队数据
    teams: [
      {
        id: 1,
        name: '北京Contenders',
        year: '2018年',
        city: '北京',
        championships: 13,
        matches: 120,
        logoBgColor: '#3f51b5',
        logoIcon: '🛡️',
        isFavorite: false
      },
      {
        id: 2,
        name: '上海闪电队',
        year: '2019年',
        city: '上海',
        championships: 3,
        matches: 96,
        logoBgColor: '#e91e63',
        logoIcon: '⚡',
        isFavorite: false
      },
      {
        id: 3,
        name: '广州火箭少年队',
        year: '2020年',
        city: '广州',
        championships: 1,
        matches: 68,
        logoBgColor: '#ff9800',
        logoIcon: '🚀',
        isFavorite: false
      },
      {
        id: 4,
        name: '深圳猎人队',
        year: '2017年',
        city: '深圳',
        championships: 8,
        matches: 112,
        logoBgColor: '#4caf50',
        logoIcon: '🏹',
        isFavorite: false
      },
      {
        id: 5,
        name: '成都熊猫队',
        year: '2018年',
        city: '成都',
        championships: 5,
        matches: 85,
        logoBgColor: '#9c27b0',
        logoIcon: '🐼',
        isFavorite: false
      },
      {
        id: 6,
        name: '杭州西湖龙',
        year: '2019年',
        city: '杭州',
        championships: 2,
        matches: 72,
        logoBgColor: '#00bcd4',
        logoIcon: '🐉',
        isFavorite: false
      }
    ]
  },

  onLoad() {
    // 页面加载时的初始化操作
    console.log('百事通页面加载');
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    
    // 如果切换到球星介绍，可以在这里加载球星数据
    if (tab === 'players') {
      console.log('切换到球星介绍Tab');
      // 这里可以添加加载球星数据的逻辑
    }
  },

  // 地区筛选变化
  bindRegionChange(e) {
    this.setData({
      regionIndex: e.detail.value
    });
    this.filterTeams();
  },

  // 级别筛选变化
  bindLevelChange(e) {
    this.setData({
      levelIndex: e.detail.value
    });
    this.filterTeams();
  },

  // 排序方式变化
  bindSortChange(e) {
    this.setData({
      sortIndex: e.detail.value
    });
    this.sortTeams();
  },

  // 筛选球队
  filterTeams() {
    // 这里实现筛选逻辑
    const { regionIndex, regions, teams } = this.data;
    
    let filteredTeams = [...teams];
    
    // 按地区筛选
    if (regionIndex > 0) {
      const selectedRegion = regions[regionIndex];
      filteredTeams = filteredTeams.filter(team => team.city === selectedRegion);
    }
    
    // 这里可以添加按级别的筛选逻辑
    
    // 应用排序
    this.sortTeams(filteredTeams);
  },

  // 排序球队
  sortTeams(filteredTeams = null) {
    const { sortIndex } = this.data;
    let teamsToSort = filteredTeams || [...this.data.teams];
    
    switch (sortIndex) {
      case 0: // 名称排序
        teamsToSort.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 1: // 成立时间
        teamsToSort.sort((a, b) => a.year.localeCompare(b.year));
        break;
      case 2: // 冠军数量
        teamsToSort.sort((a, b) => b.championships - a.championships);
        break;
      case 3: // 比赛场次
        teamsToSort.sort((a, b) => b.matches - a.matches);
        break;
    }
    
    this.setData({
      teams: teamsToSort
    });
  },

  // 搜索功能
  onSearch() {
    wx.showToast({
      title: '搜索功能待实现',
      icon: 'none'
    });
  },

  // 收藏按钮点击事件
  // 阻止事件冒泡，避免触发父元素的事件
  onFavorite(e) {
    const teamId = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    // 获取当前收藏状态（默认未收藏）
    const isFavorite = this.data.teams[index].isFavorite || false;
    
    // 更新收藏状态
    const newTeams = [...this.data.teams];
    newTeams[index] = { ...this.data.teams[index], isFavorite: !isFavorite };
    
    // 更新数据
    this.setData({
      teams: newTeams
    });
    
    // 显示收藏/取消收藏提示
    wx.showToast({
      title: isFavorite ? '已取消收藏' : '收藏成功',
      icon: 'success',
      duration: 2000
    });
    
    // 在实际应用中，这里应该调用API将收藏状态同步到服务器
    console.log(`${isFavorite ? '取消收藏' : '收藏'}球队:`, teamId);
  }
});