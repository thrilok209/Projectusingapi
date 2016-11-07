var fromCityName;
var toCityName;
var dateOfJounery;
(function() {
  var busName =[];
  var duration =[];
  var depTime =[];
  var CompName =[];
  var arrTime =[];
  var FullBusName =[];
  var busFare =[];
  var busfeat = [];
  var seatAvi =[];
  var busFrom =[];
  var BusTo=[];

  CountryComparer = {
    gettingIformation: function () {
    },
    fetchAllCountries: function() {
      $('#sumbitDetOfBus').click(function(){
        $('#loader').removeClass('hide');
        $('#fullContent').addClass('hide');
        fromCityName = $('#FromCity').val();
        toCityName = $('#toCity').val();
        dateOfJounery = String($('#dateOfBus input').val());
        dateOfJounery = dateOfJounery.split(" ");
        if(dateOfJounery[1]=="November,"){
          dateOfJounery[1]="11";
        }
        if(dateOfJounery[1]=="December,"){
          dateOfJounery[1]="12";
        }
        if(dateOfJounery[1]=="January,"){
          dateOfJounery[1]="1";
        }
        if(dateOfJounery[1]=="February,"){
          dateOfJounery[1]="2";
        }
        if(dateOfJounery[1]=="March,"){
          dateOfJounery[1]="3";
        }
        if(dateOfJounery[1]=="April,"){
          dateOfJounery[1]="4";
        }
        if(dateOfJounery[1]=="May,"){
          dateOfJounery[1]="5";
        }
        if(dateOfJounery[1]=="June,"){
          dateOfJounery[1]="6";
        }
        if(dateOfJounery[1]=="July,"){
          dateOfJounery[1]="7";
        }
        if(dateOfJounery[1]=="August,"){
          dateOfJounery[1]="8";
        }
        if(dateOfJounery[1]=="September,"){
          dateOfJounery[1]="9";
        }
        if(dateOfJounery[1]=="October,"){
          dateOfJounery[1]="10";
        }
        var temp = dateOfJounery[2];
        dateOfJounery[2]=dateOfJounery[0];
        dateOfJounery[0]=temp
        dateOfJounery=dateOfJounery.join("");
        // var cityName = $('#Cityname').val();
        console.log(dateOfJounery);
        console.log(fromCityName);
        var that = this;
        var urlReq= "http://developer.goibibo.com/api/bus/search/?app_id=11201a52&app_key=7e43676620f2d1a98d7f42c59e1b080a&source="+toCityName+"&destination="+fromCityName+"&dateofdeparture="+dateOfJounery;
        // var urlReq = 'http://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=2fefb549a19a1115cae6f75ba75d652e';
        $.ajax({
          url: urlReq,


          error: function() {
            // document.getElementById("disname").innerHTML="error";
            console.log("error");
          },

          success: function(data) {
            $('#loader').addClass('hide');
            console.log(data);
            if(data.Error == "Invalid Arrival Departure Dates"){
              $('#fullContent').removeClass('hide');
              alert("Enter a vaild date")
              location.reload();
            }
            if(data.data.onwardflights.length == 0){
              $('#fullContent').removeClass('hide');
              alert("Coundn't find Any bus")
              location.reload();
            }
            $('#YOURWISH').removeClass('hide');

            for(i = 0;i<data.data.onwardflights.length;i++){
              busName[i] = data.data.onwardflights[i].BusType;
              duration[i] = data.data.onwardflights[i].duration;
              depTime[i] = data.data.onwardflights[i].DepartureTime;
              busFrom[i] =data.data.onwardflights[i].ServiceName;
              busFare[i] = data.data.onwardflights[i].fare.totalfare;
              busfeat[i] = data.data.onwardflights[i].amenities;
              CompName[i] = data.data.onwardflights[i].TravelsName;
              arrTime[i] = data.data.onwardflights[i].arrdate;
              FullBusName[i] = data.data.onwardflights[i].ugcid;
              seatAvi[i] = data.data.onwardflights[i].RouteSeatTypeDetail.list[0].SeatsAvailable;
              var u = i+1;
              $('#nameforfrom').html(busFrom[0].toUpperCase() );
              var innerHtml = '<tr data-bus="'+(i)+'"><td>'+u+'</td><td><a href="'+(u)+'busname">'+busName[i]+" "+CompName[i]+'</td><td>'+depTime[i]+'</td><td>'+duration[i]+'</td><td>'+"Rs."+busFare[i]+'</td><td id="seatschange">'+seatAvi[i]+'</td></tr>';
              if(seatAvi[i]<=5){
                $("#seatschange").css("color","red");
              }
              if(seatAvi[i]>5){
                $("#seatschange").css("background-color","green");
              }
              $('tbody').append(innerHtml);
              $('#detTable').removeClass('hide');


            }
            //  console.log(busName);

            $('tr').click(function(ev) {
              $('#detTable').addClass('hide');
              ev.preventDefault();
              var countryCode= this.dataset.bus;
              console.log(countryCode);
              var innerHtml = '<h2 id="FULLBUSNAME">'+FullBusName[(countryCode)]+'.</h2><p id="FROMCITY">Route: '+busFrom[countryCode].toUpperCase()+'</p><p id="DURATION">Time duration: '+duration[countryCode]+'</p><p id="DEPTIME">Departure Time: '+depTime[countryCode]+'.(Note: Reach the place 30Min before)</p><p id="ARRTIME">Arrival Time: '+arrTime[countryCode]+'.</p><p id="FARE"> Total Fare: Rs.'+busFare[countryCode]+'</p><p id="FEAT">The Amenity Available: '+busfeat[countryCode]+'</p><p id="BUSNAME">Type Of Bus: '+busName[countryCode]+'.</p><p id="SEAT">Number Of Seats Left Are : '+seatAvi[countryCode]+'.</p>';
              $('#fullDetOfTheBus ').append(innerHtml);
            })
            $('#logoReload').click(function() {
              location.reload();
            });




          },
        });
      });
    },
    searchBus: function(countryCode) {

    },
    init: function () {

      this.fetchAllCountries();
      // this.showMainContent();

    },
    showMainContent: function () {
      $('#loader').addClass('hide');
      $('#fullContent').removeClass('hide');
    },
    dataFetching: function () {
      var busName = data;    }

    };

    $(document).ready(function() {
      CountryComparer.init();
    });

  })();
