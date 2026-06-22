/* ============================================================
   easter-egg.js  ―  隠しピース「日常で忘れがちな小さな愛」
   ----------------------------------------------------------------
   仕掛け（株式会社GOKKOのブランドパーパスを“気づく人だけ”に）:
     ・サイト各所に 5 つのピース（日常 / で / 忘れがちな / 小さな / 愛）を
       地の文に紛れ込ませてある（index.html の <span class="piece">）。
     ・これを「正しい順番」にクリックすると、ひとつずつ色が変わる。
     ・全部そろうと「日常で忘れがちな小さな愛」が完成し、
       ごほうびモーダル（🎁 ドリンク1本プレゼント／会場スタッフに画面提示）を表示する。
       ※提供物はソフトドリンクのみ(2026-06に酒類販売は中止)。旧仕様「1杯無料/QR」は廃止。
     ・見た目は普通の文字のまま（あえてヒントを出さない）。
       ブランドパーパスの言葉に気づいた人だけがたどり着ける設計。

   ★ 調整ポイントはこの CONFIG だけ。仕掛け不要なら ENABLED=false に。
   ============================================================ */

var SECRET = {
  ENABLED: true,
  // 正しいクリック順（index.html の data-order と対応）
  ORDER: ["日常", "で", "忘れがちな", "小さな", "愛"],
  // クリア演出からQR表示までのディレイ(ms)
  REVEAL_DELAY: 450,
};

(function pieceHunt() {
  if (!SECRET.ENABLED) return;

  var pieces  = Array.prototype.slice.call(document.querySelectorAll(".piece"));
  var tracker = document.getElementById("piece-tracker");
  var secret  = document.getElementById("secret");
  if (!pieces.length) return;

  var expected = 0;     // 次に押されるべき data-order
  var cleared  = false;

  // --- トラッカーの中身を生成（最初は全部「・」） ---
  if (tracker) {
    SECRET.ORDER.forEach(function (ch) {
      var s = document.createElement("span");
      s.dataset.char = ch;
      s.textContent = "・";
      tracker.appendChild(s);
    });
  }

  function updateTracker() {
    if (!tracker) return;
    tracker.dataset.active = expected > 0 ? "true" : "false";
    var dots = tracker.querySelectorAll("span");
    Array.prototype.forEach.call(dots, function (d, i) {
      var on = i < expected;
      d.classList.toggle("on", on);
      d.textContent = on ? d.dataset.char : "・";
    });
  }

  function resetAll() {
    expected = 0;
    pieces.forEach(function (p) { p.classList.remove("found"); });
    updateTracker();
  }

  function reveal() {
    cleared = true;
    if (secret) secret.dataset.open = "true";
  }

  pieces.forEach(function (p) {
    p.addEventListener("click", function () {
      if (cleared) return;
      var order = parseInt(p.dataset.order, 10);

      if (order === expected) {
        // 正しい順番 → 点灯して次へ
        p.classList.add("found");
        expected++;
        updateTracker();
        if (expected >= SECRET.ORDER.length) {
          setTimeout(reveal, SECRET.REVEAL_DELAY);
        }
      } else {
        // 順番ミス → やさしくリセット（最初のピースなら再スタート扱い）
        resetAll();
        if (order === 0) {
          p.classList.add("found");
          expected = 1;
          updateTracker();
        }
      }
    });
  });

  // コンソールにそっとヒント（F12で気づく人向け）
  try {
    console.log("%c日常で忘れがちな小さな愛 ―― ピースは、順番に。",
                "color:#e7b94c;font-size:13px");
  } catch (e) {}
})();
