var budgetController = (function() {

})();

var UIController = (function() {

    var DOMStrings = {
      inputType: '.add__type',
      intpuDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
    }
    return {
      getInput: function() {

        return {
          type: document.querySelector(DOMStrings.inputType).value,
          description: document.querySelector(DOMStrings.intpuDescription).value,
          value: document.querySelector(DOMStrings.inputValue).value,
        }
      },
      getDOMStrings: function() {
        return DOMStrings;
      }
    }
  })
  ();

var controller = (function(budgetCtrl, UICtrl) {

  function setUpEventListeners() {
    var DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode == 13 || event.which == 13)
        ctrlAddItem();
    })
  }


  function ctrlAddItem() {
    // 1. Get the input field data
    // 2. Add the Input Field to the Budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
    console.log(UICtrl.getInput());
  }

  return {
    init: function() {
      console.log("Application has started");
      setUpEventListeners();
    }
  }


})(budgetController, UIController);

controller.init();