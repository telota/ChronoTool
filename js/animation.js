function getDistanceBetweenTwoPoints(coord1lat, coord1lon, coord2lat, coord2lon) {
  if (coord1lat == coord2lat && coord1lon == coord2lon) {
    return 0;
  }

  const radlat1 = (Math.PI * coord1lat) / 180;
  const radlat2 = (Math.PI * coord2lat) / 180;

  const theta = coord1lon - coord2lon;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
	dist = 1;
  }
    
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km
    
    return dist;
}

function getDifferenceTime(date1,date2)
{

    var d2 = new Date(date2);
    var d1 = new Date(date1);
    
    var day =  (d2-d1)/86400000;
    //console.log(date1,date2,day)
    return day
}

var polyline=""
var output = [];
var output_move=[];
var marker=""
var line=""
function RunAnimation(file, maxdist, maxdays) {

    $( "#unitControlId" ).append( "<span style='z-index:12000; position:absolute; with:100px; height:60px;' class='datepickermin' type='text'</span>" );
    if (datum=="slider") {
	inputVal1=$("#slider").dateRangeSlider("min").getFullYear()+"-"+($("#slider").dateRangeSlider("min").getMonth()+1)+"-"+$("#slider").dateRangeSlider("min").getDate()
	inputVal2=$("#slider").dateRangeSlider("max").getFullYear()+"-"+($("#slider").dateRangeSlider("max").getMonth()+1)+"-"+$("#slider").dateRangeSlider("max").getDate()

    }
    
    if (datum=="datepicker") {

	inputVal1=document.getElementById("datepickermin").value;
	inputVal2=document.getElementById("datepickermax").value;
	
    }
  
    if (polyline != "") {
	  map.removeLayer(polyline)
    }

    var precoord=[]
    var latlngs = []
    var currentlat=0
    var currentlon=0
    var currentday=""
    
    $.loadScript('https://d3js.org/d3.v6.min.js', function (){

	if (file==1) {
	    precoord=[]
	    currentlat=52.5
	    currentlon=13
	    currentday=inputVal1
	    $(Frankreich.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		    
		    for (i = 0; i < value.properties.Content.length; i++) {
			if (new Date(value.properties.Content[i].date).setHours(0, 0, 0, 0)==new Date(inputVal1).setHours(0, 0, 0, 0)) {
			    currentlat=value.geometry.coordinates[1]
			    currentlon=value.geometry.coordinates[0]
			}
			
			if (new Date(value.properties.Content[i].date).setHours(0, 0, 0, 0)>=new Date(inputVal1).setHours(0, 0, 0, 0) &&
			    new Date(value.properties.Content[i].date).setHours(0, 0, 0, 0)<=new Date(inputVal2).setHours(0, 0, 0, 0)) {
			    precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.Content[i].date, value.properties.ContentHeader])}}}
	    });
	}
	
	if (file==2) {
	    precoord=[]
	    currentlat=39.469
	    currentlon=-0.3773
	    currentday="1799-05-01"
	
	    $(Spanien_Humboldt.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		    for (i = 0; i < value.properties.Content.length; i++) {
			precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.Content[i].date, value.properties.ContentHeader])}}
	    });
	}
	
	if (file==3) {
	    precoord=[]
	    currentlat=55.012
	    currentlon=20.617
	    currentday="1829-04-18"
	    $(Russland_Ehrenberg.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		    for (i = 0; i < value.properties.Content.length; i++) {
			precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.Content[i].date, value.properties.ContentHeader])}}
	    });
	}
	if (file==4) {
	    precoord=[]
	    currentlat=55.012
	    currentlon=20.617
	    currentday="1829-04-18"
	    $(Russland_Humboldt.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		    for (i = 0; i < value.properties.Content.length; i++) {
			
			precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.Content[i].date, value.properties.ContentHeader])}}
	    });
	}
	
	if (file==5) {
	    precoord=[]
	    currentlat=10.453
	    currentlon=-64.18
	    currentday="1799-07-16"
	    $(Chronologie.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		    for (i = 0; i < value.properties.Content.length; i++) {
			precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.Content[i].date, value.properties.ContentHeader])}}
	    });
	}
	if (file==6) {
	    precoord=[]
	    currentlat=51.932
	    currentlon=1.263
	    currentday="1790-01-05"
	    /*$(England_Humboldt.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		for (i = 0; i < value.properties.Content.length; i++) {
		     precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.Content[i].date, value.properties.ContentHeader])}}
		     });*/
	    $(Chronologie.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		    for (i = 0; i < value.properties.Content.length; i++) {
			precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.Content[i].date, value.properties.ContentHeader])}
	    }
	    });
	    
	}
	if (file==12) {
            alert("Wilsnack")
	    precoord=[]
	    currentlat=52.5
	    currentlon=13.0
	    currentday="2022-05-18"
	    $(Wilsnack.features).each(function(index, value){
	    if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.date, value.properties.ContentHeader])}
	});
	}
	
	if (file==7) {
	    precoord=[]
	    currentlat=50.23056
	    currentlon=12.8725
	    currentday="1786-09-03"
	    $(Italien_Goethe.features).each(function(index, value){
	    if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.date, value.properties.ContentHeader])}
	    });
	    
	};


	if (file==8) {
	    
	    precoord=[]
	    currentlat=51.22
	    currentlon=14.9
	    currentday="1786-05-19"
	    $(Trautgott_1786.features).each(function(index, value){
		if (value.geometry.coordinates[1]!="2" && value.geometry.coordinates[0]!="1") {
		 precoord.push([value.geometry.coordinates[1], value.geometry.coordinates[0],value.properties.date, value.properties.ContentHeader])}
	});
	}	

	console.log("CURR")
	console.log(precoord)
	// Sortiere nach Datum
	
	var temp = [];
	$.each(precoord, function(key, value) {
	    temp.push({k:[value[0],value[1]], v:value[2], p:value[3]});
	});
	
	temp.sort(function(a,b){
	    if(a.v > b.v){ return 1}
	    if(a.v < b.v){ return -1}
	    return 0;
	});

	$.each(temp, function(key, value) {
	    
	    dist=getDistanceBetweenTwoPoints(value.k[0], value.k[1], currentlat, currentlon)
	    days=getDifferenceTime(currentday, value.v)

	    if (days>=0 && days<maxdays) {
		if (dist<(maxdist+(days)*maxdist) && dist>0) {
		    latlngs.push([value.v, dist, [value.k[0], value.k[1]], value.p])
		    currentlat=value.k[0]
		    currentlon=value.k[1]
		    currentday=value.v
		}
		else {
		    currentlat=currentlat
		    currentlon=currentlon
		    currentday=currentday
		}}

	    
	});

	$.map(latlngs, function( arrayVect) {
            output.push(arrayVect[2]);
	    var dates=arrayVect[0].split("-")
	    output_move.push(arrayVect[3]+" am "+dates[2]+"."+dates[1]+"."+dates[0]) 
	    //output_move.push(arrayVect[3]+" am "+arrayVect[0]) 
	});

	
	function addPolyline(files) {
            /*
            L.tileLayer('tile.png', { maxZoom: 18, attribution: '...' }).addTo(map);
            */

	    //var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	    //var osmAttrib='Map data © OpenStreetMap contributors';
	    //L.tileLayer(osmUrl, {minZoom: 0, maxZoom: 6, attribution: osmAttrib}).addTo(map);
	    
            var coordinates = files;
	    var polylineOptions = {
                // The user can add new polylines by clicking anywhere on the map:
                newPolylines: true,
                newPolylineConfirmMessage: 'Add a new polyline here?',
                // Show editable markers only if less than this number are in map bounds:
                maxMarkers: 1200,
		color: "blue"
	    }
	    
            polyline = L.Polyline.PolylineEditor(coordinates, polylineOptions).addTo(map);
	    var decorator = L.polylineDecorator(coordinates, {
		patterns: [
		    {offset: 25, repeat: 150, symbol: L.Symbol.arrowHead({pixelSize: 12, pathOptions: {fillOpacity: 1, weight: 0, color:"blue"}})}
		]
	    }).addTo(map);

            //map.fitounds(polyline.getBounds());
	    
	    return polyline;
        }
	
        polyline = addPolyline(output);
	/* Check that markers are not left after the polyline is removed! */
	marker = null;
	line = L.polyline([]).addTo(map);

    })
    //return output
    
    
}

function resetPolyline() {
    //$("#pointsTextArea").hide()
    map.removeLayer(line);
   
};

function redraw(point, name) {
    if (!marker) {
	marker = L.marker(point).addTo(map)


    }
    
    line.addLatLng(point);
    marker.bindPopup(name).openPopup();
    marker.setLatLng(point);
    
}

function update() {
    
    if (output.length) {
	
	redraw(output.shift(), output_move.shift());
        setTimeout(update, 1200);
    }
}
