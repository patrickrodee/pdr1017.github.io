var myChart =
	{
		"graphset":[
    		{
		        "type":"bar",
		        "stacked" : true,
		        "background-color":"#326395",
		        "title":{
		            "text":"Goals For/Goals Against | All Groups",
		            "background-color":"#326395",
		            "fontFamily" : "Raleway",
		            "fontWeight" : "200",
		            "fontSize" : "16",
		            "color":"#FFFFFF"
		        },
		        "scaleX":{
		            "line-color":"none",
		            "line-width":0,
		            "guide":{
		                "line-color":"none"
		            },
		            "tick":{
		                "line-color":"#none",
		                "line-width":0,
		                "visible":0
		            },
		            "item":{
		                "color":"#FFFFFF",
		                "fontFamily" : "Raleway",
		            	"fontWeight" : "200",
		            },
		            "labels": ["ALG","ARG","AUS","BEL","BOS","BRA","CAM","CHL","COL","COS","CRO","CIV","ECU","ENG","FRA","GER","GHA","GRE","HON","IRA","ITA","JPN","KOR","MEX","NED","NGA","POR","RUS","SPA","SWI","USA","URU"],
		        },
		        "scaleY":{
		            "line-color":"none",
		            "line-width":0,
		            "guide":{
		                "line-color":"none"
		            },
		            "tick":{
		                "line-color":"none",
		                "line-width":0
		            },
		            "item":{
		                "color":"#326395"
		            }
		        },
		        "plot":{
		            "tooltip":{
		                "shadow":0,
		                "border-radius":5,
		                "sticky":1,
		                "timeout":200
		            },
		            "animation" : {
		            	"effect" : "2",
		            	"delay" : 500,
		            	"speed" : 100,
		            },
		        },
		        "series":[
		            {
		                "values":[5,5,3,3,4,7,1,5,9,4,5,4,3,2,7,7,4,2,1,1,2,2,3,4,10,3,3,1,4,7,4,4],
		                "data-scored" : ["Algeria has scored ","Argentina has scored ","Australia has scored ","Belgium has scored ","Bosnia & Herzegovina has scored ","Brazil has scored ","Cameroon has scored ","Chile has scored ","Colombia has scored ","Costa Rica has scored ","Croatia has scored ","Cote d`Ivoire has scored ","Ecuador has scored ","England has scored ","France has scored ","Germany has scored ","Ghana has scored ","Greece has scored ","Honduras has scored ","Iran has scored ","Italy has scored ","Japan has scored ","South Korea has scored ","Mexico has scored ","Netherlands has scored ","Nigeria has scored ","Portugal has scored ","Russia has scored ","Spain has scored ","Switzerland has scored ","USA has scored ","Uruguay has scored "],
		                "tooltip" : {
		                	"rules" : [
		                	{
		                		"rule" : "%v == 1",
		                		"text" : "%data-scored" + "%v" + " goal",
		                	},
		                	{
		                		"rule" : "%v == 0",
		                		"text" : "%data-scored" + "no goals",
		                	}
		                	],
		                	"fontFamily" : "Raleway",
		            		"fontWeight" : "200",
		            		"fontSize" : "14",
		            		"maxWidth" : "100px",
		            		"wrapText" : true,
		                	"text" : "%data-scored" + "%v" + " goals" 
		                },
		                "background-color":"#44CC44"
		            },
		            {
		                "values":[-4,-3,-9,-1,-4,-2,-9,-3,-2,-1,-6,-5,-3,-4,-2,-2,-6,-4,-8,-4,-3,-6,-5,-1,-3,-3,-7,-2,-7,-6,-4,-4],
		                "data-positive":[4,3,9,1,4,2,9,3,2,1,6,5,3,4,2,2,6,4,8,4,3,6,5,1,3,3,7,2,7,6,4,4],
		                "data-allowed" : ["Algeria has allowed ","Argentina has allowed ","Australia has allowed ","Belgium has allowed ","Bosnia & Herzegovina has allowed ","Brazil has allowed ","Cameroon has allowed ","Chile has allowed ","Colombia has allowed ","Costa Rica has allowed ","Croatia has allowed ","Cote d`Ivoire has allowed ","Ecuador has allowed ","England has allowed ","France has allowed ","Germany has allowed ","Ghana has allowed ","Greece has allowed ","Honduras has allowed ","Iran has allowed ","Italy has allowed ","Japan has allowed ","South Korea has allowed ","Mexico has allowed ","Netherlands has allowed ","Nigeria has allowed ","Portugal has allowed ","Russia has allowed ","Spain has allowed ","Switzerland has allowed ","USA has allowed ","Uruguay has allowed "],
		                "tooltip" : {
		                	"rules" : [
		                	{
		                		"rule" : "%v == 0",
		                		"text" : "%data-allowed" + " no goals",
		                	},
		                	{
		                		"rule" : "%v == 1",
		                		"text" : "%data-allowed" + "1 goal",
		                	}
		                	],
		                	"fontFamily" : "Raleway",
		            		"fontWeight" : "200",
		            		"fontSize" : "14",
		            		"maxWidth" : "100px",
		            		"wrapText" : true,
		                	"text" : "%data-allowed" + "%data-positive" + " goals" 
		                },
		                "background-color":"#CC4444"
		            }
		        ]
		    }
		]
	}

window.onload=function() {
		zingchart.render({
			id:"myChartDiv",
			data: myChart,
			height: 400,
			width: "100%"
		});
	};