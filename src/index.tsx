import * as React from "react";
 
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { DataList, TimeRangePicker, DateTimePicker, WidgetWrapper, TitleBar, ItemListCard, FilterPanel,useUpdateWidgetProps, Modal, Loading, DataTable , DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter } from "uxp/components";
import './styles.scss';
  
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ComposedChart, } from 'recharts';
import { render } from "react-dom";

import { ResponsivePie } from '@nivo/pie';

  
interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string,
    startTime: string | Date; endTime: string | Date,

    TargetStartDate: number | Date; 
} 

interface IWidgetState { 
    isToggleOn: boolean; 
}

   
const URL =  "http://mwalk.iviva.cloud/Apps/Asset/view?key="; 


 
 const AverageAsset: React.FunctionComponent<IWidgetProps> = (props) => { 
 
        let [data,setData] = React.useState<any>([]) 
        function getData () { 
           
            props.uxpContext.executeAction("ivivafacility","AssetAgebyBuilding",{},{json:true}).then(res=>{  
                setData(res[0]);
            }).catch(e=>{
                // console.log("hi", e);
            }); 
        }
        
        React.useEffect(() =>{
            getData();
        }, [])   
  
      return (
          <WidgetWrapper className="average_asset">
              <TitleBar title='Average age of Assets'></TitleBar>  
  
              <div className="average-asset-data">  
                  <h4>Average age </h4> <h3>{data.AssetAge}<em className="years">YRS</em></h3> 
              </div>
                          
          </WidgetWrapper>
      )
  };
    

 const AssetAge: React.FunctionComponent<IWidgetProps> = (props) => { 
    
    let [showModal, setShowModal] = React.useState(false);  
    let[modelData, setmodelData] = React.useState<any>(null); 

    let [showModal1, setShowModal1] = React.useState(false);  
    let[modelData1, setmodelData1] = React.useState<any>(null);


    let [data,setData] = React.useState<any>([]) 
    function getData () {  
        props.uxpContext.executeAction("ivivafacility","AssetAgeinZone",{},{json:true}).then(res=>{ 
            console.log("red",res);
            setData(res);
        }).catch(e=>{
            // console.log("hi", e);
        }); 
    } 

    let [data1,setData1] = React.useState<any>([]) 
    function getData1 (LocationKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AveAssetAgeinZonebyAssCat",{LocationKey:LocationKey},{json:true}).then(res=>{ 
            console.log(res);
            console.log("AveAssetAgeinZonebyAssCat");
            setData1(res);
        }).catch(e=>{
            //   console.log("hi", e);
        }); 
    } 

    let [data2,setData2] = React.useState<any>([]) 
    function getData2 (LocationKey:number,AssetCategoryKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AssetAgeinZonebyAssCat",{LocationKey:LocationKey,AssetCategoryKey:AssetCategoryKey},{json:true}).then(res=>{ 
            console.log("getdata2",res);
            console.log("hello");
            setData2(res);
        }).catch(e=>{
                console.log("getdata2error", e);
        }); 
    } 
    
    React.useEffect(() =>{
        getData(); 
    }, [])   
  

    function handleClick(e:any){  
         
        console.log("location",e); 
        var dataset = e;
        var LocationKey = e.payload.LocationKey;

        var LocationName = e.payload.LocationName;
        console.log("key12",LocationKey); 

        console.log(dataset); 
        setmodelData(dataset);

        getData1(LocationKey);
        setShowModal(true);
    }  
    
    function handleClick1(e:any){
        
        console.log("hello",e); 
        var dataset1 = e;
        var AssetAge = e.payload.AssetAge;
        var AssetCategoryKey = e.payload.AssetCategoryKey; 
        var LocationKey = modelData.payload.LocationKey;
        console.log("locationkey", LocationKey, AssetCategoryKey); 
        // console.log(dataset1); 
        getData2(LocationKey,AssetCategoryKey);
        setmodelData1(dataset1);
        // console.log(dataset1);
        setShowModal1(true);
    }
     
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Asset Age by Location (Zones)'> </TitleBar>  

            <div className="assetage_chart">   
  
                <ResponsiveContainer width="100%">  

                        <BarChart
                            width={500}
                            height={200}
                            data={data}
                            margin={{
                                top: 2, right: 0, left: 0, bottom: 2,
                            }}>
                            <CartesianGrid strokeDasharray="0 0" />
                            <XAxis dataKey="LocationName" name="Location Name"/>
                            <YAxis orientation="left" />
                            <Tooltip />
                            <Bar barSize={20} onClick={handleClick} name="Asset Age" dataKey="AssetAge" fill="#FF8181" > 
                                        {
                                            data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                        }
                            </Bar>  
                    </BarChart>  

                </ResponsiveContainer>   
                        
                        <Modal title={modelData?.LocationName|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >   

                            <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                <BarChart 
                                    layout="vertical" 
                                    width={500}
                                    height={200}
                                    data={data1} 
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                    <XAxis type="number" />
                                    <YAxis dataKey="AssetCategoryID" type="category" />
                                    <Tooltip /> 
                                    <Bar barSize={20} dataKey="AssetCategoryKey" name="Average Age" fill="#0d998a" onClick={handleClick1}/> 
                                </BarChart>
                            </ResponsiveContainer> 

                        </Modal>


                             <Modal title={modelData1?.AssetCategoryID|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >   
                             
                                <div className="assets-widget-list">

                                    <div className="item-list">   

                                            <ul> 
                                                {
                                                    Object.keys(data2 || {}).map((m:any)=>{ 

                                                        return <li>  
                                                            
                                                            <label><a href={URL + data2[m].AssetKey} target="_blank">{data2[m].AssetID}</a></label>  
                                                            <span> {data2[m].AssetAge} <em className="years">YRS</em></span> 
                                                            
                                                        </li>
                                                    })
                                                }   
                                                   

                                            </ul> 

                                        </div>
                                </div> 
                            </Modal> 
                           
                    </div> 
                                
                </WidgetWrapper>

 
            </>
    )
};


 

