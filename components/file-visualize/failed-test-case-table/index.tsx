import React, { useEffect, useState } from 'react'
import { TestCaseDetail } from '..'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'

interface FailedTestCaseTableProps {
  data: TestCaseDetail[]
}
const columnHelper = createColumnHelper<TestCaseDetail>()

const columns = [
  columnHelper.accessor('name', {
    id: 'name',
    header: () => 'Name',
    cell: (info) => (
      <Link
        href={`#name_${info.row.original.name}`}
        className="font-medium text-sm"
      >
        {info.getValue()}
      </Link>
    ),
    // enableSorting: true,
  }),
  columnHelper.accessor('method', {
    header: () => 'Method',
    cell: (info) => <span className="text-neutral-500">{info.getValue()}</span>,
    // enableSorting: true,
  }),
  columnHelper.accessor('url', {
    header: () => <span className="">URL</span>,
    cell: (info) => (
      <span className="whitespace-normal break-words text-neutral-500 text-sm italic">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('tests', {
    header: () => 'error',
    cell: (info) => {
      const obj = info.getValue()
      const keys = Object.keys(obj)
      return (
        <div className="flex flex-col gap-1 font-medium text-sm">
          {keys
            .filter((key) => obj[key] === false)
            .map((key) => (
              <p>{key}</p>
            ))}
        </div>
      )
    },
  }),
]

const FailedTestCaseTable = (props: FailedTestCaseTableProps) => {
  const [input, setInput] = useState(() => [...props.data])

  const [rowSpanName, setRowSpanName] = useState<{ [key: string]: number }>(
    input.reduce((map: any, value) => {
      map[value.name] = (map[value.name] || 0) + 1
      return map
    }, {})
  )

  useEffect(() => {
    setInput(props.data)
  }, [props.data])

  const table = useReactTable({
    data: input,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  let shownNames: string[] = []
  return (
    <table className="main-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            className="[&>*:nth-child(1)]:w-[26%] [&>*:nth-child(2)]:w-[150px]"
            // className="[&>*:nth-child(1)]:w-[26%] [&>*:nth-child(2)]:w-[150px] [&>*:nth-child(4)]:w-[150px] [&>*:nth-child(5)]:w-[20%]"
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
            {row.getVisibleCells().map((cell) => {
              if (cell.column.id === 'name') {
                const isNameShown = shownNames.includes(row.original.name)
                if (!isNameShown)
                  shownNames = [...shownNames, row.original.name]

                const rowSpan = rowSpanName[row.original.name]
                if (!isNameShown)
                  return (
                    <td key={cell.id} rowSpan={rowSpan} className="border-r">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                else <></>
              } else {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FailedTestCaseTable
