// view_script.js

document.addEventListener("DOMContentLoaded", () => {
  renderViewPost();
});

function renderViewPost() {
  try {
    // 1. 현재 브라우저의 URL에서 쿼리 스트링 파싱
    // window.location.search는 "?id=12345678" 형태를 가져온다.
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id"); // "12345678" 숫자만 추출 (자료형은 문자열)

    // 에러 핸들링: id 파라미터가 아예 없는 비정상적인 접근 차단
    if (!postId) {
      throw new Error("잘못된 접근이다. 게시글 ID가 없습니다.");
    }

    // 2. 로컬 스토리지에서 전체 데이터 불러오기
    const posts = JSON.parse(localStorage.getItem("dev_posts")) || [];

    // 3. 배열에서 특정 ID를 가진 글 하나만 찾기 (Find 메서드)
    // 주의: postId는 문자열(String)이고, post.id는 숫자(Number)이므로 형변환 후 비교해야 한다.
    const post = posts.find((p) => p.id.toString() === postId);

    // 에러 핸들링: 삭제되었거나 없는 글일 경우
    if (!post) {
      throw new Error("존재하지 않거나 삭제된 게시글이다.");
    }

    // 4. 찾은 데이터를 HTML 요소에 매핑하여 렌더링
    document.getElementById("view-title").innerText = post.title;
    document.getElementById("view-date").innerText = post.date;

    // 내용의 줄바꿈(\n)을 HTML의 <br> 태그로 변환해서 렌더링해야 단락이 유지된다.
    document.getElementById("view-content").innerHTML = post.content.replace(
      /\n/g,
      "<br>",
    );
  } catch (error) {
    console.error("게시글 로딩 에러:", error.message);
    alert(error.message);
    // 에러가 났으므로 목록 페이지로 강제로 돌려보낸다.
    window.location.href = "index.html";
  }
}
