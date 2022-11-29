var theMarker;
var theCircle;
var geojsonLayer;
var complete;
var long1=""
var lat1=""
function onMapClick(coords) {
                
		console.log(coords);
		var thecoords = coords.toString().split(',');
		var lat = thecoords[1];
		var lng = thecoords[0];
		//if prior marker exists, remove it.
		if (clickmark != undefined) {
		  map.removeLayer(clickmark);
		};
  
		 clickmark = L.circleMarker([lat,lng],{
			radius: 8,
			//opacity: 1,
			color: "yellow",
			fillColor:  "yellow",
			fillOpacity: 0.8}
		 ).addTo(map);
	}
// end of code for click marker.

var dist=0
function ProcessClick(lat,lon,dist){
    $('.sidebar').show()
    $('#btradius').show()
    vars='false'
    $('.sidenav_allinformation').css({'width':'500px', 'opacity':'1'});
    console.log("You clicked the map at LAT: "+ lat+" and LONG: "+lon );
	
		//Clear existing marker, circle, and selected points if selecting new points
		if (theCircle != undefined) {
		  map.removeLayer(theCircle);
		};
		if (theMarker != undefined) {
		    map.removeLayer(theMarker);
		};
		if (geojsonLayer != undefined) {
		    map.removeLayer(geojsonLayer);
		};
		
	//Add a marker to show where you clicked.
        theMarker = L.marker([lat,lon]).addTo(map);  
    SelectPoints(lat,lon, dist);
};

var selPts = [];
function SelectPoints(lat,lon,dist){
    if (dist==0) {
	dist = document.getElementById("miles").value;
    }
	xy = [lat,lon];  //center point of circle
	
	var theRadius = parseInt(dist) * 1000.00  //1609.34 meters in a mile 
	//dist is a string so it's convered to an Interger.
	
	selPts.length =0;  //Reset the array if selecting new points
	
	Overalls.eachLayer(function (layer) {
	    // Lat, long of current point as it loops through.
	    layer_lat_long = layer.getLatLng();
		
	    // Distance from our circle marker To current point in meters
	    distance_from_centerPoint = layer_lat_long.distanceTo(xy);
	    
	    // See if meters is within radius, add the to array
	    if (distance_from_centerPoint <= theRadius) {
		selPts.push(layer.feature);  
	    }
	});
    
	// draw circle to see the selection area
	theCircle = L.circle(xy, theRadius , {   /// Number is in Meters
	  color: 'orange',
	  fillOpacity: 0,
	  opacity: 1
	}).addTo(map);
	
	//Symbolize the Selected Points
		 geojsonLayer = L.geoJson(selPts, {
		 
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng, {
				radius: 5, //expressed in pixels circle size
				color: "green", 
				stroke: true,
				weight: 2,		//outline width  increased width to look like a filled circle.
				fillOpcaity: 0
				});
			},
       
		     onEachFeature: function (feature, layer) {
			 layer.on('dblclick', function (e) {
			     var popupContent = "<div style='overflow-wrap: break-word;'><h5>Ort: "+feature.properties.name + "<h5/><h6></br>Longitude: "+feature.properties.longitude+"<br/>Latitude: "+feature.properties.latitude+"<br/>Geoname ID: "+feature.properties.geoname_id+"</br>alternative  Namen: "+feature.properties.alternate_names+"</h6></div>" ;
			     layer.bindPopup(popupContent);
			    
			 })
		     }
		 }).addTo(map);

    //Add selected points back into map as green circles.
    //map.addLayer(geojsonLayer);
    
    //Take array of features and make a GeoJSON feature collection 
    var GeoJS = { type: "FeatureCollection",  features: selPts};
    
    //Show number of selected features.
    console.log(GeoJS.features.length +" Selected features");
    
    // show selected GEOJSON data in console
    console.log(JSON.stringify(GeoJS));
    //add 2 sidenav
    var geonamefinder=[]
    console.log("GeoJS")
    console.log(GeoJS.features)

    GeoJS.features.sort(function (a, b) {
	     var aSize = a.properties.name;
	     var bSize = b.properties.name;
	     {
		 return (aSize < bSize) ? -1 : 1;
	     }
	 });
    
    
    
    $(GeoJS.features).each(function(index, value){
	
	geonamefinder += '<h6 style="cursor:pointer;" onclick=" long1='+value.properties.longitude+'; lat1='+value.properties.latitude+'; JumpToCity();">'+value.properties.name+' (geoname id: '+value.properties.geoname_id+')</h6>'+'<h6 id="metainformation'+index+'" style="font-size:11px;">name: '+value.properties.name+'<br/>geoname id: https://www.geonames.org/'+value.properties.geoname_id+'<br/>alternative namen: '+value.properties.alternate_names+' <br/> Koordinaten <br/> longitude: '+value.properties.longitude+' <br/>latitude: '+value.properties.latitude+'</h6>'
    });

    $("#mySidenav_allinformation").empty()
    $('#mySidenav_allinformation').css('width','470px')
    $("#mySidenav_allinformation").append(geonamefinder);
    
};	//end of SelectPoints function

let markergeo=""
function JumpToCity() {
    if (markergeo != "") {
	map.removeLayer(markergeo)
    }
    markergeo=L.circleMarker([lat1, long1]).addTo(map);
    map.removeLayer(geojsonLayer);
    map.addLayer(geojsonLayer);
}