const MaintenanceDetails: React.FunctionComponent<IWidgetProps> = (props) => {

    let [showModal, setShowModal] = React.useState(false);  
    let[modelData, setmodelData] = React.useState<any>(null);  
 

    let [data,setData] = React.useState<any>([]) 
    function getData () {  
        props.uxpContext.executeAction("ivivafacility","UpcomingPPMWOs",{},{json:true}).then(res=>{ 
              console.log("UpcomingPPMWOs",res);
            setData(res);
        }).catch(e=>{ 
        }); 
    }
    
    React.useEffect(() =>{
        getData();
    }, [])  

 

    let [data1,setData1] = React.useState<any>([]) 
    function getData1(AWOKey:number) {  
        props.uxpContext.executeAction("ivivafacility","PPMWOAssets",{AWOKey: AWOKey},{json:true}).then(res=>{ 
            console.log("PPMWOAssets",res);
           
            setData1(res);
        }).catch(e=>{
            //   console.log("hi", e);
        }); 
    }  
 
    function handleClick(e:any){  
       console.log("assetAWOKeyvalue",e); 
        var dataset = e; 
 
        var AWOKey =  e.payload.AWOKey; 

        console.log("key12",AWOKey);  

        console.log("assetAWOKey",dataset); 
        setmodelData(dataset);

        getData1(AWOKey);
        setShowModal(true);
    }   
  
    function parseDate(date:string){ 
        var currentTime = new Date(date);  
        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2); 
        var day = ("0" + currentTime.getDate()).slice(-2);
        var year = currentTime.getFullYear();
        var formatedate = year + '-' + month + '-' + day; 
        return formatedate;
    }
    
        return (
            <>
           <WidgetWrapper className="assets-widget-list">
                <TitleBar title='Upcoming Maintenance Details'></TitleBar>
    
                <div className="item-list">  
                        <ul>
                        <li className="list-header">
                                    <label>Upcoming Maintenance</label> 
                                    <span>Millenia Walk</span>  
                                </li>
    
                            {data.map((item:any) => (
                                <> 
                                <li key={item.MWOKey}  onClick={handleClick}> 
                                    <label>{item.MWOCode}</label>   
                                    <span>{parseDate(item.TargetStartDate)}</span>
                                </li>
                                </>
                            ))}
                        </ul> 
    
                    </div> 
 

                      <Modal title={modelData?.MWOCode || ''}  show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  

                                <div className="assets-widget-list">

                                    <div className="item-list">   

                                            <ul> 
                                                {
                                                    Object.keys(data1 || {}).map((m:any)=>{
                                                        return <li> 
                                                            {/* <label>{data1[m].AssetID}</label>   */}
                                                            <label><a href={URL + data1[m].AssetKey} target="_blank">{data1[m].AssetID}</a></label> 
                                                            
                                                        </li>
                                                    })
                                                }  
                                            </ul>  

                                        </div>
                                </div> 
                            </Modal> 
                            
            </WidgetWrapper>
    
          
            </>
        )
                        
    };


