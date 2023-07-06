import dayjs from 'dayjs'
import React from 'react'
import RequestByStatusChart from './request-by-status-chart'
import { produce } from 'immer'
import TestCaseDetailTable from './test-case-detail-table'
import TableView from '../ui/table-view'
import FailedTestCaseTable from './failed-test-case-table'

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
  return (
    <div className="grid grid-cols-6 gap-2 p-2">
      <div className="col-span-6 bg-white rounded-sm p-3 text-neutral-600 text-lg">
        {data.name}
      </div>
      <div className="md:col-span-2 col-span-6 bg-white rounded-sm h-[350px] flex flex-col justify-center items-center gap-2">
        <p className="text-black text-3xl">
          {dayjs(data.timestamp).format('MMMM D, YYYY')}
        </p>
        <p className="text-black text-3xl">
          {dayjs(data.timestamp).format('h:mm A')}
        </p>
        <p className="text-neutral-400 text-base">Date of test</p>
      </div>
      <div className="md:col-span-2 col-span-6 bg-white rounded-sm h-[350px] flex flex-col justify-center items-center gap-4">
        <p className=" text-6xl text-blue-600">{data.totalPass}</p>
        <p className="text-neutral-400 text-base">Total Pass</p>
      </div>
      <div className="md:col-span-2 col-span-6 bg-white rounded-sm h-[350px] flex flex-col justify-center items-center gap-4">
        <p className="text-6xl text-red-400">{data.totalFail}</p>
        <p className="text-neutral-400 text-base">Total Fail</p>
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
        <p className="text-red-400 text-lg mb-3">Failed Test Cases</p>
        <TableView
          tableData={tableData.filter((result) =>
            Object.values(result.tests).includes(false)
          )}
          table={FailedTestCaseTable}
        />
      </div>
      <div className="col-span-6 bg-white rounded-sm p-3">
        <p className="text-neutral-600 text-lg mb-3">Test Case Detail</p>
        <TableView tableData={tableData} table={TestCaseDetailTable} />
      </div>
    </div>
  )
}

export default FileVisualize
