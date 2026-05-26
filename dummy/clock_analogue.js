const clock_container = document.getElementById("clock_container");

// 시간 표시 라인
for (let i = 0; i < 30; i++) {
  const gradation = document.createElement("div");
  gradation.classList.add("line");
  gradation.style.transform = `rotate(${6 * i}deg)`;
  if (i % 5) {
    gradation.classList.add("thin");
  } else {
    gradation.classList.add("thick");
  }
  clock_container.appendChild(gradation);
}

// 로마자 시간 표시
const rome_number = [
  "Ⅰ",
  "Ⅱ",
  "Ⅲ",
  "Ⅳ",
  "Ⅴ",
  "Ⅵ",
  "Ⅶ",
  "Ⅷ",
  "Ⅸ",
  "Ⅹ",
  "Ⅺ",
  "Ⅻ",
];
for (let j = 0; j < 6; j++) {
  const number_div = document.createElement("div");
  number_div.style.transform = `rotate(${30 * j + 120}deg)`;
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  span1.innerText = rome_number[j];
  span2.innerText = rome_number[6 + j];
  span1.style.transform = `rotate(${-(30 * j + 120)}deg)`;
  span2.style.transform = `rotate(${-(30 * j + 120)}deg)`;
  number_div.appendChild(span1);
  number_div.appendChild(span2);
  number_div.classList.add("num-div");
  number_div.classList.add("font1");
  clock_container.appendChild(number_div);
}
