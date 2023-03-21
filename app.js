// step 1: create objects
// step 2: write a display function that will take an object
// step 3: invoke the function

var carObject = {
    vehicle: "Car",
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  
    farePerKilo: 3,
    capacity: 4,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
  };

  var bikeObject = {
    vehicle: "Bike",
    imageUrl:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmlrZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
  
    farePerKilo: 2,
  
    capacity: 2,
  
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
  };
  // farePerKilo -> per kilometer cost for hiring the vehicle
  
  var busObject = {
    vehicle: "Bus",
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  
    farePerKilo: 3,
    capacity: 30,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
  };


  const servicesArray=[carObject,bikeObject,busObject];


function displayServices(service){
  // console.log(service)
  const stringifyObj=JSON.stringify(service);
  const main=document.getElementById('main-section');
  const div=document.createElement('div');
  div.innerHTML=`
    <div class="card my-3 mx-auto" style="max-width: 800px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            class="img-fluid rounded-start h-100 "
            src=${service.imageUrl}
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Transport Mood ${service.vehicle}</h5>
            <p class="card-text">
             ${service.description}
            </p>
            <p class="card-text">
              <small class="text-muted">Fare per kilo: ${service.farePerKilo}</small>
              <small class="text-muted">Capacity: ${service.capacity}</small>
            </p>
            <!-- Button trigger modal -->
            <button type="button"  onclick='handleBooking(${stringifyObj})' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  main.appendChild(div)
}
  
// displayServices(carObject);
// displayServices(busObject);
// displayServices(bikeObject);

function displayAllArticles(arr){
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    displayServices(element);
}
}

displayAllArticles(servicesArray)


function handleBooking(obj){
  const stringifyObj=JSON.stringify(obj);
  const modalContainer=document.getElementById('modal-container');
  modalContainer.innerHTML=`
  <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Transport Mood ${obj.vehicle}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
        <div class=" my-3 mx-auto" style="max-width:100%">
            <img class="img-fluid rounded-start h-100 " src=${obj.imageUrl} alt="..."/>
            <p class="mt-3">
            ${obj.description}
            </p>
            <p class="">
            <small class="text-muted">Fare per kilo: ${obj.farePerKilo}</small>
            <small class="text-muted">Capacity: ${obj.capacity}</small>
          </p>
          <p class="">
          Fare:
            <small class="text-muted" id="fare"></small>
          </p>
          <p class="">
          Tax:
            <small class="text-muted" id="tax"></small>
          </p>
          <p class="">
          Total-cost:
            <small class="text-muted" id="total"></small>
          </p>
        </div>

        <div class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="number"
          placeholder="kilo"
          aria-label="Search"
          id='distance-input'
        />
        <input
          class="form-control me-2"
          type="number"
          placeholder="car"
          aria-label="Search"
          id='quantity-input'
        />
        <button class="btn btn-outline-success" type="submit" onclick='calculateCost(${stringifyObj})'>
          Submit
        </button>
      </div>

          </div>
        </div>
  `;
}

function calculateCost(obj){
  // console.log(obj)
  const distance=document.getElementById('distance-input').value;
  const quantity=document.getElementById('quantity-input').value;
  
  
  const fareDiv=document.getElementById('fare');
  fareDiv.innerHTML=quantity*distance*obj.farePerKilo;

  const taxeDiv=document.getElementById('tax');
  taxeDiv.innerHTML=quantity*distance*obj.farePerKilo/10;

  const totalDiv=document.getElementById('total');
  totalDiv.innerHTML=(quantity*distance*obj.farePerKilo/10)+quantity*distance*obj.farePerKilo;
}

document.getElementById('search-btn').addEventListener('click',function(){
  const value=document.getElementById('search-value').value;

  for(let i=0; i<servicesArray.length; i++){
    const element=servicesArray[i];
    if(value.toLowerCase()==element.vehicle.toLowerCase()){
      document.getElementById('main-section').innerHTML='';
      displayServices(element);
      document.getElementById('search-value').value='';
      return;
    }
  }
  alert('nothing found with your input')
})