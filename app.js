// 註冊 Service Worker 達成離線可用
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

const statusDiv = document.getElementById('status');
const startBtn = document.getElementById('start-btn');

function speak(text) {
  return new Promise((resolve) => {
    statusDiv.textContent = text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.85; // 稍微放慢，營造沈浸感
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

startBtn.addEventListener('click', async () => {
  // 取得勾選狀態
  const merlin = document.getElementById('merlin').checked;
  const percival = document.getElementById('percival').checked;
  const morgana = document.getElementById('morgana').checked;
  const mordred = document.getElementById('mordred').checked;
  const oberon = document.getElementById('oberon').checked;

  startBtn.disabled = true;

  // 1. 天黑閉眼
  await speak("天黑請閉眼。請所有玩家雙手握拳，放在桌面上。");
  await wait(3000);

  // 2. 壞人互認
  let evilText = oberon ? "除了奧伯倫以外的邪惡陣營玩家" : "邪惡陣營玩家";
  await speak(`${evilText}，請睜開眼睛，互相確認同伴。`);
  await wait(5000);
  await speak("邪惡陣營玩家，請閉上眼睛。");
  await wait(3000);

  // 3. 梅林辨認壞人
  if (merlin) {
    let merlinTarget = mordred ? "除了莫德雷德以外的邪惡陣營玩家" : "邪惡陣營玩家";
    await speak(`${merlinTarget}，請豎起大拇指，讓梅林辨認。`);
    await wait(2000);
    await speak("梅林，請睜開眼睛。");
    await wait(4000);
    await speak("梅林請閉上眼睛，邪惡陣營玩家請放下大拇指。");
    await wait(3000);
  }

  // 4. 派西維爾看梅林與莫甘娜
  if (percival) {
    let target = morgana ? "梅林與莫甘娜" : "梅林";
    await speak(`${target}，請豎起大拇指。`);
    await wait(2000);
    await speak("派西維爾，請睜開眼睛。");
    await wait(4000);
    await speak(`派西維爾請閉上眼睛，${target}請放下大拇指。`);
    await wait(3000);
  }

  // 5. 天亮
  await speak("天亮了，所有人請睜開眼睛！");
  statusDiv.textContent = "流程已結束";
  startBtn.disabled = false;
});
