document.addEventListener("DOMContentLoaded", function () {
  var availabilityBtns = document.querySelectorAll(".availability-btn");
  var stayCards = document.querySelectorAll(".stay");

  availabilityBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var currentCard = this.closest(".stay");
      var isActive = currentCard.classList.contains("active");

      stayCards.forEach(function (card) {
        card.classList.remove("active", "fade");
      });

      if (!isActive) {
        currentCard.classList.add("active");
        stayCards.forEach(function (card) {
          if (card !== currentCard) card.classList.add("fade");
        });
      }
    });
  });
});