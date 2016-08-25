var backendService = 'http://micrositios.chailate.com/pop-backend/demo-bcasa-backend/';
//var backendService = 'http://localhost:8888/pop/inmobiliaria-backend/';

var controllers=angular.module('controllers',['google-maps']);

controllers.controller("mapa_controller", ["$scope","$http" , function($scope, $http)
  { 
      navigator.geolocation.getCurrentPosition(function(position)
      {
            $scope.position = position; 
             $scope.latitud = $scope.position.coords.latitude;
             $scope.longitud = $scope.position.coords.longitude;
       
         $scope.url= backendService + "mapacontroller.php";
         $http.post($scope.url, {"latitud":$scope.latitud,"longitud": $scope.longitud}).
           success(function(data, status) 
            { 
             
               $scope.casas= data;
               $scope.status = status; 
            })
      $scope.url= backendService + "filtercontroller.php";
      $scope.municipio = function(event)
        {
          event.preventDefault();
          $scope.filtro="municipios";
          $scope.val = $(event.currentTarget).attr("value");
          $http.post($scope.url, {"id":$scope.val, "filtro":$scope.filtro}).
          success(function(data, status) 
            {
                $scope.message = "";
                $scope.casas = data;
                if (data == "") {
                  $scope.message = "No se encontraron resultados";
                }
                $scope.status = status; 
            })
        }; 
        $scope.habitaciones = function(event)
        {
          event.preventDefault();
          $scope.filtro="habitaciones";
          $scope.val = $(event.currentTarget).attr("value");
          $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
          success(function(data, status) 
            {   
                $scope.message = "";
                $scope.casas = data;
                if (data == "") {
                  $scope.message = "No se encontraron resultados";
                }
                $scope.status = status; 
            })
        };
        $scope.banios = function(event)
        {
          event.preventDefault();
          $scope.filtro="banios";
          $scope.val = $(event.currentTarget).attr("value");
          $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
          success(function(data, status) 
            {   
                $scope.message = "";
                $scope.casas = data;
                if (data == "") {
                  $scope.message = "No se encontraron resultados";
                }
                $scope.status = status; 
            })
        };
       $scope.extension = function(event)
        {
          event.preventDefault();
          $scope.filtro="terreno";
          $scope.val = $(event.currentTarget).attr("value");
          $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
          success(function(data, status) 
            {   
                $scope.message = "";
                $scope.casas = data;
                if (data == "") {
                  $scope.message = "No se encontraron resultados";
                }
                $scope.status = status; 
            })
        };
      $scope.precios = function(event)
        {
          event.preventDefault();
          $scope.filtro="precio";
          $scope.val = $(event.currentTarget).attr("value");
          $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
          success(function(data, status) 
            {   
                $scope.message = "";
                $scope.casas = data;
                if (data == "") {
                  $scope.message = "No se encontraron resultados";
                }
                $scope.status = status; 
            })
        };

      });

  }]);
controllers.controller("index_controller", ["$scope","$http" , function($scope, $http)
  {    
  	$scope.url= backendService + 'indexcontroller.php';
      $http.post($scope.url, {}).
       success(function(data, status) 
          {	
          	for (var i = 0; i < data.length; i++) {
          		var sub = data[i].direccion;
            		 data[i].sub = sub.substring(0,23);

            }
            $scope.ultimos= data;
            $scope.status = status; 
            
          })

    navigator.geolocation.getCurrentPosition(function(position)
      {
          
            $scope.position = position; //Obtenemos info de la localizaicon
             $scope.latitud = $scope.position.coords.latitude;
             $scope.longitud = $scope.position.coords.longitude;
       
         $scope.url= backendService + "mapacontroller.php";
         $http.post($scope.url, {"latitud":$scope.latitud,"longitud": $scope.longitud}).
           success(function(data, status) 
            { 

              $scope.num= data.length;
      
                if($scope.num == undefined){
                  $scope.mensajeCe = "No se encontró ningun inmueble cerca de ti!!!";
                }
                else if($scope.num == 1){
                   $scope.mensajeCe = "Se encontró un inmueble cerca de ti!!!";
                }
                else if($scope.num > 1){
                   $scope.mensajeCe = "Se encontraron "+$scope.num+" inmuebles cerca de ti!!!";
                }
                setTimeout(function(){ 
                    $(".mensaje").removeClass("hide");
                    $(".mensaje").addClass("animated fadeInRightBig");
                 }, 1300);
               
          })

         
      });
  }]);
