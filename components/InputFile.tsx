import React from 'react'

type inputFileProp={
    loading:boolean,
    handleOnChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}
const InputFile = ({loading,handleOnChange}:inputFileProp) => {
 
    return (
            <div className="relative">
                <label className="bg-primary-color px-4 py-1.5 rounded text-white cursor-pointer" htmlFor="single">
                    {loading ? 'Uploading ...' : '上传'}
                </label>
                <input
                className="hidden "
                type="file"
                id="single"
                accept=".cdf"
                onChange={handleOnChange}
                disabled={loading}
                />
            </div>
    )
}

export default InputFile
