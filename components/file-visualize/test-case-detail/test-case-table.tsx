import React, { useEffect, useState } from 'react'
import { TestCaseDetail } from '..'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface TestCaseTableProps {
  data: TestCaseDetail[]
}
const columnHelper = createColumnHelper<TestCaseDetail>()

const columns = [
  columnHelper.accessor('tests', {
    header: () => 'Test Results',
    cell: (info) => {
      const resultArr = Object.values(info.getValue())
      const isPass = resultArr.reduce((ret, result) => ret && result, true)
      const total = resultArr.filter((result) => result === isPass).length
      return (
        <div className="text-neutral-500">
          <div className="flex justify-start items-center">
            {isPass ? (
              <>
                <span className="block w-3 h-3 rounded-full bg-blue-500  mr-1.5"></span>
                <span>Pass</span>
              </>
            ) : (
              <>
                <span className="block w-3 h-3 rounded-full bg-red-400 mr-1.5"></span>
                <span>Fail</span>
              </>
            )}
          </div>
          <p className="ml-5">{`${total}/${resultArr.length}`}</p>
        </div>
      )
    },
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-sm">{info.getValue()}</span>
        <span className="text-neutral-500">{info.row.original.method}</span>
      </div>
    ),
    // enableSorting: true,
  }),
  columnHelper.accessor('url', {
    header: () => <span className="">URL</span>,
    cell: (info) => (
      <span className="whitespace-normal break-words text-neutral-500 text-sm">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('time', {
    header: () => 'Time(ms)',
    cell: (info) => {
      return (
        <>
          <p className="text-xs text-neutral-500">{info.getValue()}</p>
          <span
            style={{
              width: `${(info.row.original.timePercentage || 0) * 100}%`,
            }}
            className="block h-2 rounded-sm bg-green-400"
          ></span>
        </>
      )
    },
  }),
]

const TestCaseTable = (props: TestCaseTableProps) => {
  const [input, setInput] = useState(() => [...props.data])

  useEffect(() => {
    setInput([...props.data])
  }, [props.data])

  const table = useReactTable({
    data: input,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="main-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            className="[&>*:nth-child(1)]:w-[10%] [&>*:nth-child(2)]:w-[26%] [&>*:nth-child(4)]:w-[20%]"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TestCaseTable
