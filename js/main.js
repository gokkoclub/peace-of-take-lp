/* ============================================================
   main.js  ―  挙動（ロジック）だけを担当
   デザインには関与しません。ChatGPTは基本ここを触らなくてOK。
   ============================================================ */

/* --- 開催までのカウントダウン -------------------------------- */
(function countdown() {
  var el = document.getElementById("countdown");
  if (!el) return;

  // 開催日時：2026-07-05 11:00（第一部開始）日本時間
  var target = new Date("2026-07-05T11:00:00+09:00").getTime();

  var units = [
    { key: "days",  label: "DAYS"  },
    { key: "hours", label: "HOURS" },
    { key: "mins",  label: "MIN"   },
    { key: "secs",  label: "SEC"   },
  ];

  function render() {
    var diff = target - Date.now();

    if (diff <= 0) {
      el.innerHTML = '<div class="countdown__unit"><div class="countdown__num">開催中</div></div>';
      clearInterval(timer);
      return;
    }

    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var vals = { days: d, hours: h, mins: m, secs: s };

    el.innerHTML = units.map(function (u) {
      var n = String(vals[u.key]).padStart(2, "0");
      return '<div class="countdown__unit">' +
             '<div class="countdown__num">' + n + '</div>' +
             '<div class="countdown__label">' + u.label + '</div>' +
             '</div>';
    }).join("");
  }

  render();
  var timer = setInterval(render, 1000);
})();
