function printMonth() {
  const monthBox = document.getElementById("month");
  if (!monthBox) {
    console.error("ID 'month' 요소를 찾을 수 없습니다.");
    return;
  }

  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  monthBox.innerHTML = "<h2>" + monthNames[currentMonth] + "</h2>";
}

function printfCalendar(y, m) {
  const calendar_box = document.getElementById("calendar");
  if (!calendar_box) {
    console.error("ID 'calendar' 요소를 찾을 수 없습니다.");
    return;
  }
  var date = new Date();
  var nowY = date.getFullYear();
  var nowM = date.getMonth();
  var nowD = date.getDate();

  y = y !== undefined ? y : nowY;
  m = m !== undefined ? m - 1 : nowM;

  var theDate = new Date(y, m, 1);
  var theDay = theDate.getDay();

  // 월요일 시작 기준 보정: 일(0) -> 7, 월(1) -> 1 ... 토(6) -> 6
  var firstDay = theDay === 0 ? 7 : theDay;

  var last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) last[1] = 29;
  var lastDate = last[m];

  // 행 개수 계산 보정
  var row = Math.ceil((firstDay - 1 + lastDate) / 7);

  var calendar = "<table>";
  calendar +=
    "<tr><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th><th>일</th></tr>";

  var dNum = 1;
  for (var i = 1; i <= row; i++) {
    calendar += "<tr>";
    for (var k = 1; k <= 7; k++) {
      if ((i == 1 && k < firstDay) || dNum > lastDate) {
        calendar += "<td> &nbsp; </td>";
      } else {
        if (dNum === nowD && m === nowM && y === nowY) {
          calendar += "<td id='today'>" + dNum + "</td>";
        } else {
          calendar += "<td>" + dNum + "</td>";
        }
        dNum++;
      }
    }
    calendar += "</tr>";
  }
  calendar += "</table>";
  calendar_box.innerHTML = calendar;
}
