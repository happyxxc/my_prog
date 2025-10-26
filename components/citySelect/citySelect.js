// components/citySelect/citySelect.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchKey: "", // 搜索关键词
    // 热门城市数据
    hotCities: ["全部地区","北京", "上海", "广州", "深圳"],
    // 所有城市（按字母分组，简化示例）
    cityGroups: [
      { letter: "A", cities: ["安庆", "安阳", "鞍山", "阿坝", "阿拉善"] },
      { letter: "B", cities: ["北京", "保定", "包头", "北海", "宝鸡", "滨州", "巴中"] },
      { letter: "C", cities: ["成都", "重庆", "长沙", "长春", "常州", "沧州", "承德", "潮州"] },
      { letter: "D", cities: ["大连", "东莞", "德州", "大理", "大庆", "丹东"] },
      { letter: "F", cities: ["佛山", "福州", "抚顺", "阜阳"] },
      { letter: "G", cities: ["广州", "贵阳", "桂林", "赣州", "广元"] },
      { letter: "H", cities: ["杭州", "哈尔滨", "海口", "合肥", "呼和浩特", "惠州"] },
      { letter: "J", cities: ["济南", "嘉兴", "金华"] },
      { letter: "K", cities: ["昆明", "开封", "克拉玛依"] },
      { letter: "L", cities: ["兰州", "拉萨", "临沂", "洛阳"] },
      { letter: "M", cities: ["绵阳", "茂名", "马鞍山"] },
      { letter: "N", cities: ["南京", "南宁", "宁波", "南昌"] },
      { letter: "P", cities: ["盘锦", "攀枝花"] },
      { letter: "Q", cities: ["青岛", "泉州", "齐齐哈尔"] },
      { letter: "R", cities: ["日照", "日喀则"] },
      { letter: "S", cities: ["上海", "深圳", "沈阳", "石家庄", "苏州"] },
      { letter: "T", cities: ["天津", "太原", "唐山", "泰安"] },
      { letter: "W", cities: ["武汉", "西安", "温州", "无锡"] },
      { letter: "X", cities: ["西安", "厦门", "徐州", "西宁"] },
      { letter: "Y", cities: ["烟台", "扬州", "宜昌", "银川"] },
      { letter: "Z", cities: ["郑州", "珠海", "湛江"] }

    ],
    filteredGroups: [] // 搜索过滤后的城市分组
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 搜索框输入事件：过滤城市（未阅读）
     */
    onInput(e) {
      const searchKey = e.detail.value.trim().toLowerCase();
      this.setData({ searchKey });
         // 未输入关键词：显示全部城市
    if (!searchKey) {
      this.setData({ filteredGroups: this.data.cityGroups });
      return;
    }
    // 输入关键词：过滤包含关键词的城市分组
    const filtered = this.data.cityGroups.map(group => {
      // 过滤当前分组中包含关键词的城市
      const filterCities = group.cities.filter(city => 
        city.toLowerCase().includes(searchKey)
      );
      // 若当前分组有匹配城市，保留分组；否则过滤掉
      return filterCities.length ? { ...group, cities: filterCities } : null;
    }).filter(group => group); // 移除空分组

    this.setData({ filteredGroups: filtered });
    },
 
    /**
     * 选择城市
     */
    selectCity(e) {
      // 1、获取选中的城市（从data-city中取）
      const selectedCity = e.currentTarget.dataset.city;
      //this.setData({ selectedCity }); // 用setData更新，确保数据同步

      this.triggerEvent('select',{value:selectedCity})
    }
    
  },

  lifetimes:{
    attached(){
      this.setData({
        filteredGroups: this.data.cityGroups
      });
    }
  }
})