import React, { useState } from 'react';
import './customers.css';

var x = 0
var listResult = [];
const customers = () => {
  //#region main
  var [orders, setOrders] = useState([])
  if(x === 0){
    x += 1;
    setTimeout(function(){
      console.log("3 wami")
      setTimeout(function(){
        pls()
        function pls(){
          console.log("1 wami")
          if(orders === ""){
            console.log("orders is empty")
          }
          else{
            console.log("orders "+orders)
            var orders1 = orders.split(':')
            var leng = (orders1.length-1) / 3 
            console.log(leng)
            for(var i=1;i<=leng;i++){
              var j = i*3
              var bookResult = orders1[j].split('"')[1]
              listResult.push(bookResult)
            }
          }
        }
      }, 1000);
      setTimeout(function(){ 
        console.log("2 wami")
        console.log("listResult "+listResult)
        setOrders(["qwe"])
      }, 2000);
    }, 3000);
    setTimeout(function(){
      console.log("1 wami")
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          var ordersUpdate = JSON.stringify(this.response);
          console.log(ordersUpdate)
          orders = ordersUpdate
        }
      };
      xhttp.open("GET", "/books", true);
      xhttp.responseType = "json"
      xhttp.send();
    }, 1000);
  }
  //#endregion
  const add = () =>{
    var x = document.getElementById("emailInput").value;
    var y = document.getElementById("bookInput").value;
    var data = JSON.stringify({
      "email": x,
      "book": y
    });
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("POST", "http://localhost:5000/addBooks");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin');
    
    console.log(data)
    xhr.send(data);
  }
  return (
    <div>
      <h2>Add new books</h2>
      <input id="emailInput" placeholder="enter email"/>
      <input id="bookInput" placeholder="enter book"/>
      <button onClick={add}>Submit</button>
      <h2>Books</h2>
      <ul>
        {
        listResult.map((book,index) => (<li id={index+1} key={index+1}>{book}</li>))
        }
      </ul>
      <footer>cors moxsenit brauzerze rom daamatot axali wignebi</footer>
    </div>
  );
}

export default customers;