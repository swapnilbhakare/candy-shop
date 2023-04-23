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
        `https://crudcrud.com/api/633d35fe743342ac853c70fa94f4f970/CandyStock`,
        candies
      )
      .then((response) => {
        showCandies(response);
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
    .get(`https://crudcrud.com/api/633d35fe743342ac853c70fa94f4f970/CandyStock`)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        canndyList.innerHTML += `
            <li>
            <span> 
            ${response.data[i].candyName} :  ${response.data[i].description} : ${response.data[i].price} : ${response.data[i].quantity}
           </span>
            <span>
                <input type="button"value="BuyOne" class="btn" id="buyone" onclick="buyOne('${response.data[i]._id}','${response.data[i].candyName}','${response.data[i].description}','${response.data[i].price}','${response.data[i].quantity}')"  />
                <input type="button"value="BuyTwo" class="btn"  onclick="buyTwo('${response.data[i]._id}','${response.data[i].candyName}','${response.data[i].description}','${response.data[i].price}','${response.data[i].quantity}')" />
                <input type="button"value="BuyThree" class="btn"  onclick="buyThree('${response.data[i]._id}','${response.data[i].candyName}','${response.data[i].description}','${response.data[i].price}','${response.data[i].quantity}')" />            
            </span>
             </li>

            `;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
const buyOne = async (id, candyName, description, price, quantity) => {
  await axios
    .put(
      `https://crudcrud.com/api/633d35fe743342ac853c70fa94f4f970/CandyStock/${id}`,

      {
        candyName,
        description,
        price,
        quantity: quantity - 1,
      }
    )
    .then((response) => {
      showCandies(response);
    })
    .catch((err) => console.log(err));
};
const buyTwo = async (id, candyName, description, price, quantity) => {
  await axios
    .put(
      `https://crudcrud.com/api/633d35fe743342ac853c70fa94f4f970/CandyStock/${id}`,

      {
        candyName,
        description,
        price,
        quantity: quantity - 2,
      }
    )
    .then((response) => {
      showCandies(response);
    })
    .catch((err) => console.log(err));
};
const buyThree = async (id, candyName, description, price, quantity) => {
  await axios
    .put(
      `https://crudcrud.com/api/633d35fe743342ac853c70fa94f4f970/CandyStock/${id}`,

      {
        candyName,
        description,
        price,
        quantity: quantity - 3,
      }
    )
    .then((response) => {
      showCandies(response);
    })
    .catch((err) => console.log(err));
};
showCandies();
