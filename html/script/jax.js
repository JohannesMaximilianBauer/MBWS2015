function getStats(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://arsnova.eu/api/statistics/", false);
	xhr.send();
	if(xhr.status==200){
//		console.log(xhr.responseText);
		return xhr.responseText;
	}
}

function getStatsJSON(){
	return JSON.parse(getStats());
}


function writeStats(){
	/*
	 * answers
	 * lectureQuestions
	 * preparationQuestions
	 * openSessions
	 * closedSessions
	 * creators
	 * activeUsers
	 * activeStudents
	 * loggedinUsers
	 * interposedQuestions
	 * conceptQuestions
	 * questions
	 * sessions
	 */
	
	var stats=JSON.parse(getStats());
	for(var v in stats){
		console.log(v+': '+stats[v]);
	}
}
/*
function createTable(){
	var i=0;
	var json=getStatsJSON();
	$("#myTable tr").remove(); 
	var table=document.getElementById("myTable");
//	var header=table.createTHead();
//	var row=header.insertRow(i++);
	var cell=row.insertCell(0);
	cell.innerHTML="Beschreibung";
	cell=row.insertCell(1);
	cell.innerHTML="Wert";

	for(var v in json){
		row=header.insertRow(i++);
		row.insertCell(0).innerHTML=v;
		row.insertCell(1).innerHTML=json[v];
		//		console.log(v+': '+stats[v]);
	}
}
*/
function createPlot(){
	/*
	 * answers
	 * lectureQuestions
	 * preparationQuestions
	 * openSessions
	 * closedSessions
	 * creators
	 * activeUsers
	 * activeStudents
	 * loggedinUsers
	 * interposedQuestions
	 * conceptQuestions
	 * questions
	 * sessions
	 */
	var json=getStatsJSON();
		var s1= [];
		var ticks=[];
		for(var j in json){
			s1.push(json[j]);
			ticks.push(j);
		}
		$('#chart1').empty();
        $.jqplot.config.enablePlugins = true;
        
        plot1 = $.jqplot('chart1', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
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
            highlighter: { show: false }
        });
}

$(document).ready(function (){
	createPlot();
	setInterval(createPlot, 30000);
//	createTable();
//	setInterval(createTable, 30000);
});

