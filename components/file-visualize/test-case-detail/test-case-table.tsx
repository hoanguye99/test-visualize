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
  columnHelper.accessor('name', {
    header: () => 'Name',
    // enableSorting: true,
  }),
  columnHelper.accessor('url', {
    header: () => <span className="">URL</span>,
    cell: (info) => (
      <span className="whitespace-normal break-words">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('tests', {
    header: () => 'Test Results',
  }),
  columnHelper.accessor('time', {
    header: () => 'Time',
    // enableSorting: true,
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
            className="[&>*:nth-child(1)]:w-[18%] [&>*:nth-child(3)]:w-[20%] [&>*:nth-child(4)]:w-[20%]"
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