const TotalNumber: React.FunctionComponent<IWidgetProps> = (props) => { 
     

    let [showModal, setShowModal] = React.useState(false);  
    let[modelData, setmodelData] = React.useState<any>(null); 

    let [showModal1, setShowModal1] = React.useState(false);  
    let[modelData1, setmodelData1] = React.useState<any>(null);


    let [data,setData] = React.useState<any>([]) 
    function getData () {  
        props.uxpContext.executeAction("ivivafacility","AssetCountbyZone",{},{json:true}).then(res=>{ 
            console.log("red",res);
            setData(res);
        }).catch(e=>{
            // console.log("hi", e);
        }); 
    } 

    let [data1,setData1] = React.useState<any>([]) 
    function getData1 (locationKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AssetCountbyAssCatZone",{locationKey:locationKey},{json:true}).then(res=>{ 
            console.log(res);
            console.log("AssetCountbyAssCatZone");
            setData1(res);
        }).catch(e=>{
            //   console.log("hi", e);
        }); 
    }  

    let [data2,setData2] = React.useState<any>([]) 
    function getData2 (LocationKey:number,AssetCategoryKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AssetAgeinZonebyAssCat",{LocationKey:LocationKey,AssetCategoryKey:AssetCategoryKey},{json:true}).then(res=>{ 
            console.log("getdata2",res);
            console.log("hello");
            setData2(res);
        }).catch(e=>{
                console.log("getdata2error", e);
        }); 
    } 
    
    React.useEffect(() =>{
        getData(); 
    }, [])   
  


    function handleClick(e:any){   
        console.log("location",e); 
        var dataset = e;
          var LocationKey = e.payload.LocationKey;
          var locationName = e.payload.LocationName;
        console.log("key12",LocationKey); 

        console.log(dataset); 
        setmodelData(dataset);

        getData1(LocationKey);
        setShowModal(true);
    }  
     
    function handleClick1(e:any){
        
        console.log("hello",e); 
        var dataset1 = e;
        var AssetAge = e.payload.AssetAge;
        var AssetCategoryKey = e.payload.AssetCategoryKey; 
        var locationkey = modelData.payload.LocationKey;
        console.log("locationkey", locationkey, AssetCategoryKey); 
        // console.log(dataset1); 
        getData2(locationkey,AssetCategoryKey);
        setmodelData1(dataset1);
        // console.log(dataset1);
        setShowModal1(true);
    }
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 
 
    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Total Number of Asset by Location (Zone)'></TitleBar>  

            <div className="assetage_chart">    
            

                            <ResponsiveContainer width="100%">  

                                <BarChart
                                    width={500}
                                    height={200}
                                    data={data}
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                    <CartesianGrid strokeDasharray="0 0" />
                                    <XAxis dataKey="LocationName"  name="Location Name"/>
                                    <YAxis orientation="left" />
                                    <Tooltip />
                                    <Bar barSize={20} onClick={handleClick} name="Asset Count" dataKey="AssetCount" fill="#0d998a"> 
                                         {
                                            data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                        }
                                        </Bar> 
                                </BarChart>  

                            </ResponsiveContainer>


                            <Modal  title={modelData?.LocationName|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >   

                                           <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                            <BarChart data={data1} 
                                                layout="vertical" 
                                                width={500}
                                                height={200}
                                            >
                                                <XAxis type="number" />
                                                <YAxis dataKey="AssetCategoryID" type="category" />
                                                <Tooltip /> 
                                                <Bar barSize={20}  name="Asset Count" dataKey="AssetCategoryKey" fill="#0d998a" onClick={handleClick1}/> 
                                            </BarChart>
                                        </ResponsiveContainer> 
    
                            </Modal>
 

                             <Modal  title={modelData1?.AssetCategoryID|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >  

                                <div className="assets-widget-list">

                                    <div className="item-list item-list-nav_half">  

                                            <ul> 
                                                {
                                                    Object.keys(data2 || {}).map((m:any)=>{
                                                        return <li> 
                                                            <label><a href={URL + data2[m].AssetKey} target="_blank">{data2[m].AssetID}</a></label>  
                                                             
                                                        </li>
                                                    })
                                                }  
                                            </ul>  

                                        </div>
                                </div> 
                            </Modal> 
                           
                    </div> 
                                
                </WidgetWrapper>

 
            </>
    )
};
 


