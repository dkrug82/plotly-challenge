

function init(){
    d3.json("StarterCode/samples.json").then(function(data) {
        var names = Object.values(data.names);
       // console.log(names)
        d3.select("select").selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text(function(d) {
            return d;
        })
        .attr("value", function(d){
            return d;
        });
        var firstSample = names[0];
        buildPlot(firstSample);
        buildDemographics(firstSample);
        buildGage(firstSample);
    });
}
init()

function buildPlot(id){
    d3.json("StarterCode/samples.json").then(function(data) {
        //console.log(data);
    //parsed data to retrieve samples data
    var samples = Object.values(data.samples);
    var result = samples.filter(row => row.id == id);
    var resultData = result[0];
        //console.log(samples);
    //used .map to set variables for the information needed to chart
    var otuIDs = resultData.otu_ids//.map(row => row.otu_ids);
    var sampleValues = resultData.sample_values//.map(row => row.sample_values);
    var otuLabels = resultData.otu_labels//.map(row => row.otu_labels); 
        //console.log(otuIDs)
        //console.log(sampleValues);
        //console.log(sampleValues);
    //sliced each above variable to give the top 10
    var slicedOtuIds = otuIDs.slice(0, 10);
    var slicedSampleValues = sampleValues.slice(0, 10);
    var slicedOtuLabels = otuLabels.slice(0, 10);
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
        x: otuIDs,
        y: sampleValues,
        mode: 'markers',
        marker: {
            size: sampleValues,
           color:otuIDs 
        },
        text:otuLabels
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


function buildGage(id){
    d3.json("StarterCode/samples.json").then(function(data){
      var metaData = Object.values(data.metadata);
    var result = metaData.filter(row => row.id == id);
    var resultData = result[0];
    var wfreq = resultData.wfreq 
    console.log(wfreq);
    
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Wash Frequency" },
          type: "indicator",
          mode: "gauge",
          
          gauge: {
            axis: { range: [null, 9 ]},
            steps: [
              { range: [0, 1], color: "rgba(0,128,128,.05)" },
              { range: [1, 2], color: "rgba(0,128,128,.1)" },
              { range: [2, 3], color: "rgba(0,128,128,.15)" },
              { range: [3, 4], color: "rgba(0,128,128,.2)" },
              { range: [4, 5], color: "rgba(0,128,128,.25)" },
              { range: [5, 6], color: "rgba(0,128,128,.3)" },
              { range: [6, 7], color: "rgba(0,128,128,.35)" },
              { range: [7, 8], color: "rgba(0,128,128,.4)" },
              { range: [8, 9], color: "rgba(0,128,128,.45)" }
              
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: wfreq
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
    });
}



function buildDemographics(id){
    d3.json("StarterCode/samples.json").then(function(data) {
        //console.log(data);
    var metaData = Object.values(data.metadata);
    var result = metaData.filter(row => row.id == id);
    var resultData = result[0];
        //console.log(metaData);
    
    var info = d3.select("#sample-metadata");
    info.html("");
    Object.entries(resultData).forEach(([key, value]) => {
        info.append('h6').text(`${key} : ${value}`);
        });
    });
}




function optionChanged(newSample){
   // d3.json("./samples.json").then(function(data) {
    // /** */    var sample = d3.select("#selDataset").property("value");
    // console.log(sample)

    // var updateMeta = Object.entries(data.metadata[0]).filter(item => item.id === sample);
    // console.log(updateMeta)
    buildDemographics(newSample);
    buildPlot(newSample);
    buildGage(newSample);
    
    
}

