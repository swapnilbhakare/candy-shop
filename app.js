document.getElementById("myForm").addEventListener("submit", addCandy);

function addCandy(e) {
  e.preventDefault();
  const candyName = e.target.candyname.value;
  const description = e.target.description.value;
  const price = e.target.price.value;
  const quantity = e.target.Quantity.value;
  if (
    candyName !== "" &&
    description !== "" &&
    price !== "" &&
    quantity !== ""
  ) {
    let candies = {
      candyName,
      description,
      price,
      quantity,
    };
    // console.log(candies);
    axios
      .post(
        `https://crudcrud.com/api/ef351ecf0e654e4b997fe03b5e7d8851/CandyStock`,
        candies
      )
      .then((response) => {
        console.log(response.data);
        showCandies();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.getElementById("myForm").reset();
  }
}
function showCandies() {
  const canndyList = document.getElementById("candyStockList");
  canndyList.innerHTML = "";
  axios
    .get(`https://crudcrud.com/api/ef351ecf0e654e4b997fe03b5e7d8851/CandyStock`)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        canndyList.innerHTML += `
            <li>
            ${response.data[i].candyName} : ${response.data[i].description} : ${
          response.data[i].price
        } : ${response.data[i].quantity}
           
<input type="button"value="BuyOne" id="buyone" onclick=" candyCount(${
          response.data[i].quantity - 1
        } )"  />
<input type="button"value="BuyOne" onclick="candyCount('${
          response.data[i]._id
        }', ${response.data[i].quantity - 2} )"  />
<input type="button"value="BuyOne" onclick="candyCount('${
          response.data[i]._id
        }', ${response.data[i].quantity - 3} )"  />
      
             </li>

            `;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function candyCount(_id, quantity) {
  //   let temp = quantity - 1;

  //   console.log(data.quantity);
  axios
    .put(
      `https://crudcrud.com/api/ef351ecf0e654e4b997fe03b5e7d8851/CandyStock/${_id}`,
      quantity
    )
    .then((response) => {
      console.log(response.data);

      showUsers();
    });
}

showCandies();
