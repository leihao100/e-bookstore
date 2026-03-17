import Search from "antd/es/input/Search";

export default function SearchBook(){
    const handleEnter=(e)=> {
        window.location.href="/search?name="+e.target.value;
    }
    return(
    <Search
        placeholder="搜索栏"
        allowClear
        enterButton="Search"
        onSearch={handleEnter}
    />);
}