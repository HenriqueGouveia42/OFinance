const DetailLine = ({icon, content, action}) =>{
    return(
    <>
        <button className="flex justify-between items-center rounded-md p-6 m-1 w-full">
            <div className="text-left">{icon}</div>
            <div className="text-center">{content}</div>
            <div className="text-right">{action}</div>
        </button>
        <hr />
    </>
    )
}
export default DetailLine