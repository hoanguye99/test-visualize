import {
  Table,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TestsCaseStatus } from '..'
import Link from 'next/link'

interface TestsCaseStatusTableProps {
  data: TestsCaseStatus[]
}

const TestsCaseStatusTable = (props: TestsCaseStatusTableProps) => {
  const router = useRouter()
  const [input, setInput] = useState(() => [...props.data])
  const [splitIndex, setSplitIndex] = useState(Math.ceil(props.data.length / 2))

  useEffect(() => {
    setInput([...props.data])
  }, [props.data])
  useEffect(() => {
    setSplitIndex(Math.ceil(props.data.length / 2))
  }, [input])
  const columnHelper = createColumnHelper<TestsCaseStatus>()

  const columns = [
    columnHelper.accessor('status', {
      id: 'status',
      header: () => 'Status',
      cell: (info) => {
        const isPass = info.getValue()
        return (
          <div className="flex px-4">
            {isPass ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 rounded-full text-green-500 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        )
      },
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => 'Name',
      cell: (info) => (
        <Link
          href={`#name_${info.row.original.name}`}
          className={`w-full flex items-center font-medium text-sm ${
            decodeURIComponent(router.asPath) ===
            `/#name_${info.row.original.name}`
              ? 'text-sky-500 font-bold'
              : ''
          }`}
        >
          {info.getValue()}
        </Link>
      ),
    }),
  ]

  const table = useReactTable({
    data: input,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const table1 = useReactTable({
    data: input.slice(0, splitIndex),
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const table2 = useReactTable({
    data: input.slice(splitIndex),
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <>
      <div className={`overflow-x-auto`}>
        <div className="block md:hidden">
          <Table table={table} />
        </div>
        <div className="hidden md:flex">
          <Table table={table1}></Table>
          <Table table={table2} hiddenHeader={true}></Table>
        </div>
      </div>
    </>
  )
}
const Table = (props: {
  table: Table<TestsCaseStatus>
  hiddenHeader?: boolean
}) => {
  const { table } = props
  return (
    <>
      <table className={`w-full border-collapse border-grey-3 border-x-2`}>
        <thead className="sticky top-0 z-[10] bg-grey-3">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`${
                    header.id === '0_status'
                      ? 'w-28 text-center '
                      : 'w-fit text-start'
                  } uppercase p-5 bg-neutral-50 text-sm text-blue-900`}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {!props.hiddenHeader ? (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      ) : (
                        <div className="h-5"></div>
                      )}
                    </>
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
                <td
                  key={cell.id}
                  className={`${
                    cell.id === '0_status' ? 'w-28 ' : 'w-fit'
                  } border-t text-left border-grey-4 p-5 truncate break-words`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TestsCaseStatusTable
