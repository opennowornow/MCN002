
// Lightweight helper for picking per-industry topics from window.TOPICS
(function(){
  const MAP = {
    '美妆时尚':'美妆',
    '3C':'3C电商',
    '萌宠':'宠物',
    '电子竞技':'游戏',
    '汽车':'汽车',
    '家居':'家居',
    '家装':'家装',
    '健身':'健身',
    '教育':'教育考证',
    '教育考证':'教育考证',
    '旅行':'旅行',
    '旅游':'旅行',
    '职场':'职场',
    '美妆':'美妆',
    '美食':'美食',
    '服装':'服装'
  };
  function mapIndustry(ipIndustry){
    return MAP[ipIndustry] || null;
  }
  function pickRandom(arr, n){
    const a = Array.from(arr);
    const out = [];
    while(n-- > 0 && a.length){
      out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);
    }
    return out;
  }
  function pickForIP(ip, n=2){
    try{
      if(!Array.isArray(window.TOPICS)) return [];
      const target = mapIndustry(ip.industry);
      const pool = target ? window.TOPICS.filter(t => t.industry === target) : [];
      const base = (pool.length ? pool : window.TOPICS);
      const choices = pickRandom(base, n).map(t => t.title);
      return choices;
    }catch(e){ console.warn('[topics-helper]', e); return []; }
  }
  window.__mapIndustry = mapIndustry;
  window.__pickTopicsForIP = pickForIP;
})();

// Utility: lookup topic object by title
(function(){
  function topicByTitle(title){
    try{
      if(!Array.isArray(window.TOPICS)) return null;
      return window.TOPICS.find(t => t && t.title === title) || null;
    }catch(e){ return null; }
  }
  window.__topicByTitle = topicByTitle;
})();

// Expose industry mapper


// Override tag by title heuristics (runtime)
(function(){
  function inferTagByTitle(title){
    try{
      const t = (title||'').toLowerCase();
      // 法律：案件/案例/判决/回顾/复盘
      if(/[案件|案例|判决|回顾|复盘]/.test(title)) return '案例';
      // 开箱/对比并入测评
      if(/开箱|对比/.test(title)) return '测评';
      // 攻略/探店
      if(/探店|攻略|路线|打卡/.test(title)) return '探店/攻略';
      // vlog
      if(/vlog|日常|记录/.test(title)) return 'vlog';
      // 教程/教学
      if(/教程|教学|指南|手把手|入门|技巧/.test(title)) return '教程';
      // 盘点/榜单
      if(/盘点|榜单|排行|Top/i.test(title)) return '盘点';
      // 挑战
      if(/挑战|PK|对决|速通/.test(title)) return '挑战';
      // 实验/验证
      if(/实验|验证|测试|谣言/.test(title)) return '实验';
      // 采访/街采
      if(/采访|探访|街采|连麦/.test(title)) return '采访';
    }catch(e){}
    return null;
  }
  window.__inferTagByTitle = inferTagByTitle;
})();
