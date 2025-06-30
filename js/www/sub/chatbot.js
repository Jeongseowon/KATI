// 출처 토글 함수 (전역으로 정의)
function toggleOpen(button) {
  const referenceSection = button.closest('.reference_section');
  const list = referenceSection.querySelector('.reference_list');
  if (list) {
    list.classList.toggle('open');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 좋아요/싫어요 전용 active 토글 (복사 버튼은 제외)
  function setupFeedbackToggle(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
      const targetButtons = container.querySelectorAll(".btn.like, .btn.dislike");

      targetButtons.forEach(button => {
        button.addEventListener("click", () => {
          const isActive = button.classList.contains("active");

          // 모든 like/dislike 버튼에서 active 제거
          targetButtons.forEach(btn => btn.classList.remove("active"));

          // 클릭한 버튼에 기존에 active가 없으면 active 추가
          if (!isActive) {
            button.classList.add("active");
          }
        });
      });
    });
  }

  // 좋아요/싫어요 버튼 토글 세팅 실행
  setupFeedbackToggle(".feedback_btn");
});
