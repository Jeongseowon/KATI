// 출처 및 연관질의 토글 함수
function toggleOpen(button) {
  const referenceSection = button.closest(".reference_section");
  const list = referenceSection.querySelector(".reference_list");
  const toggleTrigger = referenceSection.querySelector(".toggle_trigger");

  if (!list) return;

  const isOpen = list.classList.contains("open");

  if (isOpen) {
    list.style.height = `${list.scrollHeight}px`;
    requestAnimationFrame(() => {
      list.style.height = "0px";
      list.classList.remove("open");
      toggleTrigger?.classList.remove("open");
    });
  } else {
    list.style.height = "0px";
    list.classList.add("open");
    toggleTrigger?.classList.add("open");

    requestAnimationFrame(() => {
      list.style.height = `${list.scrollHeight}px`;
    });
  }

  list.addEventListener("transitionend", function handleTransitionEnd(event) {
    if (event.propertyName !== "height") return;
    if (list.classList.contains("open")) {
      list.style.height = "auto";
    }
    list.removeEventListener("transitionend", handleTransitionEnd);
  });
}

// 좋아요/싫어요 전용 active 토글 및 dislike 클릭 시 feedback_contents 활성화
function setupFeedbackToggle(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const targetButtons = container.querySelectorAll(".btn.like, .btn.dislike");
    const dislikeBtn = container.querySelector(".btn.dislike");
    const answerContents = container.closest(".answer_contents");
    const feedbackContents = answerContents?.querySelector(".feedback_contents");

    targetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const isActive = button.classList.contains("active");

        targetButtons.forEach((btn) => btn.classList.remove("active"));

        if (!isActive) {
          button.classList.add("active");
        }

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

// 채팅 스크롤 버튼 기능 추가
function setupScrollButton() {
  const chatBox = document.getElementById("chatScroll"); // .chat_content
  const scrollBtn = document.getElementById("scrollBtn"); // .chat_scroll

  if (!chatBox || !scrollBtn) return;

  function checkScroll() {
    const isAtBottom =
      chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 1;

    scrollBtn.style.display = isAtBottom ? "none" : "block";
  }

  scrollBtn.addEventListener("click", () => {
    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: "smooth",
    });
  });

  chatBox.addEventListener("scroll", checkScroll);
  window.addEventListener("load", checkScroll);
}

// 피드백 모달 관련
function setupFeedbackModal() {
  const openBtn = document.getElementById("openFeedbackModalBtn");
  const modal = document.getElementById("feedbackModal");
  const modalContent = document.querySelector(".modal_content");
  const cancelBtn = document.getElementById("cancelModalBtn");
  const submitBtn = document.getElementById("submitModalBtn");
  const stars = modal.querySelectorAll(".star");
  const feedbackMessage = modal.querySelector(".feedback_current");
  let currentRating = 0;

  function openModal() {
    modal.style.display = "flex";
    modalContent.style.display = "block";
    if (feedbackMessage) feedbackMessage.style.display = "none";
  }

  function closeModal() {
    modal.style.display = "none";
    clearRating();
    modal.querySelector("textarea").value = "";
    if (feedbackMessage) feedbackMessage.style.display = "none";
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

  openBtn?.addEventListener("click", openModal);
  cancelBtn?.addEventListener("click", closeModal);

  submitBtn?.addEventListener("click", () => {
    const feedbackText = modal.querySelector("textarea").value.trim();
    if (currentRating === 0) {
      alert("평점을 선택해주세요.");
      return;
    }

    console.log("평점:", currentRating, "피드백 내용:", feedbackText);

    if (feedbackMessage) {
      feedbackMessage.innerHTML = "<p>피드백이 제출되었습니다. 감사합니다!</p>";
      feedbackMessage.style.display = "block";
      modalContent.style.display = "none";

      // 메시지 2초간 보여준 후 모달 닫기
      setTimeout(() => {
        feedbackMessage.style.display = "none";
        closeModal();
      }, 2000);
    } else {
      closeModal();
    }
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
}

// 초기 실행
document.addEventListener("DOMContentLoaded", () => {
  setupFeedbackToggle(".feedback_btn");
  setupFeedbackModal();
  setupScrollButton();
});
