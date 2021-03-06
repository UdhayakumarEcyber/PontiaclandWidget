import * as React from "react";
 
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { DataList, LinkWidgetContainer, TimeRangePicker, DateTimePicker, WidgetWrapper, TitleBar, ItemListCard, FilterPanel,useUpdateWidgetProps, Modal, Loading, DataTable , DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter } from "uxp/components";
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const MonthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function monthFromName(name:string) {
    let i = MonthNames.indexOf(name);
    if (i < 0) {
        i = 0;
    }
    return i+1;
}
 
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
              <h4>Average age </h4>
              <h3>{data.AssetAge}<em className="years">YRS</em></h3> 
              </div>
                          
          </WidgetWrapper>
      )
  };
    

 const AssetAge: React.FunctionComponent<IWidgetProps> = (props) => { 
    
    let [showModal, setShowModal] = React.useState(false);  
    let[modelData, setmodelData] = React.useState<any>(null); 

    let [showModal1, setShowModal1] = React.useState(false);  
    let[modelData1, setmodelData1] = React.useState<any>(null); 
    

    let [showLinkWidget, setShowLinkWidget] = React.useState(false);
    let[inkWidgetmodelData, inkWidgetsetmodelData] = React.useState<any>(null);  


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
        
        getData1(LocationKey); 
        setmodelData(dataset); 
        setShowModal(true);

        //  inkWidgetsetmodelData(dataset); 
        //  setShowLinkWidget(true);

        // let [showModal, setShowModal] = React.useState(false);  
        // let[modelData, setmodelData] = React.useState<any>(null);  
        // let [showLinkWidget, setShowLinkWidget] = React.useState(false);
        // let[inkWidgetmodelData, inkWidgetsetmodelData] = React.useState<any>(null);  


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
 
        
        document.getElementById("my_Popup").classList.add("my_Popup_toggle");  
        document.getElementById("innerPopup").classList.add("inner_list_toggle");
     } 

    function removehandleClick1(e:any){        
        document.getElementById("my_Popup").classList.remove("my_Popup_toggle");
        document.getElementById("innerPopup").classList.remove("inner_list_toggle"); 
     } 
      
 
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
                            <YAxis ticks={[30, 60, 90]} type="number" />
                            <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                            <Bar barSize={20} onClick={handleClick} data-value="link-widget-container" name="Asset Age" dataKey="AssetAge" fill="#FF8181" > 
                                {
                                    data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                }
                            </Bar> 
                        </BarChart>  
                </ResponsiveContainer>  
  

                    <Modal className="popup" title="" show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} > 
 
                        <div id="my_Popup">
                            <div className="popup-modal-header"> 
                                <div className="modal-title" onClick={removehandleClick1}>{modelData?.LocationName|| ''}</div>   
                                <div className="modal-sub_title"> <p></p> {modelData1?.AssetCategoryID|| ''}</div>    
                            </div> 

                            <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                <BarChart  
                                    width={500}
                                    height={200}
                                    data={data1} 
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                        <CartesianGrid strokeDasharray="0 0" />
                                    <XAxis dataKey="AssetCategoryID"/> 
                                    <YAxis dataKey="AssetAge" ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]} type="number" />
                                    <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                    <Bar barSize={20} dataKey="AssetAge" name="Average Age" fill="#0d998a" onClick={handleClick1}/> 
                                </BarChart>
                            </ResponsiveContainer>    
                         
                            <div className="inner_list" id="innerPopup"> 
                                
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
 
        var AWOKey =  e.AWOKey;

        console.log("key12",AWOKey);   
        console.log("assetAWOKey",dataset);  
        getData1(AWOKey);
        setmodelData(dataset); 
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


    let [inputValue, setInputValue] = React.useState<string | null>("sample text"); 
    let [selected, setSelected] = React.useState<string | null>("op-1");
    
        return (
            <>
           <WidgetWrapper className="assets-widget-list">
                <TitleBar title='Upcoming Maintenance'> 
                
                            <FilterPanel
                                enableClear={inputValue?.length > 0 || selected != null}
                                onClear={() => { setInputValue(""); setSelected(null) }} >
                                <FormField className="no-padding mb-only">
                                    <Label>Location</Label>
                                    <Select
                                        selected={selected}
                                        options={[
                                            { label: "Millenia Walk", value: "op-1" },
                                            { label: "Millenia Walk 1", value: "op-2" },
                                        ]}
                                        onChange={(value) => { setSelected(value) }}
                                        placeholder=" -- select --"
                                        isValid={selected ? selected?.length > 0 : null}
                                    />
                                </FormField>
                                
                            </FilterPanel>
                         
                </TitleBar>
    
                <div className="item-list">  
                        <ul>
                            {/* <li className="list-header">
                                    <label>Upcoming Maintenance</label> 
                                    <span>Millenia Walk</span>  
                                </li> */}
    
                            {data.map((item:any) => (
                                <> 
                                <li key={item.MWOKey}  onClick={() => {handleClick(item)} }> 
                                    <label>{item.MWOCode}</label>   
                                    <span>{parseDate(item.TargetStartDate)}</span>
                                </li>
                                </>
                            ))}
                        </ul> 
    
                    </div> 
 

                      <Modal className="popup" title={modelData?.MWOCode || ''}  show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  

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

        getData1(LocationKey);
        setmodelData(dataset);
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
    

    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Total Number of Asset by Location (Zone)'></TitleBar>  

            <div className="assetage_chart">    
            

                            <ResponsiveContainer width="100%">  

                                <BarChart
                                    width={800}
                                    height={1200}
                                    data={data}
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                    <CartesianGrid strokeDasharray="0 0" />
                                    <XAxis  type="category" dataKey="LocationName"  name="Location Name"/>
                                    {/* <YAxis  type="number" orientation="left" /> */}
                                    <YAxis ticks={[30, 60, 90, 120, 150]} type="number" />
                                    <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                    <Bar barSize={20} onClick={handleClick} name="Asset Count" dataKey="AssetCount" fill="#0d998a"> 
                                         {
                                            data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                        }
                                        </Bar> 
                                </BarChart>  

                            </ResponsiveContainer>


                            <Modal className="popup"  title={modelData?.LocationName|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >   
 

                                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                        <BarChart 
                                            //  layout="vertical" 
                                            width={500}
                                            height={200}
                                            data={data1} 
                                            margin={{
                                                top: 2, right: 0, left: 0, bottom: 2,
                                            }}>
                                            <XAxis dataKey="AssetCategoryID"/>
                                            {/* <YAxis dataKey="AssetCount"/> */}
                                            <CartesianGrid strokeDasharray="0 0" />
                                            <YAxis  dataKey="AssetCount" ticks={[20, 40, 60, 80, 100]} type="number" />
                                            <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                            <Bar barSize={20} dataKey="AssetCount" name="Asset Count" fill="#1195cc" onClick={handleClick1}/> 
                                        </BarChart>
                                    </ResponsiveContainer>   
            
                            </Modal>
 

                             <Modal className="popup_inner"  title={modelData1?.AssetCategoryID|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >  

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


function handleClick(node:any, event:any){   
    console.log("peChart",node, event); 
   var dataset = node.data; 
        var ServiceCategoryKey = dataset.ServiceCategoryKey;  

    console.log(dataset); 

    getData1(ServiceCategoryKey);
    setmodelData(dataset); 
 
    setShowModal(true); 
}  
 
function handleClick1(e:any){
    
    console.log("hello",e); 
    var dataset1 = e; 

    var ServiceCategoryKey = modelData.ServiceCategoryKey; 
    var locationkey = dataset1.LocationKey; 

    console.log("locationkey", locationkey, ServiceCategoryKey);  
    getData2(locationkey,ServiceCategoryKey);
    setmodelData1(dataset1); 
    setShowModal1(true);
}

 
     
    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Service Requests by Categories'> </TitleBar>  

            <div className="assetage_chart" style={{width: "95%", height: "95%"}}>   
            

                     <ResponsiveContainer>   
                         <ResponsivePie 
                            onClick={handleClick} 
                            data={data}
                            id ="ServiceCategoryName" 
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0}
                            cornerRadius={3}
                            colors={{ scheme: "nivo" }}
                            borderWidth={1}
                            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }} 
                            animate={true}   
                            value = "WRCounts"  
                            activeOuterRadiusOffset={8}  
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }} 
                        />    
                    </ResponsiveContainer>      
 
 

                                <Modal className="popup"  title={modelData?.ServiceCategoryName|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >   

                                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                        <BarChart data={data1} 
                                            
                                            width={500}
                                            height={200}
                                        >
                                            <XAxis type="category"  dataKey="LocationName" style={{fontSize:11}} />
                                            {/* <YAxis type="number" dataKey="WRCount"/> */}
                                            <YAxis dataKey="WRCount" ticks={[10, 20, 30, 40, 50]} type="number" />
                                            <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                            <CartesianGrid strokeDasharray="0 0" />
                                            <Bar barSize={20} dataKey="WRCount" name="WR Count" fill="#c02b82"  onClick={handleClick1}>  
                                            {
                                                data.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                            }
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>  
                                </Modal>
 

                        <Modal className="popup_inner"  title={modelData1?.LocationName|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >  

                                <div className="assets-widget-list">

                                    <div className="item-list"> 

                                            <ul> 
                                                {
                                                    Object.keys(data2 || {}).map((m:any)=>{
                                                        return <li>  
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
    props.uxpContext.executeAction("ivivafacility","CWOCountbyZoneSerCat",{ServiceCategoryKey:ServiceCategoryKey, month:monthFromName(month)},{json:true}).then(res=>{ 
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



function handleClick(key:string,e:any){   
    console.log("location",e); 
    var dataset = e;
      var ServiceCategoryKey = ServiceCategories[key].key;//e.payload.ServiceCategoryKey;
      var month = e.payload.monthname;
    console.log("key12",ServiceCategoryKey); 

    console.log(dataset); 
    setmodelData({payload:{monthname:month,ServiceCategoryName:key,ServiceCategoryKey},ServiceCategoryName:key});

    getData1(ServiceCategoryKey, month);
    setShowModal(true);
}  
 
function handleClick1(e:any){
    
    console.log("hello",e); 
    var dataset1 = e;   

    var locationkey = e.payload.LocationKey;
    var ServiceCategoryKey = modelData.payload.ServiceCategoryKey;
    var month = modelData.payload.monthname;  
 
    getData2(locationkey,ServiceCategoryKey, month);
    setmodelData1(dataset1);  
    setShowModal1(true);
} 
// let ChartColors = [

//     '#598262',
//     '#C2D495',
//     '#DE391D',
//     '#4E1D1B',
//     '#4FA77C',
//     '#C2D495',
//     '#C7A54F',
//     '#1D8083',
//     '#067E8D',
//     '#EAD893',
//     '#F34C27',
//     '#F1E093',
//     '#369F8B',
//     '#D4D298',
//     '#675180',
//     '#A59EAC',
//     '#CBD2AC', 
// ]


let currentColor = 0;
function nextColor() {
    currentColor++;
    return COLORS[currentColor % COLORS.length];
}
 let ServiceCategories:any = {};
 function transformData(data:any) {
     let months:any = {};
     for(let row of data) {
         let month = row.monthname;
         if (!months[month]) {
             months[month] = {};
             
         }
         months[month][row.ServiceCategoryName] = row.CWOMCOUNT;
         if (!ServiceCategories[row.ServiceCategoryName]) {
             ServiceCategories[row.ServiceCategoryName] = {key:row.ServiceCategoryKey,color:nextColor()};
         }
     }
     let monthKeys = Object.keys(months);
     let x =  monthKeys.map(month => Object.assign({monthname:month},months[month]));
     console.log('TTT',x);
     return x;
 }

    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Work Orders per Month'></TitleBar>  

            <div className="assetage_chart">    

                            <ResponsiveContainer >  
                                <BarChart
                                    width={500}
                                    height={200}
                                    data={transformData(data)}
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                         <Tooltip content={({ active, payload, label })=>{
                                                    if (active && payload && payload.length) {
                                                        return (
                                                          <div className="custom-tooltip">
                                                            <p className="label">{`${label}`}</p>  
                                                            {
                                                                payload.filter(item => item.value>0).map(item=>(
                                                                    <div className='tt'>
                                                                       <div className='tt-block' style={{backgroundColor:item.color}} />
                                                                       <div className='tt-title'>{item.name}</div>
                                                                       <div className='tt-value'>{item.value}</div>
                                                                    </div>
                                                                ))
                                                            }
                                                          </div>
                                                        );
                                                      }
                                                    
                                                      return null;
                                         }} />
                                     <CartesianGrid strokeDasharray="0 0" />
                                    <XAxis dataKey="monthname" />
                                    <YAxis orientation="left" ticks={[0, 5, 10, 15, 20, 25]} />
                                    <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                    
                                    {
                                        Object.keys(ServiceCategories).map(key => (
                                     <Bar stackId="a" barSize={20} name={key}  onClick={(e:any)=>handleClick(key,e)} fill={ServiceCategories[key].color} dataKey={key} />

                                        ))
                                    }

                                  

                                 </BarChart> 
                                  </ResponsiveContainer> 
                                     
 
                           
 
                             <Modal className="popup" title={modelData?.ServiceCategoryName|| ''} show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  

                                           <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                            
                                            <BarChart data={data1} 
                                             
                                                width={500}
                                                height={200}
                                            >
                                                {/* <XAxis type="number" />
                                                <YAxis dataKey="LocationName" type="category" />
                                                <Tooltip />  */}
                                            <CartesianGrid strokeDasharray="0 0" />
                                            <XAxis type="category" dataKey="LocationName" style={{fontSize:10}} /> 
                                            <YAxis dataKey="LocationKey" ticks={[10, 20, 30, 40, 50]} type="number"  style={{fontSize:13}}/>
                                            <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                                <Bar barSize={20} name="CWO Count" dataKey="CWOCount" fill="#0d998a"  onClick={handleClick1}/> 
                                            </BarChart>  

                                           

                                        </ResponsiveContainer> 
    
                            </Modal>

                             <Modal className="popup_inner"  title={modelData1?.LocationName|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >   
   
                                <div className="assets-widget-list">

                                    <div className="item-list">   

                                            <ul> 
                                                {
                                                    Object.keys(data2 || {}).map((m:any)=>{
                                                        return <li>   
                                                            <label><a href={URL + data2[m].AssetKey} target="_blank">{data2[m].AssetID}</a></label>
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

    }, [startDate, endDate])  

 
     
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

    let [inputValue, setInputValue] = React.useState<string | null>("sample text");

    let [selected, setSelected] = React.useState<string | null>("op-1");

    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Upcoming Assets for Maintenance'>  
              


                 <FilterPanel
                                enableClear={inputValue?.length > 0 || selected != null}
                                onClear={() => { setInputValue(""); setSelected(null) }} >
                                <FormField className="no-padding mb-only">
                                  
                                    <DateRangePicker title=""
                                        startDate={startDate}
                                        endDate={endDate}
                                        closeOnSelect
                                        onChange={(newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd)}}
                                    /> 
                                </FormField>
                                
                            </FilterPanel> 
                            
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