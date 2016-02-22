function getStats(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://arsnova.eu/api/statistics/", false);
	xhr.send();
	if(xhr.status==200){
		return xhr.responseText;
	}
}

function getStatsJSON(){
	return JSON.parse(getStats());
}


function writeStats(){

	var stats=JSON.parse(getStats());
	for(var v in stats){
		console.log(v+': '+stats[v]);
	}
}

function createPlot(){

	var json=getStatsJSON();
		var s1= [];
		var ticks=[];
		for(var k in json){
			s1.push(json[k]);
			ticks.push(k);
		}
		$('#chart1').empty();
        $.jqplot.config.enablePlugins = true;
        //Only animate if we're not using excanvas (not in IE 7 or IE 8)...
        plot1 = $.jqplot('chart1', [s1], {
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
                     	
            },
            highlighter: { show: false,
            			   showLabel: true}
        });
}

$(document).ready(function (){
	createPlot();
	setInterval(createPlot, 20000);

});

