function printMonth() {
  const monthBox = document.getElementById("month");
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthBox.innerHTML = "<h2>" + monthNames[currentMonth] + "</h2>";
}

function printfCalender(y, m) {
  const calendar_box = document.getElementById("calendar");
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
    "<tr><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th></tr>";

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
