import dayjs from 'dayjs'
import { produce } from 'immer'
import TableView from '../ui/table-view'
import FailedTestCaseTable from './failed-test-case-table'
import RequestByStatusChart from './request-by-status-chart'
import TestCaseDetailTable from './test-case-detail-table'
import TestCaseTable from './test-case-table'

export interface MasterData {
  id: string
  name: string
  timestamp: string
  collection_id: string
  folder_id: number
  environment_id: string
  totalPass: number
  totalFail: number
  results: TestCaseDetail[]
  count: number
  totalTime: number
  collection: {
    requests: { id: string; method: string }[]
  }
}

export interface TestCaseDetail {
  id: string
  name: string
  url: string
  time: number
  timePercentage?: number
  responseCode: {
    code: number
    name: string
  }
  tests: {
    [key: string]: boolean
  }
  testPassFailCounts: {
    [key: string]: {
      pass: number
      fail: number
    }
  }
  method?: string
}
export interface TestsCaseStatus {
  name: string
  status: boolean
}
interface FileVisualizeProps {
  file: string
}

const FileVisualize = (props: FileVisualizeProps) => {
  const data: MasterData = JSON.parse(props.file)
  const maxTime = Math.max(...data.results.map((result) => result.time))
  const tableData = data.results.map((result) =>
    produce(result, (draftState) => {
      draftState.method = data.collection.requests.find(
        (obj) => obj.id === draftState.id
      )?.method
      draftState.timePercentage = draftState.time / maxTime
    })
  )
  const dataTableTestCase = Object.entries(
    tableData.reduce((map: any, value) => {
      let resultArr = Object.values(value.tests)
      let isPass = resultArr.reduce((ret, result) => ret && result, true)
      map[value.name] =
        map[value.name] != undefined
          ? map[value.name]
            ? isPass
            : false
          : isPass
      return map
    }, {})
  ).map((val) => ({
    name: val[0],
    status: Boolean(val[1]),
  }))
  return (
    <>
      <div className="grid grid-cols-6 gap-2 p-2">
        <h1 className="col-span-6 bg-white rounded-sm p-3 text-neutral-600 text-lg font-bold">
          {data.name}
        </h1>
        <div className="select-none md:col-span-2 col-span-6 bg-white bg-clock bg-no-repeat bg-cover border-4 border-white  rounded-sm h-[350px] flex flex-col justify-center items-center gap-2">
          <p className="text-black text-3xl">
            {dayjs(data.timestamp).format('MMMM D, YYYY')}
          </p>
          <p className="text-black text-6xl">
            {dayjs(data.timestamp).format('h:mm A')}
          </p>
          <p className="text-neutral-400 text-xl">Date of test</p>
        </div>
        <div className="md:col-span-2 col-span-3 bg-cover bg-opacity-90 bg-white rounded-sm h-[350px] flex justify-center select-none">
          <div className="flex justify-center items-center relative gap-0 rotate-45">
            <div className="absolute left-auto top-auto w-52 h-0.5 bg-neutral-200 transform rotate-90 transition-transforms"></div>
            <div className="w-40 h-40 transform flex flex-col justify-center items-center -rotate-45">
              <p className="text-6xl text-green-600">
                {dataTableTestCase.filter((e) => e.status === true).length}
              </p>
              <div className="w-full text-neutral-400 text-base text-right flex justify-center">
                Test Case Pass
              </div>
            </div>
            <div className="w-40 h-40 transform flex flex-col justify-center items-center -rotate-45">
              <p className="text-6xl text-red-400">
                {dataTableTestCase.filter((e) => e.status === false).length}
              </p>
              <div className="w-full text-neutral-400 text-base text-right flex justify-center">
                Test Case Fail
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-3 bg-cover bg-opacity-90 bg-white rounded-sm h-[350px] flex justify-center select-none">
          <div className="flex justify-center items-center relative gap-0 rotate-45">
            <div className="absolute left-auto top-auto w-52 h-0.5 bg-neutral-200 transform rotate-90 transition-transforms"></div>
            <div className="w-40 h-40 transform flex flex-col justify-center items-center -rotate-45">
              <p className="text-6xl text-green-600">{data.totalPass}</p>
              <div className="w-full text-neutral-400 text-base text-right flex justify-center">
                Test API Pass
              </div>
            </div>
            <div className="w-40 h-40 transform flex flex-col justify-center items-center -rotate-45">
              <p className="text-6xl text-red-400">{data.totalFail}</p>
              <div className="w-full text-neutral-400 text-base text-right flex justify-center">
                Test API Fail
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 bg-white rounded-sm">
          <p className="text-neutral-400 text-base text-center m-3">
            Test Case by Status Code
          </p>
          <div className="h-[460px]">
            <RequestByStatusChart data={data}></RequestByStatusChart>
          </div>
        </div>
        <div className="col-span-6 bg-white rounded-sm p-3">
          <TestCaseTable
            data={dataTableTestCase}
            // table={TestCaseTable}
          />
        </div>
        <div className="col-span-6 bg-white rounded-sm p-3">
          <p className="text-neutral-600 text-lg font-bold mb-3">
            Test Cases Failed
          </p>
          <TableView
            tableData={tableData.filter((result) =>
              Object.values(result.tests).includes(false)
            )}
            table={FailedTestCaseTable}
          />
        </div>
        <div className="col-span-6 bg-white rounded-sm p-3">
          <p className="text-neutral-600 text-lg font-bold mb-3">
            Test Case Detail
          </p>
          <TestCaseDetailTable
            data={tableData}
            // table={TestCaseDetailTable}
          />
        </div>
      </div>
      {/* <Link
        href="#header"
        className="bg-sky-500 text-white fixed bottom-8 right-8 p-3 font-bold rounded-lg shadow-2xl z-[9999]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
          />
        </svg>
      </Link> */}
    </>
  )
}

export default FileVisualize
