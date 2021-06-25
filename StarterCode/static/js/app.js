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


function init(){
    d3.json("./samples.json").then(function(data) {
        console.log(data);
    //parsed data to retrieve samples data
    var samples = Object.values(data.samples);
        console.log(samples);
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
        console.log(slicedOtuIds);
        console.log(slicedSampleValues);
        console.log(slicedOtuLabels);

    var otuIdsString = slicedOtuIds.map(item => `OTU ${item}`);
    console.log(otuIdsString);
    
    var trace1 = {
        x: slicedSampleValues.reverse(),
        y: otuIdsString.reverse(),
        text:slicedOtuLabels.reverse(),
        name: "Top 10 Bacteria Cultures Found",
        type: "bar",
        orientation: 'h'
    };

    var data = [trace1];

    var layout = {
        title: {
            text:"Top 10 Bacteria Cultures Found"
        }
    };

    Plotly.newPlot('bar', data, layout);
      });
}




init();

