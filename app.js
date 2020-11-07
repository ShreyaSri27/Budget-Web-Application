var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(curr) {
      sum += curr.value;
    })
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
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

    calculateBudget: function() {
      // 1. Calculate the total income and expenses__list
      calculateTotal('inc');
      calculateTotal('exp');

      // 2. Calculate the total budget__title
      data.budget = data.totals.inc - data.totals.exp;
      //3. Calculate the total percentage of expenditure
      data.percentage = data.totals.inc > 0 ? Math.round((data.totals.exp / data.totals.inc) * 100) : -1;


    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },
    testing: function() {
      console.log(data);
    },
  }
})();

var UIController = (function() {

    var DOMStrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expenseContainer: '.expenses__list',
      budgetLabel: '.budget__value',
      incomeLabel: '.budget__income--value',
      expenseLabel: '.budget__expenses--value',
      percentageLabel: '.budget__expenses--percentage',
    }
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMStrings.inputType).value,
          description: document.querySelector(DOMStrings.inputDescription).value,
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


        // Replace the placeholder text with some actual data

        newhtml = html.replace("%id%", obj.id);
        newhtml = newhtml.replace("%description%", obj.description);
        newhtml = newhtml.replace("%value%", obj.value);


        // Insert the HTML into the DOM

        document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);


      },
      clearFields: function() {
        var fields, fieldsArr;
        fields = document.querySelectorAll(DOMStrings.inputDescription + ", " + DOMStrings.inputValue);
        fieldsArr = Array.prototype.slice.call(fields);
        // console.log(fieldsArr);
        fieldsArr.forEach(function(current, index, array) {
          current.value = "";
        })
        fieldsArr[0].focus();
      },
      displayBudget: function(obj) {
        document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;

        document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;

        document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;

        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage > 0 ? obj.percentage + " %" : '---';
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
  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
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
      updateBudget();
      // 6. Display the budget on the UI
    }
  }

  return {
    init: function() {
      console.log("Application has started");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setUpEventListeners();
    }
  }


})(budgetController, UIController);

controller.init();
