var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    }
  };
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  }
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
      addListItem: function(obj, type) {
        var html, newhtml;
        // create HTML string with placeholder text
        if (type === 'inc') {
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
        } else if (type === 'exp') {
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
        }

        newhtml = html.replace("%inc%", obj.id);
        newhtml = html.replace("%description%", obj.description);
        newhtml = html.replace("%value%", obj.value);



        // Replace the placeholder text with some actual data

        // Insert the HTML into the DOM
      }
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
    var input, newItem;
    // 1. Get the input field data
    input = UICtrl.getInput();
    // 2. Add the Input Field to the Budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  }

  return {
    init: function() {
      console.log("Application has started");
      setUpEventListeners();
    }
  }


})(budgetController, UIController);

controller.init();
