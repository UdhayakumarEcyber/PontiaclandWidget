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
    isActive: string;

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
 
        const assetagedata = {
            "AssetAge": 12 
          };  
  
      return (
          <WidgetWrapper className="average_asset">
              <TitleBar title=''></TitleBar>   

              <div className="average-asset-data">  
                  <h4>AVERAGE ASSETS AGE </h4>
                  <h3>{assetagedata.AssetAge}<em className="years">YRS</em></h3> 
              </div>
                          
          </WidgetWrapper>
      )
  }; 

 const AssetAge: React.FunctionComponent<IWidgetProps> = (props) => { 
    
    let [showModal, setShowModal] = React.useState(false);  
    let[modelData, setmodelData] = React.useState<any>(null); 

    let [showModal1, setShowModal1] = React.useState(false);  
    let[modelData1, setmodelData1] = React.useState<any>(null); 
     
 
    let AssetAge = [
        {"LocationKey":"3","LocationName":"Car Park","AssetAge":"120"},
        {"LocationKey":"20","LocationName":"North A","AssetAge":"1"},
        {"LocationKey":"25","LocationName":"North B","AssetAge":"2"},
        {"LocationKey":"45","LocationName":"South B","AssetAge":"11"},
        {"LocationKey":"311","LocationName":"NiHonSt","AssetAge":"12"}
    ] 
 
    let AssetAge1 = [
        {"AssetCategoryKey":"1","AssetCategoryID":"FCU","AssetAge":"0"},
        {"AssetCategoryKey":"5","AssetCategoryID":"AHU","AssetAge":"1"},
        {"AssetCategoryKey":"6","AssetCategoryID":"PAHU","AssetAge":"1"},
        {"AssetCategoryKey":"7","AssetCategoryID":"DX","AssetAge":"0"},
        {"AssetCategoryKey":"8","AssetCategoryID":"PAU","AssetAge":"0"} 
    ]

    let AssetAge2 =  [
        {"AssetKey":"12","AssetID":"MW NA- AHU 3-N1","AssetAge":"1"},
        {"AssetKey":"13","AssetID":"MW NA- AHU 3-N2","AssetAge":"1"},
        {"AssetKey":"458","AssetID":"MW NA-AHU 3-N1","AssetAge":"1"},
        {"AssetKey":"459","AssetID":"MW NA-AHU 3-N2","AssetAge":"1"}
    ]
 
    function handleClick(e:any){           
        console.log("location",e); 
        var dataset = e;
        var LocationKey = e.payload.LocationKey; 
        var LocationName = e.payload.LocationName;
        console.log(dataset);   
        setmodelData(dataset); 
        setShowModal(true);
    }    
    
    function handleClick1(e:any){        
        console.log("hello",e); 
        var dataset1 = e;
        var AssetAge = e.payload.AssetAge;
        var AssetCategoryKey = e.payload.AssetCategoryKey; 
        var LocationKey = modelData.payload.LocationKey;
        setmodelData1(dataset1); 
        setShowModal1(true);

        //className1 += ' inner_list_toggle'; 
        document.getElementById("my_Popup").classList.add("my_Popup_toggle");  
        document.getElementById("innerPopup").classList.add("inner_list_toggle");
    } 

    function removehandleClick1(e:any){        
        document.getElementById("my_Popup").classList.remove("my_Popup_toggle");
        document.getElementById("innerPopup").classList.remove("inner_list_toggle"); 
    } 
  
    let MAX = 120;

    const tickArray = [0, Math.trunc(MAX/4), Math.trunc(MAX/2), Math.trunc(3*MAX/4), MAX];


    // const tickFormat = (x:any) => {
    //     if (x === 0) return 'START';
    //     if (x === 180) return 'END';
    //     return x;
    //    };

    return (
         <>
        <WidgetWrapper className="assetage_widget"> 


            <TitleBar title='Asset Age by Location (Zones)'> </TitleBar>  

            <div className="assetage_chart">   
  
                    <ResponsiveContainer width="100%">  

                            <BarChart
                                width={500}
                                height={200}
                                data={AssetAge}
                                margin={{
                                    top: 2, right: 0, left: 0, bottom: 2,
                                }}>
                                <CartesianGrid strokeDasharray="0 0" />
                                <XAxis dataKey="LocationName" name="Location Name"/> 
                                {/* <YAxis ticks={[30, 60, 90]} type="number" /> */}
                                {/* <YAxis interval={0} ticks={tickArray} type="number" /> */}
                                <YAxis type="number" ticks={tickArray}
 
  tickCount={3}
  interval={0} />
                                <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                <Bar barSize={20} onClick={handleClick} name="Asset Age" dataKey="AssetAge" fill="#FF8181" > 
                                    {
                                        AssetAge.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
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

                                <ResponsiveContainer width='100%' aspect={4.0 / 2.0} >
                                    <BarChart 
                                        //  layout="vertical" 
                                        width={500}
                                        height={200}
                                        data={AssetAge1} 
                                        margin={{
                                            top: 2, right: 0, left: 0, bottom: 2,
                                        }}>
                                            <CartesianGrid strokeDasharray="0 0" />
                                        <XAxis dataKey="AssetCategoryID"/> 
                                        <YAxis dataKey="AssetAge" ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]} type="number" />
                                        <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                        <Bar barSize={20} dataKey="AssetAge" name="Average Age" fill="#0d998a" onClick={handleClick1}/>  

                                        {/* <Bar barSize={20} dataKey="AssetAge" name="Average Age" fill="#0d998a" onClick={addClass}/>  */}
                                    </BarChart>
                                </ResponsiveContainer>    
                                                
                                <div className="inner_list" id="innerPopup"> 
                                    
                                    <div className="assets-widget-list"> 

                                        <div className="modal-sub_title"> {modelData1?.AssetCategoryID|| ''} Details</div> 

                                                <div className="item-list">
                                                   
                                                        <ul> 
                                                            {
                                                                Object.keys(AssetAge2 || {}).map((m:any)=>{ 

                                                                    return <li>  
                                                                        <a href={URL + AssetAge2[m].AssetKey} target="_blank">
                                                                            <label>{AssetAge2[m].AssetID}</label>  
                                                                            <span> {AssetAge2[m].AssetAge} <em className="years">YRS</em></span> 
                                                                        </a>
                                                                        
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


    let maintenanceData = [
        {"MWOKey":6,"MWOCode":"AHU-MW-03","AWOKey":24,"AWONo":"PWO20210831024","TargetStartDate":"2021-09-03T02:00:00.000Z"}
    ]

    let maintenanceData1 = [{"AssetKey":"11","AssetID":"MW SA- AHU 3-5"},
    {"AssetKey":"12","AssetID":"MW NA- AHU 3-N1"},
    {"AssetKey":"9","AssetID":"MW SA- AHU 3-3"},
    {"AssetKey":"10","AssetID":"MW SA- AHU 3-4"}]

    let [showModal, setShowModal] = React.useState(false);  
    let[modelData, setmodelData] = React.useState<any>(null);  
  
 
    function handleClick(e:any){  
       console.log("assetAWOKeyvalue",e); 
        var dataset = e; 
 
        var AWOKey =  e.AWOKey;

        console.log("key12",AWOKey);   
        console.log("assetAWOKey",dataset);   
        setmodelData(dataset); 
        setShowModal(true);

        document.getElementById("my_Popup").classList.add("my_Popup_toggle");  
       // document.getElementById("innerPopup").classList.add("inner_list_toggle");

    }   
 
    function removehandleClick1(e:any){        
        document.getElementById("my_Popup").classList.remove("my_Popup_toggle");
       // document.getElementById("innerPopup").classList.remove("inner_list_toggle"); 
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
    
                            {maintenanceData.map((item:any) => (
                                <> 
                                <li key={item.MWOKey} > 
                                    <a  onClick={() => {handleClick(item)} }>
                                        <label>{item.MWOCode}</label>   
                                        <span>{parseDate(item.TargetStartDate)}</span>
                                    </a>
                                </li>
                                </>
                            ))}
                        </ul>  
                    </div> 
 

                        <Modal className="popup"  title={modelData?.MWOCode || ''}  show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  


                        <div id="my_Popup">
                            <div className="popup-modal-header"> 
                                <div className="modal-title" onClick={removehandleClick1}>{modelData?.LocationName|| ''}</div>   
                                {/* <div className="modal-sub_title"> <p></p> {modelData1?.AssetCategoryID|| ''}</div>     */}
                            </div> 

                                <div className="assets-widget-list details_widget-list"> 

                                    {/* <div className="modal-sub_title"> {modelData?.LocationName|| ''} Details</div>  */}

                                    <div className="item-list"  style={{backgroundColor:"transparent"}}>    
                                            <ul> 
                                                {
                                                    Object.keys(maintenanceData1 || {}).map((m:any)=>{
                                                        return <li style={{width:"100%"}}>  
                                                            <a href={URL + maintenanceData1[m].AssetKey} target="_blank">
                                                                <label>{maintenanceData1[m].AssetID}</label> 
                                                            </a> 
                                                        </li>
                                                    })
                                                }  
                                            </ul>  

                                        </div>
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
 

    function handleClick(e:any){   
        console.log("location",e); 
        var dataset = e;
          var LocationKey = e.payload.LocationKey;
          var locationName = e.payload.LocationName;
        console.log("key12",LocationKey);  
        console.log(dataset);   
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
        setmodelData1(dataset1); 
        setShowModal1(true);
        
        document.getElementById("my_Popup").classList.add("my_Popup_toggle");  
        document.getElementById("innerPopup").classList.add("inner_list_toggle");
    } 

    function removehandleClick1(e:any){        
        document.getElementById("my_Popup").classList.remove("my_Popup_toggle");
        document.getElementById("innerPopup").classList.remove("inner_list_toggle"); 
    } 

    let totdata = [
        {"LocationKey":"3","LocationName":"Car Park","AssetCount":"0"},
        {"LocationKey":"20","LocationName":"North A","AssetCount":"81"},
        {"LocationKey":"25","LocationName":"North B","AssetCount":"53"},
        {"LocationKey":"28","LocationName":"Park n Dine","AssetCount":"0"},
        {"LocationKey":"318","LocationName":"PND","AssetCount":"65"},
        {"LocationKey":"351","LocationName":"GHALL","AssetCount":"6"}
    ]

  let totdata1 =  [
        {"AssetCategoryKey":"1","AssetCategoryID":"FCU","AssetCount":"73"},
        {"AssetCategoryKey":"5","AssetCategoryID":"AHU","AssetCount":"4"},
        {"AssetCategoryKey":"6","AssetCategoryID":"PAHU","AssetCount":"4"},
        {"AssetCategoryKey":"7","AssetCategoryID":"DX","AssetCount":"0"},
        {"AssetCategoryKey":"8","AssetCategoryID":"PAU","AssetCount":"0"}
    ] 
   let totdata2 = [
        {"AssetKey":"173","AssetID":"MW NA- FCU 01 - 329"},
        {"AssetKey":"174","AssetID":"MW NA- FCU 01 - 328"},
        {"AssetKey":"468","AssetID":"MW NA-FCU 01-328"},
        {"AssetKey":"469","AssetID":"MW NA-FCU 01-329"},
        {"AssetKey":"466","AssetID":"MW NA-FCU 01-326"},
        {"AssetKey":"175","AssetID":"MW NA- FCU 01 - 326"},
        {"AssetKey":"460","AssetID":"MW NA-FCU 01-102"},
        {"AssetKey":"464","AssetID":"MW NA-FCU 01-316"},
        {"AssetKey":"471","AssetID":"MW NA-FCU 01-345"}
    ] 

    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Total Number of Asset by Location (Zone)'></TitleBar>  

            <div className="assetage_chart">    
                            <ResponsiveContainer width="100%">  

                                <BarChart
                                    width={800}
                                    height={1200}
                                    data={totdata}
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                    <CartesianGrid strokeDasharray="0 0" />
                                    <XAxis  type="category" dataKey="LocationName"  name="Location Name"/> 
                                    <YAxis ticks={[30, 60, 90, 120, 150]} type="number" />
                                    <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                    <Bar barSize={20} onClick={handleClick} name="Asset Count" dataKey="AssetCount" fill="#0d998a"> 
                                         {
                                            totdata.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                        }
                                    </Bar> 
                                </BarChart>  

                            </ResponsiveContainer> 

                            <Modal className="popup"  title="" show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >   
                                
                                {/* <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                    <BarChart  
                                        width={500}
                                        height={200}
                                        data={totdata1} 
                                        margin={{
                                            top: 2, right: 0, left: 0, bottom: 2,
                                        }}>
                                             <CartesianGrid strokeDasharray="0 0" />
                                        <XAxis dataKey="AssetCategoryID"/> 
                                        <YAxis  dataKey="AssetCount" ticks={[20, 40, 60, 80, 100]} type="number" />
                                        <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                        <Bar barSize={20} dataKey="AssetCount" name="Asset Count" fill="#1195cc" onClick={handleClick1}/> 
                                    </BarChart>
                                </ResponsiveContainer>    */}

                        <div id="my_Popup">
                            <div className="popup-modal-header"> 
                                <div className="modal-title" onClick={removehandleClick1}>{modelData?.LocationName|| ''}</div>   
                                <div className="modal-sub_title"> <p></p> {modelData1?.AssetCategoryID|| ''}</div>    
                            </div> 

                                <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                    <BarChart  
                                        width={500}
                                        height={200}
                                        data={totdata1} 
                                        margin={{
                                            top: 2, right: 0, left: 0, bottom: 2,
                                        }}>
                                             <CartesianGrid strokeDasharray="0 0" />
                                        <XAxis dataKey="AssetCategoryID"/> 
                                        <YAxis  dataKey="AssetCount" ticks={[20, 40, 60, 80, 100]} type="number" />
                                        <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                        <Bar barSize={20} dataKey="AssetCount" name="Asset Count" fill="#1195cc" onClick={handleClick1}/> 
                                    </BarChart>
                                </ResponsiveContainer>   
                                                
                                <div className="inner_list" id="innerPopup">  

                                        <div className="assets-widget-list"> 

                                        <div className="modal-sub_title"> {modelData1?.AssetCategoryID|| ''} Details</div> 

                                            <div className="item-list item-list-nav_half">  
                                                    <ul> 
                                                        {
                                                            Object.keys(totdata2 || {}).map((m:any)=>{
                                                                return <li>  
                                                                    <a href={URL + totdata2[m].AssetKey} target="_blank">
                                                                        <label>{totdata2[m].AssetID}</label>  
                                                                    </a> 
                                                                </li>
                                                            })
                                                        }  
                                                    </ul>   
                                                </div>
                                        </div>  
                                    </div>  

                                </div> 
    
                            </Modal>
 
                        {/* 
                             <Modal className="popup_inner" title={modelData1?.AssetCategoryID|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >  

                                <div className="assets-widget-list"> 
                                    <div className="item-list item-list-nav_half">  
                                            <ul> 
                                                {
                                                    Object.keys(totdata2 || {}).map((m:any)=>{
                                                        return <li> 
                                                            <label><a href={URL + totdata2[m].AssetKey} target="_blank">{totdata2[m].AssetID}</a></label>  
                                                             
                                                        </li>
                                                    })
                                                }  
                                            </ul>   
                                        </div>
                                </div> 
                            </Modal>   */}

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

 
let serviceRequestData = [
    {"ServiceCategoryKey":"1","ServiceCategoryName":"Electrical","WRCounts":"5"},
    {"ServiceCategoryKey":"2","ServiceCategoryName":"ACMV","WRCounts":"4"},
    {"ServiceCategoryKey":"3","ServiceCategoryName":"Civil","WRCounts":"2"},
    {"ServiceCategoryKey":"4","ServiceCategoryName":"Access Control System","WRCounts":"1"}
]

let serviceRequestData1 = [
    {"LocationKey":"3","LocationName":"Car Park","WRCount":"0"},
    {"LocationKey":"6","LocationName":"GREAT Hall","WRCount":"8"},
    {"LocationKey":"9","LocationName":"NiHon Street","WRCount":"0"},
    {"LocationKey":"311","LocationName":"NiHonSt","WRCount":"10"},
    {"LocationKey":"318","LocationName":"PND","WRCount":"0"},
    {"LocationKey":"351","LocationName":"GHALL","WRCount":"0"}    
]

let serviceRequestData2 = [
    {"AssetKey":"617","AssetID":"MW WB-FCU-02-10-4","WRCount":"1"}
]


function handleClick(node:any, event:any){   
    console.log("peChart",node, event); 
   var dataset = node.data; 
        var ServiceCategoryKey = dataset.ServiceCategoryKey;   
        console.log(dataset);  
        setmodelData(dataset);  
        setShowModal(true); 
}  
 
function handleClick1(e:any){ 
    console.log("hello",e); 
    var dataset1 = e;  
    var ServiceCategoryKey = modelData.ServiceCategoryKey; 
    var locationkey = dataset1.LocationKey;  
    console.log("locationkey", locationkey, ServiceCategoryKey);  
    setmodelData1(dataset1); 
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
            <TitleBar title='Service Requests by Categories'> </TitleBar>  

            <div className="assetage_chart" style={{width: "95%", height: "95%"}}>    
                            <ResponsiveContainer>   
                                <ResponsivePie 
                                    onClick={handleClick} 
                                    data={serviceRequestData}
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
 

                                <Modal className="popup" title=""  show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >   

                                    {/* <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                        <BarChart data={serviceRequestData1}  
                                            width={500}
                                            height={200}
                                        >
                                             <CartesianGrid strokeDasharray="0 0" />
                                            <XAxis type="category"  dataKey="LocationName" style={{fontSize:11}} /> 
                                            <YAxis dataKey="WRCount" ticks={[10, 20, 30, 40, 50]} type="number" />
                                            <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                            <Bar barSize={20} dataKey="WRCount" name="WR Count" fill="#c02b82"  onClick={handleClick1}>  
                                            {
                                                serviceRequestData1.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                            }
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>   */}


                                    <div id="my_Popup">

                                        <div className="popup-modal-header"> 
                                            <div className="modal-title" onClick={removehandleClick1}>{modelData?.ServiceCategoryName|| ''}</div>   
                                            <div className="modal-sub_title"> <p></p> {modelData1?.LocationName|| ''}</div>    
                                        </div> 

                                        <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                            <BarChart data={serviceRequestData1}  
                                                width={500}
                                                height={200}
                                            >
                                                <CartesianGrid strokeDasharray="0 0" />
                                                <XAxis type="category"  dataKey="LocationName" style={{fontSize:11}} /> 
                                                <YAxis dataKey="WRCount" ticks={[10, 20, 30, 40, 50]} type="number" />
                                                <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" />
                                                <Bar barSize={20} dataKey="WRCount" name="WR Count" fill="#c02b82"  onClick={handleClick1}>  
                                                {
                                                    serviceRequestData1.map((entry:any, index:any) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                                }
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>   
                                                
                                <div className="inner_list" id="innerPopup">  

                                <div className="assets-widget-list"> 

                                    <div className="modal-sub_title"> {modelData1?.LocationName|| ''} Details</div> 

                                        <div className="item-list">  
                                                <ul> 
                                                    {
                                                        Object.keys(serviceRequestData2 || {}).map((m:any)=>{
                                                            return <li>  
                                                                <a href={URL + serviceRequestData2[m].AssetKey} target="_blank">
                                                                    <label>{serviceRequestData2[m].AssetID}</label>   
                                                                    <span>{serviceRequestData2[m].WRCount}</span> 
                                                                </a>  
                                                            </li>
                                                        })
                                                    }  
                                                </ul>   
                                            </div>
                                        </div>
                                    </div>  

                                </div> 


                                </Modal>
 

                        {/* <Modal className="popup_inner" title={modelData1?.LocationName|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >  

                                <div className="assets-widget-list"> 
                                    <div className="item-list">  
                                            <ul> 
                                                {
                                                    Object.keys(serviceRequestData2 || {}).map((m:any)=>{
                                                        return <li>  
                                                              <label><a href={URL + serviceRequestData2[m].AssetKey} target="_blank">{serviceRequestData2[m].AssetID}</a></label>   
                                                            <span>{serviceRequestData2[m].WRCount}</span>   
                                                        </li>
                                                    })
                                                }  
                                            </ul>   
                                        </div>
                                </div> 
                            </Modal>   */}

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

 
let workOrderMonthData = [
    {"monthname":"January","ServiceCategoryName":"Access Control System", "ServiceCategoryKey":"4" ,"CWOMCOUNT":"10"},
    {"monthname":"January","ServiceCategoryName":"ACMV", "ServiceCategoryKey":"5" ,"CWOMCOUNT":"0"},
    {"monthname":"January","ServiceCategoryName":"Audio Visual Systems", "ServiceCategoryKey":"6", "CWOMCOUNT":"8"},
    {"monthname":"January","ServiceCategoryName":"Building Management Systems", "ServiceCategoryKey":"7" ,"CWOMCOUNT":"2"},
    {"monthname":"September","ServiceCategoryName":"Building Security", "ServiceCategoryKey":"8" ,"CWOMCOUNT":"1"},
    {"monthname":"September","ServiceCategoryName":"CCTV", "ServiceCategoryKey":"9", "CWOMCOUNT":"10" }
]

let workOrderMonthData1 = [
    {"LocationKey":"3","LocationName":"Car Park","CWOCount":"0"},
    {"LocationKey":"45","LocationName":"South B","CWOCount":"3"},
    {"LocationKey":"311","LocationName":"NiHonSt","CWOCount":"10"},
    {"LocationKey":"318","LocationName":"PND","CWOCount":"12"},
    {"LocationKey":"351","LocationName":"GHALL","CWOCount":"0"}
]

let workOrderMonthData2 = [{"AssetKey":"1","AssetID":"RAHU_001","CWOCount":"1"}]

function handleClick(key:string,e:any){   
    console.log("location",e); 
    var dataset = e;
      var ServiceCategoryKey = ServiceCategories[key].key;//e.payload.ServiceCategoryKey;
      var month = e.payload.monthname;
    console.log("key12",ServiceCategoryKey); 

    console.log(dataset); 
    setmodelData({payload:{monthname:month,ServiceCategoryName:key,ServiceCategoryKey},ServiceCategoryName:key}); 
    setShowModal(true);
}  
 
function handleClick1(e:any){
    
    console.log("hello",e); 
    var dataset1 = e;    
    var locationkey = e.payload.LocationKey;
    var ServiceCategoryKey = modelData.payload.ServiceCategoryKey;
    var month = modelData.payload.monthname;   
    setmodelData1(dataset1);  
    setShowModal1(true);

    document.getElementById("my_Popup").classList.add("my_Popup_toggle");  
    document.getElementById("innerPopup").classList.add("inner_list_toggle");
} 

function removehandleClick1(e:any){        
    document.getElementById("my_Popup").classList.remove("my_Popup_toggle");
    document.getElementById("innerPopup").classList.remove("inner_list_toggle"); 
} 
  

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
                                    data={transformData(workOrderMonthData)}
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
                           
 
                             <Modal className="popup" title="" show={showModal && modelData!= null} onOpen={() => { }} onClose={() => {setShowModal(false); setmodelData(null)}} >  

                                           {/* <ResponsiveContainer width='100%' aspect={4.0 / 2.0}> 
                                            <BarChart data={workOrderMonthData1}  
                                                width={500}
                                                height={200}
                                            > 
                                            <CartesianGrid strokeDasharray="0 0" />
                                            <XAxis type="category" dataKey="LocationName" style={{fontSize:10}} /> 
                                            <YAxis dataKey="LocationKey" ticks={[10, 20, 30, 40, 50]} type="number"  style={{fontSize:13}}/>
                                            <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" /> 
                                                <Bar barSize={20} name="CWO Count" dataKey="CWOCount" fill="#0d998a"  onClick={handleClick1}/> 
                                            </BarChart>   
                                        </ResponsiveContainer>  */} 
                                        

                                    <div id="my_Popup">

                                        <div className="popup-modal-header"> 
                                            <div className="modal-title" onClick={removehandleClick1}>{modelData?.ServiceCategoryName|| ''}</div>   
                                            <div className="modal-sub_title"> <p></p> {modelData1?.LocationName|| ''}</div>    
                                        </div> 

                                        <ResponsiveContainer width='100%' aspect={4.0 / 2.0}> 
                                            <BarChart data={workOrderMonthData1}  
                                                width={500}
                                                height={200}
                                            > 
                                            <CartesianGrid strokeDasharray="0 0" />
                                            <XAxis type="category" dataKey="LocationName" style={{fontSize:10}} /> 
                                            <YAxis dataKey="LocationKey" ticks={[10, 20, 30, 40, 50]} type="number"  style={{fontSize:13}}/>
                                            <Tooltip labelClassName="custom-tooltip-lable" wrapperClassName="custom-tooltip" /> 
                                                <Bar barSize={20} name="CWO Count" dataKey="CWOCount" fill="#0d998a"  onClick={handleClick1}/> 
                                            </BarChart>   
                                        </ResponsiveContainer>  
                                                
                                        <div className="inner_list" id="innerPopup">  

                                            <div className="assets-widget-list"> 

                                            <div className="modal-sub_title"> {modelData1?.LocationName|| ''} Details</div> 

                                                <div className="item-list">   
                                                        <ul> 
                                                            {
                                                                Object.keys(workOrderMonthData2 || {}).map((m:any)=>{
                                                                    return <li>  
                                                                        <a href={URL + workOrderMonthData2[m].AssetKey} target="_blank"> 
                                                                            <label>{workOrderMonthData2[m].AssetID}</label>
                                                                            <span> {workOrderMonthData2[m].CWOCount}</span> 
                                                                        </a>
                                                                    </li>
                                                                })
                                                            }   
                                                                
                                                        </ul> 

                                                    </div>
                                               </div> 
                                        </div>  

                                        </div>  
    
                            </Modal>

                             {/* <Modal className="popup_inner" title={modelData1?.LocationName|| ''} show={showModal1 && modelData1!= null} onOpen={() => { }} onClose={() => {setShowModal1(false); setmodelData1(null)}} >   
   
                                <div className="assets-widget-list"> 
                                    <div className="item-list">   
                                            <ul> 
                                                {
                                                    Object.keys(workOrderMonthData2 || {}).map((m:any)=>{
                                                        return <li>   
                                                            <label><a href={URL + workOrderMonthData2[m].AssetKey} target="_blank">{workOrderMonthData2[m].AssetID}</a></label>
                                                            <span> {workOrderMonthData2[m].CWOCount}</span> 
                                                        </li>
                                                    })
                                                }   
                                                       
                                            </ul> 

                                        </div>
                                    </div>   
                            </Modal>  */} 

                    </div> 
                                
                </WidgetWrapper>
 
            </>
    )
};
   
const UpcomingAssets: React.FunctionComponent<IWidgetProps> = (props) => {   

    let [startDate, setStartDate] = React.useState<string | Date>(new Date()); 
    let [endDate, setEndDate] = React.useState<string | Date>(addDays(90));  
    
    let upcomingAssetsData =  [
        {"AssetKey":11,"AssetID":"MW SA- AHU 3-5","AWOKey":24,"AWONo":"PWO20210831024","TargetStartDate":"2021-09-03T02:00:00.000Z"},
        {"AssetKey":12,"AssetID":"MW NA- AHU 3-N1","AWOKey":24,"AWONo":"PWO20210831024","TargetStartDate":"2021-09-03T02:00:00.000Z"},
        {"AssetKey":9,"AssetID":"MW SA- AHU 3-3","AWOKey":24,"AWONo":"PWO20210831024","TargetStartDate":"2021-09-03T02:00:00.000Z"},
        {"AssetKey":10,"AssetID":"MW SA- AHU 3-4","AWOKey":24,"AWONo":"PWO20210831024","TargetStartDate":"2021-09-03T02:00:00.000Z"}
    ] 
     
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
                        {upcomingAssetsData.map((item:any) => (  
                            <li key={item.AssetID}> 
                               <a href={URL + item.AssetKey} target="_blank">
                                    <label>{item.AssetID}</label>  
                                    <span>{parseDate(item.TargetStartDate)}</span> 
                                </a>  
                            </li>
                        ))}
                    </ul> 
                </div>
                        
        </WidgetWrapper>
    )
}; 

const ProblematicAssets: React.FunctionComponent<IWidgetProps> = (props) => {  

    let problematicAssetsData = [{"AssetKey":"1","AssetID":"RAHU_001","TotalCases":"1"}]
 
    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Top 5 Highest CWO/WR per Asset'></TitleBar>

            <div className="item-list">  
                    <ul>
                        {problematicAssetsData.map((item:any) => (
                            <li key={item.AssetID}> 
                                {/* <label>{item.AssetID}</label>  */}
                                <a href={URL +item.AssetKey} target="_blank">
                                    <label>{item.AssetID}</label> 
                                    <span>{item.TotalCases}</span> 
                                </a> 
                            </li>
                        ))}
                    </ul> 

                </div>
                        
        </WidgetWrapper>
    )
};

 
const TopAgedAssets: React.FunctionComponent<IWidgetProps> = (props) => { 

  let topAgedAssetsData =  [
        {"AssetKey":"7","AssetID":"MW SA- AHU 3-1","InstalledDate":"19960101:000000","InstalledLocationKey":"301","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"6","AssetID":"MW SA- AHU 2-3","InstalledDate":"19960101:000000","InstalledLocationKey":"298","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"5","AssetID":"MW SA- AHU 2-2","InstalledDate":"19960101:000000","InstalledLocationKey":"298","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"4","AssetID":"MW SA- AHU 2-1","InstalledDate":"19960101:000000","InstalledLocationKey":"298","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"3","AssetID":"MW SA- AHU 1-2","InstalledDate":"19960101:000000","InstalledLocationKey":"296","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"}
    ] 
 
    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Top 5 Aged Assets'></TitleBar>

              <div className="item-list">  
                    <ul>
                        {topAgedAssetsData.map((item:any) => (
                            <li key={item.AssetID}> 
                               <a href={URL + item.AssetKey} target="_blank">
                                    <label>{item.AssetID}</label> 
                                    <span>{item.Age} <em className="years">YRS</em> </span>  
                                </a>
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