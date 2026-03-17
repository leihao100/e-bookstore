import React from "react";
import Table from "../component/Table";
import Toolbar from "../component/Toolbar";

class Excel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: false,
            data: this.props.initialData,
            preSearchData: null,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handlePreSearchData = this.handlePreSearchData.bind(this);
    }
    handleSearch(search){
        this.setState((state, props) => ({search: search}));
    }//回调处理search
    handleData(data){
        this.setState((state, props) => ({data:data}));
    }//回调处理data
    handlePreSearchData(preSearchData){
        this.setState((state, props) => ({preSearchData:preSearchData}));
    }//回调处理presearchdata

    render(){
        if (this.state.preSearchData != null)
            console.log("render View " + this.state.preSearchData);
        return(
            <div>
                <Toolbar data = {this.state.data} preSearchData = {this.state.preSearchData} search = {this.state.search}
                         onSearch = {this.handleSearch} onData = {this.handleData}  onPreSearchData = {this.handlePreSearchData}/>
                <Table headers = {this.props.headers} initialData = {this.state.data} search = {this.state.search} preSearchData = {this.state.preSearchData}
                       onData = {this.handleData}  onPreSearchData = {this.handlePreSearchData}/>
            </div>

        )
    }


};

export default Excel;