controllers.controller("single_controller",["$scope","$http","$routeParams", function($scope,$http,$routeParams){

  $scope.idCasa = $routeParams.idCasa;
  $scope.url= backendService + "singlecontroller.php";
    $http.post($scope.url, {"id":$scope.idCasa}).
     success(function(data, status) 
        { 
          $scope.casa = data;
          $scope.status = status; 
          $scope.lat= parseFloat($scope.casa[0].latitud);
          $scope.lon= parseFloat($scope.casa[0].longitud);
      
          $scope.map = {
          center: {
            latitude: $scope.lat, 
            longitude: $scope.lon
          }, 
            zoom: 13,
            options : {
              scrollwheel: false
            },
            control: {}
          };
          $scope.marker = {
            id: 0,
            coords: {
              latitude: $scope.lat,
              longitude: $scope.lon
            },
            options: {
              draggable: true
            }
          };
      
            
          
     })

}]);
controllers.controller("filter_controller",["$scope","$http","$routeParams", function($scope,$http,$routeParams){

  $scope.idM = $routeParams.idMunicipio;
    $scope.filtro="municipios";
    $scope.url= backendService + "filtercontroller.php";
    $http.post($scope.url, {"id":$scope.idM, "filtro":$scope.filtro}).
     success(function(data, status) 
        { 
          $scope.casas = data;
          $scope.status = status; 
        })
    $scope.municipio = function(event)
      {
        event.preventDefault();
        $scope.filtro="municipios";
        $scope.val = $(event.currentTarget).attr("value");
        $scope.idM= $scope.val;
        $http.post($scope.url, {"id":$scope.val, "filtro":$scope.filtro}).
        success(function(data, status) 
          {
              $scope.message = "";
              $scope.casas = data;
              if (data == "") {
                $scope.message = "No se encontraron resultados";
              }
              $scope.status = status; 
          })
      }; 
      $scope.habitaciones = function(event)
      {
        event.preventDefault();
        $scope.filtro="habitaciones";
        $scope.val = $(event.currentTarget).attr("value");
        $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
        success(function(data, status) 
          {   
              $scope.message = "";
              $scope.casas = data;
              if (data == "") {
                $scope.message = "No se encontraron resultados";
              }
              $scope.status = status; 
          })
      };
      $scope.banios = function(event)
      {
        event.preventDefault();
        $scope.filtro="banios";
        $scope.val = $(event.currentTarget).attr("value");
        $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
        success(function(data, status) 
          {   
              $scope.message = "";
              $scope.casas = data;
              if (data == "") {
                $scope.message = "No se encontraron resultados";
              }
              $scope.status = status; 
          })
      };
     $scope.extension = function(event)
      {
        event.preventDefault();
        $scope.filtro="terreno";
        $scope.val = $(event.currentTarget).attr("value");
        $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
        success(function(data, status) 
          {   
              $scope.message = "";
              $scope.casas = data;
              if (data == "") {
                $scope.message = "No se encontraron resultados";
              }
              $scope.status = status; 
          })
      };
    $scope.precios = function(event)
      {
        event.preventDefault();
        $scope.filtro="precio";
        $scope.val = $(event.currentTarget).attr("value");
        $http.post($scope.url, {"num":$scope.val, "filtro":$scope.filtro}).
        success(function(data, status) 
          {   
              $scope.message = "";
              $scope.casas = data;
              if (data == "") {
                $scope.message = "No se encontraron resultados";
              }
              $scope.status = status; 
          })
      };
}]);

