
# 选题库（JS 版）整包说明

本包已将 `topics.js`（window.TOPICS 全局变量）与 `topics-helper.js`（行业映射与随机抽题）接入到游戏：

- `index.html` 自动引入：
  ```html
  <script src="topics.js"></script>
  <script src="topics-helper.js"></script>
  <script src="script.js"></script>
  ```

- `script.js` 在选择“拍视频”时优先从 `window.TOPICS` 中按 **当前IP行业** 抽取 2 个题目：
  ```js
  if(state.flow.chosenType==='video'){
    const picks = (typeof window.__pickTopicsForIP==='function') ? window.__pickTopicsForIP(ip,2) : [];
    const a = (picks && picks[0]) || p.videoHigh[0] || '教程';
    const b = (picks && picks[1]) || p.videoHigh[1] || '测评';
    setCardUI('选择选题', `左：${a} ｜ 右：${b}`, a, b, ip);
    // ...
  }
  ```

- 行业映射（IP 的 `industry` → 选题库的 `industry`）：
  - 美妆时尚 → 美妆
  - 3C → 3C电商
  - 萌宠 → 宠物
  - 电子竞技 → 游戏
  - 汽车 → 汽车
  - 其他未映射的行业将自动回退到原有 `PREF.videoHigh` 的两项（比如“花絮/解读”等），不影响流程。

- 你可以在 `topics.js` 中自由增减题目（结构：`[{industry, title, tag}]`）。

## 本地/上线

- 本包采用 **JS 全局变量** 方式，不依赖 `fetch`，可直接在 GitHub Pages / Netlify 等静态托管环境运行。
- 如需在本地预览，推荐使用任意本地静态服务器（VSCode Live Server / `npx serve` / `python -m http.server`）。

## 常见定制

- 想扩大行业覆盖：在 `topics.js` 添加更多行业与题目；或在 `topics-helper.js` 的映射表中为更多 IP 行业指定对应。
- 想抽 3~4 个选题供左右翻页：把 `__pickTopicsForIP(ip, 2)` 的 `2` 改成所需数量，并调整 UI 逻辑（例如循环两两对决）。
- 想加成/事件：可以按 `tag`（挑战/测评/教程/盘点/采访/探店/改造/vlog/实验/其他）调整粉丝/金币/概率。

如需我继续把 `tag` 加成、一键“2+1跨行业惊喜题”、或“连载系列题（剧情权重）”接进去，告诉我你的偏好即可。
