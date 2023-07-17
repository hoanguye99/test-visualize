import { Tooltip } from '@/components/ui/tooltip/tooltip'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TestCaseDetail } from '..'

interface TestCaseDetailTableProps {
  data: TestCaseDetail[]
}

const TestCaseDetailTable = (props: TestCaseDetailTableProps) => {
  const router = useRouter()
  const [input, setInput] = useState(() => [...props.data])
  const [rowSpanName, setRowSpanName] = useState<{ [key: string]: number }>(
    input.reduce((map: any, value) => {
      map[value.name] = (map[value.name] || 0) + 1
      return map
    }, {})
  )
  useEffect(() => {
    setInput([...props.data])
  }, [props.data])
  useEffect(() => {
    setRowSpanName(
      input.reduce((map: any, value) => {
        map[value.name] = (map[value.name] || 0) + 1
        return map
      }, {})
    )
  }, [input])
  const columnHelper = createColumnHelper<TestCaseDetail>()

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => 'Name',
      cell: (info) => (
        <div
          className={` font-medium text-sm w-full h-full p-0 ${
            decodeURIComponent(router.asPath) ===
            `/#name_${info.row.original.name}`
              ? 'text-sky-500 font-bold'
              : ''
          }`}
        >
          {info.getValue()}
        </div>
      ),
      // enableSorting: true,
    }),
    columnHelper.accessor('method', {
      header: () => 'Method',
      cell: (info) => (
        <span className="text-neutral-500">{info.getValue()}</span>
      ),
      // enableSorting: true,
    }),
    columnHelper.accessor('url', {
      header: () => <span className="">URL</span>,
      cell: (info) => (
        <span
          className={`whitespace-normal break-words text-neutral-500 text-sm italic`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('tests', {
      header: () => 'Status',
      cell: (info) => {
        const resultArr = Object.values(info.getValue())
        const isPass = resultArr.reduce((ret, result) => ret && result, true)
        const total = resultArr.filter((result) => result === isPass).length
        return (
          <div className="flex items-center gap-x-2">
            <div className="text-neutral-500">
              <div className="flex justify-start items-center">
                {isPass ? (
                  <>
                    <span className="block w-3 h-3 rounded-full bg-green-500  mr-1.5"></span>
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
            <Tooltip
              tootipDetail={
                <div className="flex flex-col gap-2">
                  {Object.keys(info.getValue()).map((value) => (
                    <div className="flex items-center w[100px] gap-2">
                      {info.getValue()[value] ? (
                        <span className="block w-3 h-3 rounded-full bg-green-500  mr-1.5"></span>
                      ) : (
                        <span className="block w-3 h-3 rounded-full bg-red-400 mr-1.5"></span>
                      )}
                      <span className="col col-span-4 font-semibold text-sm">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 fill-black/50"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
            </Tooltip>
          </div>
        )
      },
    }),
    columnHelper.accessor('time', {
      header: () => 'Time(ms)',
      cell: (info) => {
        const color =
          info.getValue() > 1000
            ? 'bg-red-500'
            : info.getValue() > 500
            ? 'bg-yellow-300'
            : 'bg-blue-500'
        return (
          <>
            <p className="text-xs text-neutral-500">{info.getValue()}</p>
            <span
              style={{
                width: `${(info.row.original.timePercentage || 0) * 100}%`,
              }}
              className={`block h-2 rounded-sm bg-blue-500 ${color}`}
            ></span>
          </>
        )
      },
    }),
  ]

  const table = useReactTable({
    data: input,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  let shownNames: string[] = []
  return (
    <>
      <table className="main-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="[&>*:nth-child(1)]:w-[26%] [&>*:nth-child(2)]:w-[150px] [&>*:nth-child(4)]:w-[150px] [&>*:nth-child(5)]:w-[20%]"
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
                      <td
                        id={`name_${cell.row.original.name}`}
                        key={cell.id}
                        rowSpan={rowSpan}
                        className="border-r"
                      >
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TestCaseDetailTable
