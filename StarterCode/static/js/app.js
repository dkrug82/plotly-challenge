
//function to intialize the data on the page
function init(){
    d3.json("StarterCode/samples.json").then(function(data) {
        //obtained values from json file and found the names of each sample
        var names = Object.values(data.names);
       //used d3 to select the proper placment for the sample names
        d3.select("select").selectAll("option")
        //bound the names data
        .data(names)
        .enter()
        .append("option")
        //retuned the text for each sample name
        .text(function(d) {
            return d;
        })
        //added value attribute to the option tag with containing the name of each sample
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
        
    //obtained values from json data file for samples and filtered by 
    //user inputted sample id
    var samples = Object.values(data.samples);
    var result = samples.filter(row => row.id == id);
    var resultData = result[0];
        
    //created variables for the information needed to chart
    var otuIDs = resultData.otu_ids
    var sampleValues = resultData.sample_values
    var otuLabels = resultData.otu_labels 
        
    //sliced each above variable to give the top 10
    var slicedOtuIds = otuIDs.slice(0, 10);
    var slicedSampleValues = sampleValues.slice(0, 10);
    var slicedOtuLabels = otuLabels.slice(0, 10);
        
    //variable used to create lables for bar chart
    var otuIdsString = slicedOtuIds.map(item => `OTU ${item}`);
    
    //data for bar chart
    var barData = [{
        x: slicedSampleValues.reverse(),
        y: otuIdsString.reverse(),
        text:slicedOtuLabels.reverse(),
        name: "Top 10 Bacteria Cultures Found",
        type: "bar",
        orientation: 'h'
    }];
    //data for bubble chart
    var bubbleData = [{
        x: otuIDs,
        y: sampleValues,
        mode: 'markers',
        marker: {
            size: sampleValues,
           color:otuIDs 
        },
        text:otuLabels
    }];
    //layout for bar chart
    var barLayout = {
        title: {
            text:"Top 10 Bacteria Cultures Found"
        }
    };
    //layout for bubble chart
    var bubbleLayout ={
        title:{
            text: "Bacteria Cultures per Sample"
        }
    }
    //Plots for both bubble and bar charts
    Plotly.newPlot('bar', barData, barLayout);
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

      });
      
}


function buildGage(id){
    d3.json("StarterCode/samples.json").then(function(data){
    //obtained values from json data file for samples and filtered by 
    //user inputted sample id
    var metaData = Object.values(data.metadata);
    var result = metaData.filter(row => row.id == id);
    var resultData = result[0];
    //set variable for the wash frequency data
    var wfreq = resultData.wfreq 
    //set up gauge data
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
      //set up layout
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      //plot using the data and layout
      Plotly.newPlot('gauge', data, layout);
    });
}


//set up function to build the demographics for each sample
function buildDemographics(id){
    d3.json("StarterCode/samples.json").then(function(data) {
    //obtained values from json data file for samples and filtered by 
    //user inputted sample id    
    var metaData = Object.values(data.metadata);
    var result = metaData.filter(row => row.id == id);
    var resultData = result[0];
        
    //selected the id name to find were to add the demographic info
    var info = d3.select("#sample-metadata");
    info.html("");
    //used key and value to append the above variable with the demographic info
    Object.entries(resultData).forEach(([key, value]) => {
        info.append('h6').text(`${key} : ${value}`);
        });
    });
}



//used function that was called in the index.html to select a new sample
//from the json data file using a user input
function optionChanged(newSample){
   //call all of the previous functions with the user input
    buildDemographics(newSample);
    buildPlot(newSample);
    buildGage(newSample);
    
    
}

