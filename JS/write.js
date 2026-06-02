/*  작성한 글을 html, css, js만으로 저장하는 것은 힘듬
    why? - 서버가 필요함
    하지만 현재 서버까지 구상후 구축하기까지 시간 소요가 많으므로
    localstorage를 이용한 저장 로직을 구현할 예정

    + 이후 시간과 sever에 대한 이해도가 높아지만 
    localstorage에 있는 것을 바탕으로 sever로 전환할 예정
    높은 확률로 서버는 node.js와 Typescript로 구축
*/
// 1. DOM 요소가 모두 로드된 후 이벤트 리스너 등록 (안전한 스크립트 실행)
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".btn-save");

  if (saveBtn) {
    saveBtn.addEventListener("click", savePost);
  }
});

// 2. 글 저장 핵심 함수
function savePost() {
  try {
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");

    // 방어적 프로그래밍: HTML 요소 자체가 없는 치명적 에러 방지
    if (!titleInput || !contentInput) {
      throw new Error("입력 요소를 찾을 수 없습니다. HTML 구조를 확인해라.");
    }

    // 좌우 공백 제거(trim)하여 데이터 정제
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // 유효성 검사: 빈 글 작성 차단
    if (!title) {
      alert("제목을 입력해라.");
      titleInput.focus();
      return;
    }
    if (!content) {
      alert("내용을 입력해라.");
      contentInput.focus();
      return;
    }

    // 3. 데이터 구조화 (객체 생성)
    const newPost = {
      id: Date.now(), // 1970년 1월 1일 이후의 밀리초. 중복 방지용 고유키 역할
      title: title,
      content: content,
      date: new Date().toLocaleDateString(), // '2026. 6. 2.' 형태의 문자열
    };

    // 4. 로컬 스토리지 데이터 로드 및 역직렬화
    // 기존에 저장된 'dev_posts' 키값이 없으면 빈 배열([])을 반환
    let posts = JSON.parse(localStorage.getItem("dev_posts")) || [];

    // 5. 새 글을 배열 맨 앞에 추가 (최신 글이 상단에 오도록)
    posts.unshift(newPost);

    // 6. 배열을 다시 문자열로 직렬화하여 저장
    localStorage.setItem("dev_posts", JSON.stringify(posts));

    // 7. UX 처리: 성공 알림 및 페이지 전환
    alert("글이 성공적으로 저장되었다.");

    // 새 탭에서 열렸으므로 창을 닫거나, 메인 페이지로 강제 리다이렉션
    // 브라우저 보안상 스크립트로 열지 않은 창은 window.close()가 안 먹힐 수 있으므로 리다이렉션 권장
    window.location.href = "index.html";
  } catch (error) {
    console.error("포스트 저장 중 시스템 에러:", error.message);
    alert("오류가 발생하여 글을 저장하지 못했다.");
  }
}

function readPosts() {
  try {
    const postListContainer = document.getElementById("post-list");

    // 에러 핸들링: 컨테이너가 없으면 실행 중단
    if (!postListContainer) {
      throw new Error("게시글을 렌더링할 'post-list' 요소를 찾을 수 없다.");
    }

    // 로컬 스토리지에서 데이터 역직렬화
    const posts = JSON.parse(localStorage.getItem("dev_posts")) || [];

    // 작성된 글이 없을 때의 예외 처리
    if (posts.length === 0) {
      postListContainer.innerHTML = "<p>아직 작성된 개발 일지가 없다.</p>";
      return;
    }

    // 배열 데이터를 바탕으로 HTML 구조 생성 (클릭 가능한 카드)
    postListContainer.innerHTML = posts
      .map(
        (post) => `
      <a href="view.html?id=${post.id}" class="post-link">
        <article class="post-card card">
          <div class="post-info">
            <h3>${post.title}</h3>
            <p class="post-snippet">${post.content}</p>
            <span class="post-date">${post.date}</span>
          </div>
        </article>
      </a>
    `,
      )
      .join("");
  } catch (error) {
    console.error("글 목록 렌더링 중 에러 발생:", error.message);
  }
}

// 메인 페이지가 로드될 때 자동으로 작성된 글 목록을 불러오도록 설정
document.addEventListener("DOMContentLoaded", () => {
  readPosts();
});
