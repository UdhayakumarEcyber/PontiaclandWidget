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

   
 const url =  "http://mwalk.iviva.cloud/apps/ivivafacility/wo-details?key=121"

 
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
                <h4>Average age </h4> <h3>{data.AssetAge}<span>YRS</span></h3> 
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
    function getData1 (locationKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AveAssetAgeinZonebyAssCat",{locationKey:locationKey},{json:true}).then(res=>{ 
            console.log(res);
            console.log("AveAssetAgeinZonebyAssCat");
            setData1(res);
        }).catch(e=>{
            //   console.log("hi", e);
        }); 
    } 

    let [data2,setData2] = React.useState<any>([]) 
    function getData2 (locationkey:number,AssetCategoryKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AssetAgeinZonebyAssCat",{LocationKey:locationkey,AssetCategoryKey:AssetCategoryKey},{json:true}).then(res=>{ 
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
        console.log("key12",locationKey); 

        console.log(dataset); 
        setmodelData(dataset);

        getData1(locationKey);
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
            <TitleBar title='Asset Age by Location (Zones)'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>  

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
                            <XAxis dataKey="LocationName" />
                            <YAxis orientation="left" />
                            <Tooltip />
                        <Bar barSize={20} onClick={handleClick} dataKey="AssetAge" fill="#FF8181" > 
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
                                    <Bar barSize={20} dataKey="AssetCategoryKey" fill="#0d998a"  onClick={handleClick1}/> 
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
                                                            <label>{data2[m].AssetKey}</label>  
                                                            <span> {data2[m].AssetID}</span> 
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
    function getData1 (MWOKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AveAssetAgeinZonebyAssCat",{MWOKey: MWOKey},{json:true}).then(res=>{ 
            console.log("locationKey",res);
           
            setData1(res);
        }).catch(e=>{
            //   console.log("hi", e);
        }); 
    }  

    function handleClick(e:any){
        console.log("MWOKey", e); 
        var dataset = data1;
        var MWOKey = e.MWOKey;
        setmodelData(dataset);
        getData1(MWOKey)
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
 

                      <Modal  title={modelData?.MWOCode|| ''}  show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  

                                <div className="assets-widget-list">

                                    <div className="item-list">   

                                            <ul> 
                                                {
                                                    Object.keys(data1 || {}).map((m:any)=>{
                                                        return <li> 
                                                            <label>{data1[m].AssetCategoryID}</label>  
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
    function getData2 (locationkey:number,AssetCategoryKey:number) {  
        props.uxpContext.executeAction("ivivafacility","AssetAgeinZonebyAssCat",{LocationKey:locationkey,AssetCategoryKey:AssetCategoryKey},{json:true}).then(res=>{ 
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
        console.log("key12",locationKey); 

        console.log(dataset); 
        setmodelData(dataset);

        getData1(locationKey);
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
            <TitleBar title='Total Number of Asset by Location (Zone)'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>  

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
                                    <XAxis dataKey="LocationName" />
                                    <YAxis orientation="left" />
                                    <Tooltip />
                                    <Bar barSize={20} onClick={handleClick} dataKey="AssetCount" fill="#0d998a"> 
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
                                                <Bar barSize={20} dataKey="AssetCategoryKey" fill="#0d998a" onClick={handleClick1}/> 
                                            </BarChart>
                                        </ResponsiveContainer> 
    
                            </Modal>
 

                             <Modal  title={modelData1?.AssetCategoryID|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >  

                                <div className="assets-widget-list">

                                    <div className="item-list">  

                                            <ul> 
                                                {
                                                    Object.keys(data2 || {}).map((m:any)=>{
                                                        return <li> 
                                                            <label>{data2[m].AssetID}</label>   
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
 
    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Service Request/Work Orders by Categories'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>  

            <div className="assetage_chart" style={{width: "95%", height: "95%"}}>  
           

            <ResponsiveContainer>

                <PieChart width={1200} height={1200}> 

                <Pie data={data} dataKey="WRCounts" nameKey="ServiceCategoryName" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#c9527b" label onClick={handleClick}>
                    {
                        data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>  
                </PieChart>
                
            </ResponsiveContainer> 
         

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
                                            <Bar barSize={20} dataKey="LocationKey" fill="#c02b82"  onClick={handleClick1}>  
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
                                                              <label>{data2[m].AssetID}</label>  
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
 
 
    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Work Orders per Month'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>  

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
                                    <XAxis dataKey="monthname" />
                                    <YAxis orientation="left" />
                                    <Tooltip />
                                    {/* <Bar barSize={20} onClick={handleClick} dataKey="CWOMCOUNT" fill="#2949F7A5" />  */}

                                    <Bar stackId="a" barSize={20} name="Service Category Name"  onClick={handleClick} fill="#8884d8" dataKey="ServiceCategoryKey" />
                                    <Bar stackId="a" barSize={20} name="CWOM COUNT" onClick={handleClick} fill="#82ca9d" dataKey="CWOMCOUNT" />
                                    
                                </BarChart>  

                            </ResponsiveContainer>
 
                             <Modal title={modelData?.monthname|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  

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

                                                <Bar barSize={20} dataKey="LocationKey" fill="#0d998a"  onClick={handleClick1}/> 
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

    let [data,setData] = React.useState<any>([]) 
    function getData () {  
        props.uxpContext.executeAction("ivivafacility","UpcomingPPMAssetforMaintenance",{},{json:true}).then(res=>{ 
              console.log(res);
            setData(res);
        }).catch(e=>{ 
        }); 
    }
    
    React.useEffect(() =>{
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
   

    let [startDate, setStartDate] = React.useState<string | Date>(new Date()); 
    let [endDate, setEndDate] = React.useState<string | Date>(addDays(90)); 
 
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
                                <label>{item.AssetID}</label>  
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
                                <label>{item.AssetID}</label> 
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
            <TitleBar title='Top 5 highest cwo/wr per Assets'></TitleBar>

              <div className="item-list">  
                    <ul>
                        {data.map((item:any) => (
                            <li key={item.AssetID}> 
                                <label>{item.AssetID}</label> 
                                <span>{item.Age}</span>  
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