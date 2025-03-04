(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  // Target date: March 23, 2025 at 00:00
  const targetDate = new Date("2025-03-23T00:00:00").getTime();

  const x = setInterval(function () {
    const now = new Date().getTime(),
      distance = targetDate - now;

    document.getElementById("days").innerText = Math.floor(distance / day);
    document.getElementById("hours").innerText = Math.floor(
      (distance % day) / hour
    );
    document.getElementById("minutes").innerText = Math.floor(
      (distance % hour) / minute
    );
    document.getElementById("seconds").innerText = Math.floor(
      (distance % minute) / second
    );

    // When date is reached
    if (distance < 0) {
      document.getElementById("headline").innerText = "end day";
      document.getElementById("countdown").style.display = "none";
      document.getElementById("content").style.display = "block";
      clearInterval(x);
    }
  }, 1000);
})();
