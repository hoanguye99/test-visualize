import React from 'react'

interface FileUploadProps {
  loadFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileUpload = (props: FileUploadProps) => {
  return (
    <>
      <label
        className="mt-20 max-w-lg rounded-2xl mx-auto p-10 bg-black/10 flex flex-col justify-center items-center gap-5"
        htmlFor="upload_file"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-20 h-20 fill-neutral-600"
        >
          <path
            fillRule="evenodd"
            d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
            clipRule="evenodd"
          />
          <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
        </svg>

        <p className="font-bold text-xl text-neutral-700">
          Please upload JSON test File
        </p>
      </label>
      <input
        type="file"
        name="upload_file"
        id="upload_file"
        // className="block text-sm text-slate-500
        //   file:mr-4 file:py-2 file:px-4
        //   file:rounded-full file:border-0
        //   file:text-sm file:font-semibold
        //   file:bg-blue-50 file:text-blue-700
        //   hover:file:bg-blue-100"
        className="hidden"
        accept=".json"
        onChange={(e) => props.loadFile(e)}
      />
    </>
  )
}

export default FileUpload
