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
      incomeContainer: '.income__list',
      expenseContainer: '.expenses__list',
    }
    return {
      getInput: function() {

        return {
          type: document.querySelector(DOMStrings.inputType).value,
          description: document.querySelector(DOMStrings.intpuDescription).value,
          value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
        }
      },
      addListItem: function(obj, type) {
        var html, newhtml, element;
        // create HTML string with placeholder text
        if (type === 'inc') {
          element = DOMStrings.incomeContainer;
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
        } else if (type === 'exp') {
          element = DOMStrings.expenseContainer;
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
        }

        newhtml = html.replace("%id%", obj.id);
        newhtml = newhtml.replace("%description%", obj.description);
        newhtml = newhtml.replace("%value%", obj.value);



        // Replace the placeholder text with some actual data

        document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);

        // Insert the HTML into the DOM
      },
      clearFields: function() {
        var fields, fieldsArr;
        fields = document.querySelectorAll(DOMStrings.intpuDescription + ", " + DOMStrings.inputValue);
        fieldsArr = Array.prototype.slice.call(fields);
        // console.log(fieldsArr);
        fieldsArr.forEach(function(current, index, array) {
          current.value = "";
        })
        fieldsArr[0].focus();
      },
      getDOMStrings: function() {
        return DOMStrings;
      },
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
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the Input Field to the Budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Bring back the focus on the description, and clear the previously entered fields in the placeholder
      UICtrl.clearFields();
      // 5. Calculate the budget

      // 6. Display the budget on the UI
    }
  }

  return {
    init: function() {
      console.log("Application has started");
      setUpEventListeners();
    }
  }


})(budgetController, UIController);

controller.init();
