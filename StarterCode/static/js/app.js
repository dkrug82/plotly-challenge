/** 
d3.json('./samples.json').then(function(data) {
    console.log(data);
  });*/
/** 
function myFunc(data) {
    console.log(data);
}

d3.json('./samples.json', function (data) {
    var json = data;
    myFunc(json);
});

d3.json("../samples.json", function(data) {
    console.log(data);
});*/



function buildPlot(){
    d3.json("./samples.json").then(function(data) {
        //console.log(data);
    //parsed data to retrieve samples data
    var samples = Object.values(data.samples);
        //console.log(samples);
    //used .map to set variables for the information needed to chart
    var otuIDs = samples.map(row => row.otu_ids);
    var sampleValues = samples.map(row => row.sample_values);
    var otuLabels = samples.map(row => row.otu_labels); 
        //console.log(otuIDs)
        //console.log(sampleValues);
        //console.log(sampleValues);
    //sliced each above variable to give the top 10
    var slicedOtuIds = otuIDs[0].slice(0, 10);
    var slicedSampleValues = sampleValues[0].slice(0, 10);
    var slicedOtuLabels = otuLabels[0].slice(0, 10);
        //console.log(slicedOtuIds);
        //console.log(slicedSampleValues);
        //console.log(slicedOtuLabels);

    var otuIdsString = slicedOtuIds.map(item => `OTU ${item}`);
    //console.log(otuIdsString);
    
    var data1 = [{
        x: slicedSampleValues.reverse(),
        y: otuIdsString.reverse(),
        text:slicedOtuLabels.reverse(),
        name: "Top 10 Bacteria Cultures Found",
        type: "bar",
        orientation: 'h'
    }];

    var data2 = [{
        x: otuIDs[0],
        y: sampleValues[0],
        mode: 'markers',
        marker: {
            size: sampleValues[0],
           color:otuIDs[0]  
        },
        text:otuLabels[0]
    }];

    //var data1 = [trace1];

    var layout1 = {
        title: {
            text:"Top 10 Bacteria Cultures Found"
        }
    };

    var layout2 ={
        title:{
            text: "Bacteria Cultures per Sample"
        }
    }

    Plotly.newPlot('bar', data1, layout1);
    Plotly.newPlot('bubble', data2, layout2);

      });
      
}
buildPlot();




 
function buildDemographics(){
    d3.json("./samples.json").then(function(data) {
        console.log(data);
    var metaData = Object.values(data.metadata);
        console.log(metaData);
    
    var info = d3.select("#sample-metadata");
    info.html("");
    Object.entries(metaData[0]).forEach(([key, value]) => {
        info.append('h6').text(`${key} : ${value}`);
        });
    });
}
buildDemographics()



