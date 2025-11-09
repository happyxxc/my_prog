// pages/matchDetail/matchDetail.js
Page({
  data: {
    matchId: '',
    matchInfo: null,
    isLoading: true,
    // 模拟赛事数据
    mockMatchData: {
      1: {
        id: 1,
        title: '北京秋季城市杯腰旗橄榄球联赛',
        date: {
          year: '2025',
          month: '10',
          day: '28'
        },
        time: '09:00-18:00',
        location: '朝阳体育中心',
        category: '混合组',
        image: 'https://placehold.co/400x300/e9f1fa/1a73e8?text=Rugby+Match+1',
        status: 'upcoming',
        schedule: [
          {
            phase: '小组赛阶段',
            date: '10月28日',
            time: '14:00-16:30',
            matches: 'A组循环赛'
          },
          {
            phase: '小组赛阶段',
            date: '10月28日',
            time: '16:30-18:00',
            matches: 'B组循环赛'
          },
          {
            phase: '半决赛',
            date: '11月4日',
            time: '14:00-16:00',
            matches: 'A组第一 vs B组第二'
          },
          {
            phase: '半决赛',
            date: '11月4日',
            time: '16:00-18:00',
            matches: 'B组第一 vs A组第二'
          },
          {
            phase: '决赛',
            date: '11月11日',
            time: '14:00-16:00',
            matches: '半决赛胜者'
          }
        ],
        teams: [
          '北京雄狮队', '朝阳猛虎队', '海淀龙队', '丰台猎豹队', '石景山鹰队', 
          '通州狸猫队', '西城麒麟队', '东城凤凰队', '昌平熊猫队'
        ]
      },
      2: {
        id: 2,
        title: '京津冀腰旗橄榄球联谊赛',
        date: {
          year: '2025',
          month: '11',
          day: '11'
        },
        time: '09:00-17:00',
        location: '北京奥林匹克体育中心',
        category: '男子组',
        image: 'https://placehold.co/400x300/fff3e0/ff9800?text=Rugby+Match+2',
        status: 'upcoming',
        schedule: [
          {
            phase: '小组赛阶段',
            date: '11月11日',
            time: '10:00-12:00',
            matches: '小组赛第一轮'
          },
          {
            phase: '小组赛阶段',
            date: '11月11日',
            time: '13:00-15:00',
            matches: '小组赛第二轮'
          },
          {
            phase: '决赛',
            date: '11月11日',
            time: '15:30-17:00',
            matches: '小组赛胜者对决'
          }
        ],
        teams: [
          '北京队', '天津队', '河北队', '石家庄队', '廊坊队', '保定队'
        ]
      },
      3: {
        id: 3,
        title: '北京业余腰旗橄榄球联赛',
        date: {
          year: '2025',
          month: '11',
          day: '1'
        },
        time: '10:00-16:00',
        location: '各区体育中心',
        category: '女子组',
        image: 'https://placehold.co/400x300/e8f5e8/4caf50?text=Rugby+Match+3',
        status: 'ended',
        schedule: [
          {
            phase: '联赛第一轮',
            date: '11月1日',
            time: '10:00-14:00',
            matches: '分组循环赛'
          },
          {
            phase: '决赛阶段',
            date: '11月1日',
            time: '14:30-16:00',
            matches: '名次赛'
          }
        ],
        teams: [
          '北京女队', '朝阳女队', '海淀女队', '西城女队', '东城女队'
        ]
      }
    }
  },

  // 页面加载时执行
  onLoad(options) {
    // 从URL参数中获取赛事ID
    const { id } = options;
    this.setData({
      matchId: id || '1' // 如果没有ID，默认为第一个赛事
    });
    
    // 加载赛事详情数据
    this.loadMatchDetail();
  },

  // 加载赛事详情数据
  loadMatchDetail() {
    const { matchId, mockMatchData } = this.data;
    
    // 模拟网络请求延迟
    setTimeout(() => {
      // 从模拟数据中获取赛事信息
      const matchInfo = mockMatchData[matchId] || null;
      
      this.setData({
        matchInfo,
        isLoading: false
      });
    }, 500);
  },

  // 立即报名按钮点击事件
  onRegister() {
    wx.showToast({
      title: '报名功能待实现',
      icon: 'none'
    });
  },

  // 返回首页按钮点击事件
  onBack() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  },

  // 分享按钮点击事件
  onShareAppMessage() {
    const { matchInfo } = this.data;
    
    return {
      title: matchInfo ? matchInfo.title : '赛事详情',
      path: `/pages/matchDetail/matchDetail?id=${this.data.matchId}`,
      imageUrl: matchInfo ? matchInfo.image : ''
    };
  },

  // 右上角导航栏按钮点击事件
  onNavigationBarButtonTap() {
    // 触发页面分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  }
});