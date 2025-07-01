// 출처 및 연관질의 토글 함수
function toggleOpen(button) {
  const referenceSection = button.closest(".reference_section");
  const list = referenceSection.querySelector(".reference_list");
  const toggleTrigger = referenceSection.querySelector(".toggle_trigger");

  if (!list) return;

  const isOpen = list.classList.contains("open");

  if (isOpen) {
    // 닫기
    list.style.height = `${list.scrollHeight}px`;
    requestAnimationFrame(() => {
      list.style.height = "0px";
      list.classList.remove("open");
      toggleTrigger?.classList.remove("open");
    });
  } else {
    // 열기
    list.style.height = "0px";
    list.classList.add("open");
    toggleTrigger?.classList.add("open");

    requestAnimationFrame(() => {
      list.style.height = `${list.scrollHeight}px`;
    });
  }

  // transitionend에서 height auto 복구 (height 프로퍼티만 체크)
  list.addEventListener("transitionend", function handleTransitionEnd(event) {
    if (event.propertyName !== "height") return;
    if (list.classList.contains("open")) {
      list.style.height = "auto";
    }
    list.removeEventListener("transitionend", handleTransitionEnd);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFeedbackToggle(".feedback_btn");
});

// 좋아요/싫어요 전용 active 토글 및 dislike 클릭 시 feedback_contents 활성화
function setupFeedbackToggle(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const targetButtons = container.querySelectorAll(".btn.like, .btn.dislike");
    const dislikeBtn = container.querySelector(".btn.dislike");
    // feedback_contents는 .answer_contents 내부에 있다고 가정
    const answerContents = container.closest(".answer_contents");
    const feedbackContents = answerContents?.querySelector(".feedback_contents");

    targetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const isActive = button.classList.contains("active");

        // 모든 like/dislike 버튼에서 active 제거
        targetButtons.forEach((btn) => btn.classList.remove("active"));

        // 클릭한 버튼에 active 추가 (토글 효과)
        if (!isActive) {
          button.classList.add("active");
        }

        // dislike가 active면 feedback_contents에 active 추가, 아니면 제거
        if (dislikeBtn && feedbackContents) {
          if (dislikeBtn.classList.contains("active")) {
            feedbackContents.classList.add("active");
          } else {
            feedbackContents.classList.remove("active");
          }
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openFeedbackModalBtn");
  const modal = document.getElementById("feedbackModal");
  const cancelBtn = document.getElementById("cancelModalBtn");
  const submitBtn = document.getElementById("submitModalBtn");
  const stars = modal.querySelectorAll(".star");
  let currentRating = 0;

  function openModal() {
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
    clearRating();
    modal.querySelector("textarea").value = "";
  }

  function setRating(rating) {
    currentRating = rating;
    stars.forEach((star) => {
      star.classList.toggle("filled", Number(star.dataset.value) <= rating);
    });
  }

  function clearRating() {
    currentRating = 0;
    stars.forEach((star) => star.classList.remove("filled"));
  }

  openBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);

  submitBtn.addEventListener("click", () => {
    const feedbackText = modal.querySelector("textarea").value.trim();
    if (currentRating === 0) {
      alert("평점을 선택해주세요.");
      return;
    }
    // 여기서 서버 제출, 또는 처리 로직 넣기
    console.log("평점:", currentRating, "피드백 내용:", feedbackText);

    alert("피드백이 제출되었습니다. 감사합니다!");
    closeModal();
  });

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      setRating(Number(star.dataset.value));
    });
    star.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setRating(Number(star.dataset.value));
      }
    });
  });

  // 모달 외부 클릭 시 닫기
  modal.querySelector(".modal_overlay").addEventListener("click", closeModal);
});