const ServiceRequest: React.FunctionComponent<IWidgetProps> = (props) => {  

let [showModal, setShowModal] = React.useState(false);  
let[modelData, setmodelData] = React.useState<any>(null); 

let [showModal1, setShowModal1] = React.useState(false);  
let[modelData1, setmodelData1] = React.useState<any>(null);


let [data,setData] = React.useState<any>([]) 
function getData () {  
    props.uxpContext.executeAction("ivivafacility","WRsBySerCat",{},{json:true}).then(res=>{ 
        console.log("peichart",res);
        var updatedData = res.map((d:any)=> {
            d.WRCounts = parseInt(d.WRCounts)
            return d; 
        }) 
        
        setData(updatedData);
    }).catch(e=>{
        // console.log("hi", e);
    }); 
} 



let [data1,setData1] = React.useState<any>([]) 
function getData1 (ServiceCategoryKey:number) {  
    props.uxpContext.executeAction("ivivafacility","WRCountbyZoneSerCat",{ServiceCategoryKey:ServiceCategoryKey},{json:true}).then(res=>{ 
        console.log(res);
        console.log("AssetCountbyAssCatZone");
        setData1(res);
    }).catch(e=>{
        //   console.log("hi", e);
    }); 
}  

let [data2,setData2] = React.useState<any>([]) 
function getData2 (locationkey:number,ServiceCategoryKey:number) {  
    props.uxpContext.executeAction("ivivafacility","WRCountbyAssetZone",{LocationKey:locationkey,ServiceCategoryKey:ServiceCategoryKey},{json:true}).then(res=>{ 
        console.log("getdata2",res);
        console.log("hello");
        setData2(res);
    }).catch(e=>{
            console.log("getdata2error", e);
    }); 
} 

React.useEffect(() =>{
    getData(); 
}, [])  
 
 
function handleClick(e:any){   
    console.log("location",e); 
    var dataset = e;
      var locationKey = e.payload.LocationKey;
      var locationName = e.payload.LocationName;
      var ServiceCategoryKey = e.payload.ServiceCategoryKey; 
    console.log("key12",locationKey); 

    console.log(dataset); 
    setmodelData(dataset);

    getData1(ServiceCategoryKey);
    setShowModal(true);
}  
 
function handleClick1(e:any){
    
    console.log("hello",e); 
    var dataset1 = e; 

    var ServiceCategoryKey = modelData.payload.ServiceCategoryKey; 
    var locationkey = e.payload.LocationKey; 

    console.log("locationkey", locationkey, ServiceCategoryKey);  
    getData2(locationkey,ServiceCategoryKey);
    setmodelData1(dataset1); 
    setShowModal1(true);
}
 
 const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 
 const [activeIndex, setActiveIndex] = React.useState(-1),
        onMouseEnter = React.useCallback((_, i) => setActiveIndex(i), []);


    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Service Requests by Categories'> </TitleBar>  

            <div className="assetage_chart" style={{width: "95%", height: "95%"}}>  


          
           

             

               {/* <PieChart width={1200} height={1200}> 

                <Pie data={data} label nameKey="ServiceCategoryName" dataKey="WRCounts" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#c9527b" onClick={handleClick}>
                    {
                        data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
 
                    </Pie>  
                </PieChart>  */}


                <PieChart width={550} height={400}>
                    <Pie data={data} color="#000000" dataKey="WRCounts" nameKey="ServiceCategoryName" cx="50%" cy="50%" innerRadius={60} outerRadius={80}  fill="#8884d8" onClick={handleClick}
                     isAnimationActive={true} 
                     activeIndex={activeIndex}
       
                    >
                        {
                            data.map((entry:any, index:any) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    
                    <Tooltip />
                     
                </PieChart>

 
 
         

                    <Modal  title={modelData?.ServiceCategoryName|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >   

                                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                        <BarChart data={data1} 
                                            layout="vertical" 
                                            width={500}
                                            height={200}
                                        >
                                            <XAxis type="number" />
                                            <YAxis dataKey="LocationName" type="category" />
                                            <Tooltip /> 
                                            <Bar barSize={20} dataKey="WRCount" name="WR Count" fill="#c02b82"  onClick={handleClick1}>  
                                            {
                                                data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                            }
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>  
                        </Modal>
 

                        <Modal  title={modelData1?.LocationName|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >  

                                <div className="assets-widget-list">

                                    <div className="item-list"> 

                                            <ul> 
                                                {
                                                    Object.keys(data2 || {}).map((m:any)=>{
                                                        return <li> 
                                                              {/* <label>{data2[m].AssetID}</label> */}
                                                              <label><a href={URL + data2[m].AssetKey} target="_blank">{data2[m].AssetID}</a></label>   
                                                            <span>{data2[m].WRCount}</span>   
                                                        </li>
                                                    })
                                                }  
                                            </ul>  

                                        </div>
                                </div> 
                            </Modal> 


                    </div> 
                                
                </WidgetWrapper> 
 
            </>
    )
}; 


const WorkOrderMonth: React.FunctionComponent<IWidgetProps> = (props) => {
   

let [showModal, setShowModal] = React.useState(false);  
let[modelData, setmodelData] = React.useState<any>(null); 

let [showModal1, setShowModal1] = React.useState(false);  
let[modelData1, setmodelData1] = React.useState<any>(null);


let [data,setData] = React.useState<any>([]) 
function getData () {  
    props.uxpContext.executeAction("ivivafacility","CWOPerMonthbySerCat",{},{json:true}).then(res=>{ 
        console.log("red",res);
        setData(res);
    }).catch(e=>{
        // console.log("hi", e);
    }); 
} 

let [data1,setData1] = React.useState<any>([]) 
function getData1 (ServiceCategoryKey:number, month: string) {  
    props.uxpContext.executeAction("ivivafacility","CWOCountbyZoneSerCat",{ServiceCategoryKey:ServiceCategoryKey, month:month},{json:true}).then(res=>{ 
        console.log(res);
        console.log("AssetCountbyAssCatZone");
        setData1(res);
    }).catch(e=>{
        //   console.log("hi", e);
    }); 
}  

let [data2,setData2] = React.useState<any>([]) 
function getData2 (locationkey:number,ServiceCategoryKey:number, month: string) {  
    props.uxpContext.executeAction("ivivafacility","CWOCountbyAssetZone",{LocationKey:locationkey,ServiceCategoryKey:ServiceCategoryKey, month:month},{json:true}).then(res=>{ 
        console.log("getdata2",res);
        console.log("hello");
        setData2(res);
    }).catch(e=>{
            console.log("getdata2error", e);
    }); 
} 

React.useEffect(() =>{
    getData(); 
}, [])   



function handleClick(e:any){   
    console.log("location",e); 
    var dataset = e;
      var ServiceCategoryKey = e.payload.ServiceCategoryKey;
      var month = e.payload.monthname;
    console.log("key12",ServiceCategoryKey); 

    console.log(dataset); 
    setmodelData(dataset);

    getData1(ServiceCategoryKey, month);
    setShowModal(true);
}  
 
function handleClick1(e:any){
    
    console.log("hello",e); 
    var dataset1 = e;  

    // var locationkey = modelData.payload.LocationKey;
    // var ServiceCategoryKey = e.payload.ServiceCategoryKey;
    // var month = e.payload.monthname; 

    var locationkey = e.payload.LocationKey;
    var ServiceCategoryKey = modelData.payload.ServiceCategoryKey;
    var month = modelData.payload.monthname;  
 
    getData2(locationkey,ServiceCategoryKey, month);
    setmodelData1(dataset1);  
    setShowModal1(true);
} 

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 

// const workorderdata =  
// [
//     {"monthname":"January","ServiceCategoryName":"Access Control System", "ServiceCategoryKey":"4" ,"CWOMCOUNT":"10"},
//     {"monthname":"Fabruary","ServiceCategoryName":"ACMV", "ServiceCategoryKey":"5" ,"CWOMCOUNT":"0"},
//     {"monthname":"March","ServiceCategoryName":"Audio Visual Systems", "ServiceCategoryKey":"6", "CWOMCOUNT":"8"},
//     {"monthname":"April","ServiceCategoryName":"Building Management Systems", "ServiceCategoryKey":"7", "CWOMCOUNT":"0"},
//     {"monthname":"May","ServiceCategoryName":"Building Security", "ServiceCategoryKey":"8" ,"CWOMCOUNT":"0"},
//     {"monthname":"June","ServiceCategoryName":"CCTV", "ServiceCategoryKey":"9" }
// ] 


const workorderdata = [{"monthname":"January","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"January","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"February","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"March","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"April","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"May","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"June","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"2"},
{"monthname":"July","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"1"},
{"monthname":"July","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"1"},
{"monthname":"July","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"July","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"3"},
{"monthname":"August","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"7"},
{"monthname":"August","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"August","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"1"},
{"monthname":"September","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"September","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"October","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"November","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Access Control System","ServiceCategoryKey":"4","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"ACMV","ServiceCategoryKey":"2","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Audio Visual Systems","ServiceCategoryKey":"6","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Building Management Systems","ServiceCategoryKey":"7","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Building Security","ServiceCategoryKey":"19","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"CCTV","ServiceCategoryKey":"17","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Civil","ServiceCategoryKey":"3","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Electrical","ServiceCategoryKey":"1","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Engineering Related","ServiceCategoryKey":"20","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Facility Administration","ServiceCategoryKey":"5","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Fire Protection Systems","ServiceCategoryKey":"10","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Gas Supply","ServiceCategoryKey":"12","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"General Repairs & Maintenance","ServiceCategoryKey":"13","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"House Keeping & Cleaning","ServiceCategoryKey":"9","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Internet & Telecommunications","ServiceCategoryKey":"11","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Landscaping","ServiceCategoryKey":"15","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Lifts, Escalators & Moving Walks","ServiceCategoryKey":"14","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Others","ServiceCategoryKey":"21","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Parking System","ServiceCategoryKey":"8","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"Plumbing","ServiceCategoryKey":"16","CWOMCOUNT":"0"},
{"monthname":"December","ServiceCategoryName":"White Goods","ServiceCategoryKey":"18","CWOMCOUNT":"0"}
]

 
    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Work Orders per Month'></TitleBar>  

            <div className="assetage_chart">    
{/* 
                            <ResponsiveContainer >  
                                <BarChart
                                    width={500}
                                    height={200}
                                    data={data}
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                    
                                    <XAxis dataKey="monthname" />
                                    <YAxis orientation="left" />
                                    <Tooltip />
                                    

                                     <Bar stackId="a" barSize={20} name="Service Category Name"  onClick={handleClick} fill="#8884d8" dataKey="ServiceCategoryKey" />
                                    <Bar stackId="a" barSize={20} name="CWOM COUNT" onClick={handleClick} fill="#82ca9d" dataKey="CWOMCOUNT" />  

                                 </BarChart> 
                                  </ResponsiveContainer>
                                     */}


                                    <ResponsiveContainer width="100%">  

                                       <BarChart
                                            width={500}
                                            height={200}
                                            data={workorderdata}
                                            margin={{
                                                top: 2, right: 0, left: 0, bottom: 2,
                                            }}>
                                            <CartesianGrid strokeDasharray="0 0" />
                                            <XAxis dataKey="monthname" /> 
                                            <YAxis orientation="left" />
                                            <Tooltip />  
                                            <Bar stackId="a" barSize={20} onClick={handleClick} fill="#8884d8" dataKey="ServiceCategoryKey"/>
                                            <Bar stackId="a" barSize={20} onClick={handleClick} fill="#82ca9d" dataKey="CWOMCOUNT" /> 
                                        </BarChart>    

                                     

                                    </ResponsiveContainer>

                           
 
                             <Modal title={modelData?.ServiceCategoryName|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  

                                           <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                            <BarChart data={data1} 
                                                layout="vertical" 
                                                width={500}
                                                height={200}
                                            >
                                                <XAxis type="number" />
                                                <YAxis dataKey="LocationName" type="category" />
                                                <Tooltip /> 
                                                {/* <Bar barSize={20} dataKey="CWOCount" fill="#0d998a"  onClick={handleClick1}/>  */}

                                                <Bar barSize={20} name="CWO Count" dataKey="LocationKey" fill="#0d998a"  onClick={handleClick1}/> 
                                            </BarChart>
                                        </ResponsiveContainer> 
    
                            </Modal>

                             <Modal  title={modelData1?.LocationName|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >   
   
                                <div className="assets-widget-list">

                                    <div className="item-list">   

                                            <ul> 
                                                {
                                                    Object.keys(data2 || {}).map((m:any)=>{
                                                        return <li> 
                                                            <label>{data2[m].AssetID}</label>  
                                                            <span> {data2[m].CWOCount}</span> 
                                                        </li>
                                                    })
                                                }   
                                                       
                                            </ul> 

                                        </div>
                                    </div> 


                            </Modal> 
                    </div> 
                                
                </WidgetWrapper>
 
            </>
    )
};
  



const UpcomingAssets: React.FunctionComponent<IWidgetProps> = (props) => {  


    let [startDate, setStartDate] = React.useState<string | Date>(new Date()); 
    let [endDate, setEndDate] = React.useState<string | Date>(addDays(90)); 
 

    let [data,setData] = React.useState<any>([]) 
    function getData () {  
        props.uxpContext.executeAction("ivivafacility","UpcomingPPMAssetforMaintenance",{StartDate: startDate, EndDate: endDate },{json:true}).then(res=>{ 
              console.log(res);
            setData(res);
        }).catch(e=>{ 
        }); 
    }
    
    React.useEffect(() =>{

        console.log("Checking",startDate);
        getData();

        

    }, [])  


     

    
     
    function parseDate(date:string){ 
        var currentTime = new Date(date);  
        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2); 
        var day = ("0" + currentTime.getDate()).slice(-2);
        var year = currentTime.getFullYear();
        var formatedate = year + '-' + month + '-' + day; 
        return formatedate;
    }
 
    let date = new Date(); 
    date.setDate(date.getDate() + 1);
    
    function addDays(days: number) { 
        var result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }  

    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Upcoming Assets for Maintenance'>  
              
                <DateRangePicker title=""
                    startDate={startDate}
                    endDate={endDate}
                    closeOnSelect
                    onChange={(newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd)}}
                />  
                            
            </TitleBar>

            <div className="item-list" >  
                    <ul>
                        {data.map((item:any) => (  
                            <li key={item.AssetID}> 
                                {/* <label>{item.AssetID}</label>   */}
                                <label><a href={URL + item.AssetKey} target="_blank">{item.AssetID}</a></label>  
                                <span>{parseDate(item.TargetStartDate)}</span>   
                            </li>
                        ))}
                    </ul> 
                </div>
                        
        </WidgetWrapper>
    )
};



const ProblematicAssets: React.FunctionComponent<IWidgetProps> = (props) => { 
    
    let [data,setData] = React.useState<any>([]) 
    function getData () {  
        props.uxpContext.executeAction("ivivafacility","TopProblematicAssets",{},{json:true}).then(res=>{ 
              console.log(res);
            setData(res);
        }).catch(e=>{ 
        }); 
    }
    
    React.useEffect(() =>{
        getData();
    }, []) 

 
    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Top 5 Highest CWO/WR per Asset'></TitleBar>

            <div className="item-list">  
                    <ul>
                        {data.map((item:any) => (
                            <li key={item.AssetID}> 
                                {/* <label>{item.AssetID}</label>  */}
                                <label><a href={URL +item.AssetKey} target="_blank">{item.AssetID}</a></label> 
                                <span>{item.TotalCases}</span>  
                            </li>
                        ))}
                    </ul> 

                </div>
                        
        </WidgetWrapper>
    )
};

 
const TopAgedAssets: React.FunctionComponent<IWidgetProps> = (props) => {

    let [data,setData] = React.useState<any>([]) 
    function getData () {  
        props.uxpContext.executeAction("ivivafacility","TopAgedAssets",{},{json:true}).then(res=>{ 
              console.log(res);
            setData(res);
        }).catch(e=>{
            // console.log("hi", e);
        }); 
    }
    
    React.useEffect(() =>{
        getData();
    }, []) 
     
 
    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Top 5 Aged Assets'></TitleBar>

              <div className="item-list">  
                    <ul>
                        {data.map((item:any) => (
                            <li key={item.AssetID}> 
                                {/* <label>{item.AssetID}</label>  */}
                                <label><a href={URL + item.AssetKey} target="_blank">{item.AssetID}</a></label> 
                                <span>{item.Age} <em className="years">YRS</em> </span>  
                            </li>
                        ))}
                    </ul> 
                </div>
                        
        </WidgetWrapper>
    )
};

      
/**
 * Register as a Widget
 */

 

 registerWidget({
    id: "averageAsset", 
    widget: AverageAsset,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});

 registerWidget({
    id: "assetAge", 
    widget: AssetAge,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});



 registerWidget({
    id: "maintenanceDetails", 
    widget: MaintenanceDetails,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});



registerWidget({
    id: "totalNumber", 
    widget: TotalNumber,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});



registerWidget({
    id: "serviceRequest", 
    widget: ServiceRequest,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});

registerWidget({
    id: "workOrderMonth", 
    widget: WorkOrderMonth,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});


registerWidget({
    id: "upcomingAssets", 
    widget: UpcomingAssets,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});


registerWidget({
    id: "problematicAssets", 
    widget: ProblematicAssets,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});


registerWidget({
    id: "topAgedAssets", 
    widget: TopAgedAssets,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});
 



function componentDidMount() {
    throw new Error("Function not implemented.");
}
/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "pontiacland",
    label: "Pontiacland",
    // click: () => alert("Hello"),
    component: PontiaclandWidget
});
*/

/**
 * Register as a UI
 */

 /*
registerUI({
    id:"pontiacland",
    component: PontiaclandWidget
});
*/