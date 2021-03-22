import Loader from "react-loader-spinner";

function loader(){
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-200 bg-opacity-50">
            <Loader
                className="flex h-full justify-center items-center"
                type="Bars"
                color="#00BFFF"
                height={100}
                width={100}//3 secs
            />
        </div>
  )
}
export default loader