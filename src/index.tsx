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

    const assetagedata = {
        "AssetAge": 12 
      };  

    return (
        <WidgetWrapper className="average_asset">
            <TitleBar title='Average age of Assets'></TitleBar>  

            <div className="average-asset-data">  
                <h4>Average age </h4> <h3>{assetagedata.AssetAge} <span>YRS</span></h3>
            </div>
                        
        </WidgetWrapper>
    )
};
 

const AssetAge: React.FunctionComponent<IWidgetProps> = (props) => { 
    
    let [showModal, setShowModal] = React.useState(false);  
    let[modelData, setmodelData] = React.useState<any>(null);

    let [showModal1, setShowModal1] = React.useState(false);  
    let[modelData1, setmodelData1] = React.useState<any>(null);


    const AssetAgedata = [
        {"LocationKey":"3","LocationName":"Car Park","Asset Age":""},
        {"LocationKey":"20","LocationName":"North A","Asset Age":"1"},
        {"LocationKey":"25","LocationName":"North B","Asset Age":"2"},
        {"LocationKey":"45","LocationName":"South B","Asset Age":"11"},
        {"LocationKey":"311","LocationName":"NiHonSt","Asset Age":"12"}
    ]

    const AssetAgeadditionaldata =   [
        {"AssetCategoryKey":"1","AssetCategoryID":"FCU","Asset Age":"0"},
        {"AssetCategoryKey":"5","AssetCategoryID":"AHU","Asset Age":"1"},
        {"AssetCategoryKey":"6","AssetCategoryID":"PAHU","Asset Age":"1"},
        {"AssetCategoryKey":"7","AssetCategoryID":"DX","Asset Age":"0"},
        {"AssetCategoryKey":"8","AssetCategoryID":"PAU","Asset Age":"0"}
    ] 

   const AssetAgesubadditionaldata = [
        {"AssetKey":"12","AssetID":"MW NA- AHU 3-N1","AssetAge":"1"},
        {"AssetKey":"13","AssetID":"MW NA- AHU 3-N2","AssetAge":"1"},
        {"AssetKey":"458","AssetID":"MW NA-AHU 3-N1","AssetAge":"1"},
        {"AssetKey":"459","AssetID":"MW NA-AHU 3-N2","AssetAge":"1"}
    ]
  

    function handleClick(e:any){ 
        setmodelData(true);
        setShowModal(true);
    } 

    function handleClick1(e:any){ 
        setmodelData1(true);
        setShowModal1(true);
    } 
 
 
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
                                        data={AssetAgedata}
                                        margin={{
                                            top: 2, right: 0, left: 0, bottom: 2,
                                        }}>
                                        <CartesianGrid strokeDasharray="0 0" />
                                        <XAxis dataKey="LocationName" />
                                        <YAxis orientation="left" />
                                        <Tooltip />
                                    <Bar barSize={20} onClick={handleClick} dataKey="Asset Age" fill="#FF8181" /> 
                                </BarChart>  

                            </ResponsiveContainer>


                            <Modal show={showModal} onOpen={() => { }} onClose={() => setShowModal(false)}> 

                            <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                            <BarChart 
                                                layout="vertical" 
                                                width={500}
                                                height={200}
                                                data={AssetAgeadditionaldata} 
                                                margin={{
                                                    top: 2, right: 0, left: 0, bottom: 2,
                                                }}>
                                                <XAxis type="number" />
                                                <YAxis dataKey="AssetCategoryID" type="category" />
                                                <Tooltip /> 
                                                <Bar barSize={20} dataKey="Asset Age" fill="#0d998a"  onClick={handleClick1}/> 
                                            </BarChart>
                                        </ResponsiveContainer> 
    
                            </Modal>

                            <Modal show={showModal1} onOpen={() => { }} onClose={() => setShowModal1(false)}> 
                                <div className="assets-widget-list">

                                    <div className="item-list">  
                                            <ul>
                                                {AssetAgesubadditionaldata.map((item) => (
                                                    <li key={item.AssetID}> 

                                                    <a href="url(url)">
                                                        <label>{item.AssetID}</label> 
                                                        <span>{item.AssetAge}</span>    
                                                    </a> 
                                                       
                                                    </li>
                                                ))}
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
    
    const maintenancedrilldown = [
        {"AssetKey":"11","AssetID":"MW SA- AHU 3-5"},
        {"AssetKey":"12","AssetID":"MW NA- AHU 3-N1"},
        {"AssetKey":"9","AssetID":"MW SA- AHU 3-3"},
        {"AssetKey":"10","AssetID":"MW SA- AHU 3-4"} 
    ]

    function handleClick(e:any){ 
        setmodelData(true);
        setShowModal(true);
    } 
    // export class MaintenanceDetails extends React.Component<IWidgetProps, IWidgetState> { 

        const maintenancedetailslist =  
        [
            {"MWOKey":6,"MWOCode":"AHU-MW-03","AWOKey":24,"AWONo":"PWO20210831024","TargetStartDate":"2021-09-03T02:00:00.000Z"}
        ]


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
    
                            {maintenancedetailslist.map((item) => (
                                <>
                               
                                <li key={item.MWOKey}  onClick={handleClick}> 
                                    <label>{item.MWOCode}</label>   
                                    <span>{parseDate(item.TargetStartDate)}</span>
                                </li>
                                </>
                            ))}
                        </ul> 
    
                    </div> 

                    <Modal show={showModal} onOpen={() => { }} onClose={() => setShowModal(false)}> 
                                <div className="assets-widget-list">

                                    <div className="item-list">  
                                            <ul>
                                                {maintenancedrilldown.map((item) => (
                                                    <li key={item.AssetID}> 
                                                        <label>{item.AssetID}</label>  
                                                    </li>
                                                ))}
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


    const totalNumberAgedata =  
    [
        {"LocationKey":"3","LocationName":"Car Park","Asset Count":"0"},
        {"LocationKey":"20","LocationName":"North A","Asset Count":"81"},
        {"LocationKey":"25","LocationName":"North B","Asset Count":"53"},
        {"LocationKey":"28","LocationName":"Park n Dine","Asset Count":"0"},
        {"LocationKey":"318","LocationName":"PND","Asset Count":"65"},
        {"LocationKey":"351","LocationName":"GHALL","Asset Count":"6"}
    ] 

    const totalNumberAgeadditionaldata = [
        {"AssetCategoryKey":"1","AssetCategoryID":"FCU","Asset Count":"73"},
        {"AssetCategoryKey":"5","AssetCategoryID":"AHU","Asset Count":"4"},
        {"AssetCategoryKey":"6","AssetCategoryID":"PAHU","Asset Count":"4"},
        {"AssetCategoryKey":"7","AssetCategoryID":"DX","Asset Count":"0"},
        {"AssetCategoryKey":"8","AssetCategoryID":"PAU","Asset Count":"0"}
    ]   

   const totalNumbersubAgeadditionaldata = 
    [
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
 
  

    function handleClick(e:any){ 
        setmodelData(true);
        setShowModal(true);
    } 

    function handleClick1(e:any){ 
        setmodelData1(true);
        setShowModal1(true);
    } 
 
 
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
                                    data={totalNumberAgedata}
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                    <CartesianGrid strokeDasharray="0 0" />
                                    <XAxis dataKey="LocationName" />
                                    <YAxis orientation="left" />
                                    <Tooltip />
                                    <Bar barSize={20} onClick={handleClick} dataKey="Asset Count" fill="#0d998a" /> 
                                </BarChart>  

                            </ResponsiveContainer>


                            <Modal show={showModal} onOpen={() => { }} onClose={() => setShowModal(false)}> 

                                           <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                            <BarChart data={totalNumberAgeadditionaldata} 
                                                layout="vertical" 
                                                width={500}
                                                height={200}
                                            >
                                                <XAxis type="number" />
                                                <YAxis dataKey="AssetCategoryID" type="category" />
                                                <Tooltip /> 
                                                <Bar barSize={20} dataKey="Asset Count" fill="#0d998a"  onClick={handleClick1}/> 
                                            </BarChart>
                                        </ResponsiveContainer> 
    
                            </Modal>

                            <Modal show={showModal1} onOpen={() => { }} onClose={() => setShowModal1(false)}> 
                                <div className="assets-widget-list">

                                    <div className="item-list">  
                                            <ul>
                                                {totalNumbersubAgeadditionaldata.map((item) => (
                                                    <li key={item.AssetID}> 
                                                        <label>{item.AssetID}</label>  
                                                    </li>
                                                ))}
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


    const serviceRequestData =   
    [
        {
          "id": "Electrical",
          "label": "Electrical",
          "value": 5,
          "color": "hsl(251, 29%, 40%)"
        },
        {
          "id": "ACMV",
          "label": "ACMV",
          "value": 4,
          "color": "#0d998a"
        },
        {
          "id": "Civil",
          "label": "Civil",
          "value": 2,
          "color": "#c02b82"
        },
        {
          "id": "Access Control System",
          "label": "Access Control System",
          "value": 1,
          "color": "hsl(96, 70%, 50%)"
        } 
      ] 

    const serviceRequestadditonalData =  
     [
        {"LocationKey":"3","LocationName":"Car Park","WRCount":"0"},
        {"LocationKey":"6","LocationName":"GREAT Hall","WRCount":"8"},
        {"LocationKey":"9","LocationName":"NiHon Street","WRCount":"0"},
        {"LocationKey":"311","LocationName":"NiHonSt","WRCount":"10"},
        {"LocationKey":"318","LocationName":"PND","WRCount":"0"},
        {"LocationKey":"351","LocationName":"GHALL","WRCount":"0"}
     ]

   const serviceRequestsubadditonalData = 
    [ 
       {"AssetKey":"617","AssetID":"MW WB-FCU-02-10-4","WRCount":"1"}
    ]
   
    function handleClick(e:any){ 
        setmodelData(true);
        setShowModal(true);
    } 

    function handleClick1(e:any){ 
        setmodelData1(true);
        setShowModal1(true);
    } 
 
 
    return (
         <>
        <WidgetWrapper className="assetage_widget">
            <TitleBar title='Service Request/Work Orders by Categories'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>  

            <div className="assetage_chart" style={{width: "95%", height: "95%"}}>   

                        <ResponsivePie
                            data={serviceRequestData}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.7}
                            padAngle={0.2}
                            cornerRadius={1}
                            activeOuterRadiusOffset={8}
                            borderWidth={0}
                            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }} 
                            onClick={handleClick} 
                            
                            fill={[
                                {
                                    match: {
                                        id: 'Electrical'
                                    },
                                    id: ''
                                },
                                {
                                    match: {
                                        id: 'ACMV'
                                    },
                                    id: ''
                                },
                                {
                                    match: {
                                        id: 'Civil'
                                    },
                                    id: ''
                                },
                                {
                                    match: {
                                        id: 'Access Control System'
                                    },
                                    id: ''
                                } 
                            ]}
                    
                        /> 
         

                        <Modal show={showModal} onOpen={() => { }} onClose={() => setShowModal(false)}> 

                                         <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                        <BarChart data={serviceRequestadditonalData} 
                                            layout="vertical" 
                                            width={500}
                                            height={200}
                                        >
                                            <XAxis type="number" />
                                            <YAxis dataKey="LocationName" type="category" />
                                            <Tooltip /> 
                                            <Bar barSize={20} dataKey="LocationKey" fill="#c02b82"  onClick={handleClick1}/> 
                                        </BarChart>
                                    </ResponsiveContainer> 

                        </Modal>

                        <Modal show={showModal1} onOpen={() => { }} onClose={() => setShowModal1(false)}> 
                            <div className="assets-widget-list">

                                <div className="item-list">  
                                        <ul>
                                            {serviceRequestsubadditonalData.map((item) => (
                                                <li key={item.AssetID}> 
                                                    <label>{item.AssetID}</label>  
                                                    <span>{item.WRCount}</span>
                                                </li>
                                            ))}
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


    const workorderdata =  
    [
        {"monthname":"January","ServiceCategoryName":"Access Control System", "ServiceCategoryKey":"4" ,"CWOMCOUNT":"10"},
        {"monthname":"Fabruary","ServiceCategoryName":"ACMV", "ServiceCategoryKey":"5" ,"CWOMCOUNT":"0"},
        {"monthname":"March","ServiceCategoryName":"Audio Visual Systems", "ServiceCategoryKey":"6", "CWOMCOUNT":"8"},
        {"monthname":"April","ServiceCategoryName":"Building Management Systems", "ServiceCategoryKey":"7", "CWOMCOUNT":"0"},
        {"monthname":"May","ServiceCategoryName":"Building Security", "ServiceCategoryKey":"8" ,"CWOMCOUNT":"0"},
        {"monthname":"June","ServiceCategoryName":"CCTV", "ServiceCategoryKey":"9" }
    ] 

    const workorderadditonalData = 
    [
        {"LocationKey":"3","LocationName":"Car Park","CWO Count":"0"},
        {"LocationKey":"45","LocationName":"South B","CWO Count":"3"},
        {"LocationKey":"311","LocationName":"NiHonSt","CWO Count":"10"},
        {"LocationKey":"318","LocationName":"PND","CWO Count":"12"},
        {"LocationKey":"351","LocationName":"GHALL","CWO Count":"0"}
    ] 
     

   const workordersubadditonalData = 
    [
        {"AssetKey":"1","AssetID":"RAHU_001","CWOCount":"1"}
    ] 

    function handleClick(e:any){ 
        setmodelData(true);
        setShowModal(true);
    } 

    function handleClick1(e:any){ 
        setmodelData1(true);
        setShowModal1(true);
    } 


    const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]
 
 
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
                                    data={workorderdata}
                                    margin={{
                                        top: 2, right: 0, left: 0, bottom: 2,
                                    }}>
                                    <CartesianGrid strokeDasharray="0 0" />
                                    <XAxis dataKey="monthname" />
                                    <YAxis orientation="left" />
                                    <Tooltip />
                                    {/* <Bar barSize={20} onClick={handleClick} dataKey="CWOMCOUNT" fill="#2949F7A5" />  */}

                                    <Bar stackId="a" barSize={20} onClick={handleClick} fill="#8884d8" dataKey="ServiceCategoryKey"/>
                                    <Bar stackId="a" barSize={20} onClick={handleClick} fill="#82ca9d" dataKey="CWOMCOUNT" />
                                    
                                </BarChart>  

                            </ResponsiveContainer>


                            <Modal show={showModal} onOpen={() => { }} onClose={() => setShowModal(false)}> 

                                           <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                                            <BarChart data={workorderadditonalData} 
                                                layout="vertical" 
                                                width={500}
                                                height={200}
                                            >
                                                <XAxis type="number" />
                                                <YAxis dataKey="LocationName" type="category" />
                                                <Tooltip /> 
                                                <Bar barSize={20} dataKey="CWO Count" fill="#0d998a"  onClick={handleClick1}/> 
                                            </BarChart>
                                        </ResponsiveContainer> 
    
                            </Modal>

                            <Modal show={showModal1} onOpen={() => { }} onClose={() => setShowModal1(false)}> 
                                <div className="assets-widget-list">

                                    <div className="item-list">  
                                            <ul>
                                                {workordersubadditonalData.map((item) => (
                                                    <li key={item.AssetID}> 
                                                        <label>{item.AssetID}</label> 
                                                        <span>{item.CWOCount}</span> 
                                                    </li>
                                                ))}
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

    const upcomingAssetslist =  
    
    [
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
        // add a day
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
                {/* <TimeRangePicker title="" startTime={startDate} endTime={endDate} onChange={(s, e) => { setStartDate(s); setEndDate(e) }} /> */}

                <DateRangePicker title=""
                                startDate={startDate}
                                endDate={endDate}
                                closeOnSelect
                                onChange={(newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd)}}
                            /> 

                            
            </TitleBar>

            <div className="item-list" >  
                    <ul>
                        {upcomingAssetslist.map((item) => (  
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

    const problematicAssetslist = [{"AssetKey":"1","AssetID":"RAHU_001","TotalCases":"1"}]
 
    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Top 5 Highest CWO/WR per Asset'></TitleBar>

            <div className="item-list">  
                    <ul>
                        {problematicAssetslist.map((item) => (
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
 
    const topAgedlist = [
        {"AssetKey":"7","AssetID":"MW SA- AHU 3-1","InstalledDate":"19960101:000000","InstalledLocationKey":"301","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"6","AssetID":"MW SA- AHU 2-3","InstalledDate":"19960101:000000","InstalledLocationKey":"298","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"5","AssetID":"MW SA- AHU 2-2","InstalledDate":"19960101:000000","InstalledLocationKey":"298","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"4","AssetID":"MW SA- AHU 2-1","InstalledDate":"19960101:000000","InstalledLocationKey":"298","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"},
        {"AssetKey":"3","AssetID":"MW SA- AHU 1-2","InstalledDate":"19960101:000000","InstalledLocationKey":"296","AssetCategoryKey":"5","AssetGroupKey":"1","CurrentDate":"20210831:073020","Age":"25"}
    ]
 
    return (
        <WidgetWrapper className="assets-widget-list">
            <TitleBar title='Top 5 highest cwo/wr per Assets'></TitleBar>

              <div className="item-list">  
                    <ul>
                        {topAgedlist.map((item) => (
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