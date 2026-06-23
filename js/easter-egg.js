/* ============================================================
   easter-egg.js ― 隠しピース（難読化版）
   ----------------------------------------------------------------
   ※静的サイトではクライアントに秘密を完全には隠せない＝これは「難読化」。
     正解の平文は持たず SHA-256 ハッシュのみ保持。
     ピースは順番ラベルではなく乱数キー(data-k)で識別する。
     ※5要素=120通りの総当たり・モーダル直接表示は防げない（承知の上）。
   ============================================================ */
var SECRET = {
  ENABLED: true,
  // 正しいキー列を "|" 連結して SHA-256 した値（平文の正解は置かない）。
  //   生成: printf '%s' "n7q|c2m|f8b|s3d|a9v" | shasum -a 256
  HASH: "b3861b0140388f922bf2e9eb50a3fd5965ec22365a8eef54439021d162ef00d9",
  LEN: 5,
  REVEAL_DELAY: 450,
};

(function pieceHunt() {
  if (!SECRET.ENABLED) return;
  if (!(window.crypto && window.crypto.subtle)) return; // secure context(https/localhost)必須

  var pieces  = Array.prototype.slice.call(document.querySelectorAll(".piece"));
  var tracker = document.getElementById("piece-tracker");
  var secret  = document.getElementById("secret");
  if (!pieces.length) return;

  var seq = [], cleared = false, busy = false;

  function renderTracker() {
    if (!tracker) return;
    tracker.dataset.active = seq.length > 0 ? "true" : "false";
    tracker.innerHTML = "";
    for (var i = 0; i < SECRET.LEN; i++) {
      var s = document.createElement("span"), on = i < seq.length;
      s.textContent = on ? "●" : "・";   // ●/・ 進捗ドットのみ（正解文字は出さない）
      if (on) s.classList.add("on");
      tracker.appendChild(s);
    }
  }

  function sha256Hex(str) {
    return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(str))
      .then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ("0" + b.toString(16)).slice(-2);
        }).join("");
      });
  }

  function resetAll() {
    seq = [];
    pieces.forEach(function (p) { p.classList.remove("found"); });
    renderTracker();
  }

  function reveal() {
    cleared = true;
    if (secret) secret.dataset.open = "true";
  }

  pieces.forEach(function (p) {
    p.addEventListener("click", function () {
      if (cleared || busy) return;            // 完了後・判定中は無視（連打race防止）
      p.classList.add("found");
      seq.push(p.dataset.k || "");
      renderTracker();
      if (seq.length >= SECRET.LEN) {
        busy = true;
        sha256Hex(seq.join("|")).then(function (h) {
          if (h === SECRET.HASH) setTimeout(reveal, SECRET.REVEAL_DELAY);
          else setTimeout(resetAll, 250);
          busy = false;
        });
      }
    });
  });

  renderTracker();
})();
