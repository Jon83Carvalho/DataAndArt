import React from 'react'; 
import {filter, range} from 'd3';
import useSWR from 'swr';
import { useRef } from 'react';
import {csvParse} from 'd3';
import { View, Text,StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import {Viz4} from './Viz4';


import axios from 'axios';



/////////////////////////

const styles = StyleSheet.create({
  
  baseText: {
    fill: "darkgrey",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"12"
  },
  titText: {
    fill: "#DD7788",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"4.5vw"
  },
  innerText: {
    color:"#fff",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"1.7rem"
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "green",
  },
  container_card: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "darkgrey",
    height:"100%",
  },
  row: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 0,
    flexDirection: "row",
  },
  card1: {
    backgroundColor: "#7ca1b4",
    flex: 4,
    margin: 5,
    
  },
  card2: {
    backgroundColor: "#7ca1b4",
    flex: 2.4,
    margin: 5,
    
  },
  card3: {
    backgroundColor: "#7ca1b4",
    flex: 1.2,
    margin: 5,
    
  },
  card4: {
    backgroundColor: "#7ca1b4",
    flex: 1.1,
    margin: 5,
    
  },
  card5: {
    backgroundColor: "#7ca1b4",
    flex: 1,
    margin: 5,
    
  },
    
  image: {
    flex:1,
    resizeMode:"cover",
    width:"1450px",
    position:"relative",
    top:0,
    left:-200,
    backgroundColor:"#6667AB",
    opacity:"50%"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
 
});


///////////////////////


const image={uri:"https://github.com/Jon83Carvalho/DataAndArt/blob/main/eye.jpg?raw=true"};

const circleRadius=30;

const array=range(1);

const width="100%"; 
const height="100%";
const margin={
  top:20,
  right:0,
  bottom:0,
  left:0
};
const xAxislabelOffset=70;
const yAxislabelOffset=50;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function Art4() {
 
  //START - variable declaration=========================================
  const rawdata=[{28000:'{"Volume":0.1}'}]; 
  var csvUrl
  csvUrl='http://127.0.0.1:8000/'
  const previousdata = useRef();
  const respdata=useRef()
  //END - variable declaration=========================================
  
  //START - reading data===============================
  const fetcher = (url) => {
    
    
    const respo = axios.get(url).then(res=>res.data)
      
    
    return respo;
  };

  const {data} = useSWR(csvUrl,fetcher,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount:true,
    refreshInterval: 5000,

    
  })
  
   previousdata.current=localStorage.getItem('cdata')
  
  if (previousdata.current===null){
    localStorage.setItem('pdata',`Volume\n${rawdata[0].Volume}`);
    localStorage.setItem('firstdisplay',`0`);
    
    previousdata.current=localStorage.getItem('pdata');
  }
  
  previousdata.current=csvParse(previousdata.current,
    (d)=>{
      //d=+d;
       return d}
       )

if(!data){
   
       return <pre>...loading</pre>;
};
      
      
      
  //Collecting trade data
respdata.current=data.trade_data


  //FINISH - reading data===============================

const sequence=[3,2,1]

//Create Count data for each coin
const count_data_map=data.count.map(d=>
    {
    return {
      "coin":Object.keys(d)[0],
      "count":JSON.parse(Object.values(d)[0])['Count']
    }
    }

  ).filter(d=>d.count!=undefined)
      .sort((a,b)=>b.count-a.count)

  //Creating ranking data
  const data_count_rank=data.count.map(
      d=>{
        d['rank']=count_data_map
                    .map(k=>k.coin)
                    .indexOf(Object.keys(d)[0])+1
        return d
      }
    )
//displaying rank data
// console.log(data_count_rank)   


return (

<View style={styles.container}>
      <Text>This is top filler</Text>
      <View style={styles.row}>
        <Card style={styles.card1}>
        <Card.Content style={styles.container_card}>
      <div id="root_svg_1" style={{"flex":"1"}}>
        <Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    datacount={count_data_map}
    ichart={0}
    iterate_plot={0}
    opac={1}
    gradType="barsGrad"
    root_div={1}
    />
    </div>
    </Card.Content>
       
    </Card>
          
        
    <Card style={styles.card2}>
    <Card.Content style={styles.container_card}>
      <div id="root_svg_2" style={{"flex":"1"}}>
        <Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    datacount={count_data_map}
    ichart={1}
    iterate_plot={0}
    opac={1}
    gradType="barsGrad"
    root_div={2}
    />
    </div>
    </Card.Content>
        

        </Card>
        <Card style={styles.card3}>
        <Card.Content style={styles.container_card}>
      <div id="root_svg_3" style={{"flex":"1"}}>
        <Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    datacount={count_data_map}
    ichart={2}
    iterate_plot={0}
    opac={1}
    gradType="barsGrad"
    root_div={3}
    />
    </div>
    </Card.Content>
        

        </Card>
        <Card style={styles.card4}>
        <Card.Content style={styles.container_card}>
      <div id="root_svg_4" style={{"flex":"1"}}>
        <Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    datacount={count_data_map}
    ichart={3}
    iterate_plot={0}
    opac={1}
    gradType="barsGrad"
    root_div={4}
    />
    </div>
    </Card.Content>
        

        </Card>
        <Card style={styles.card5}>
        <Card.Content style={styles.container_card}>
      <div id="root_svg_5" style={{"flex":"1"}}>
        <Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    datacount={count_data_map}
    ichart={4}
    iterate_plot={0}
    opac={1}
    gradType="barsGrad"
    root_div={5}
    />
    </div>
    </Card.Content>
        

        </Card>
      </View>
     
      <Text>This is bottom filler</Text>
    </View>


   
      )}    


//R