let personsAmount =-1;

function addRow() {
    personsAmount++;
    var container = document.getElementById('container');
    var newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.innerHTML = `<input type="text" class="input-field" id="name_${personsAmount}">
    <input type="number" class="input-field" id="money_${personsAmount}">`;
    container.appendChild(newRow);
  }
  
  document.addEventListener('input', function(event) {
    var target = event.target;
    if (target && target.classList.contains('input-field')) {
      var container = document.getElementById('container');
      var rows = container.getElementsByClassName('row');
      var lastRow = rows[rows.length - 1];
      if (target === lastRow.querySelector('input')) {
        addRow();
      }
    }
  });
  addRow();
  function Calculate()
  {
    let personsArray  = new Map();
    let moneySum =0;
    for(let i =0; i< personsAmount;i++)
    {
        const person = document.getElementById(`name_${i}`).value;
        const money = parseInt(document.getElementById(`money_${i}`).value);
        personsArray.set(person, money);
        moneySum+=money;
    }

    let maximalDif=5+1;
    const avgSum = moneySum/personsAmount;
    const resText = document.getElementById("resultText");
    resText.innerHTML = "";
    //console.log("avgSum", avgSum);
    //console.log("personsArray", personsArray);
    while(maximalDif>5)
    {
        const maxName =getMaxName(personsArray);
        //console.log("max , " + maxName);
        const minName =getMinName(personsArray);
       // console.log("min , " + minName);
        if(personsArray.get(maxName)-personsArray.get(minName)<5)
            maximalDif=5-1;
        else
        {maximalDif= avgSum -personsArray.get(minName);
        personsArray.set(maxName, personsArray.get(maxName)-maximalDif);
        personsArray.set(minName, personsArray.get(minName)+maximalDif);
        console.log(minName, " == ",maximalDif, " ==> ", maxName);
        resText.innerHTML += `<p>${minName} == ${Math.floor(maximalDif)} ==> ${maxName} </p>`;
        }
       // console.log("maximalDif", maximalDif);
    }

  }

  function getMaxName(array)
  {
    let maxMoney = 0;
    let maxName;
    for (var [key, value] of array) {
        if(maxMoney<value){
        maxMoney=value;
        maxName = key;
        }
      }
      return maxName;
    }

    function getMinName(array)
    {
      let minMoney = array.entries().next().value[1];
      let minName= array.entries().next().value[0];
      for (var [key, value] of array) {
          if(minMoney>value)
          {
          minMoney=value;
          minName = key;
          }
        }
        return minName;
      }