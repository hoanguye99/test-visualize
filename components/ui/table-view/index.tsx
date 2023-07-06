import React from 'react'
import EmptyView from '../empty-view'

interface TableViewProps<T> {
  tableData: T[]
  table: (props: { data: T[] }) => React.ReactNode
}

function TableView<T>(props: TableViewProps<T>) {
  if (props.tableData.length === 0)
    return (
      <EmptyView className="h-80 rounded-lg m-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-24 h-24 text-neutral-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
          />
        </svg>
        <p className="text-2xl text-neutral-500 mt-3">No data yet 🥲</p>
      </EmptyView>
    )
  return (
    <>
      <div className="h-fit overflow-x-auto">
        {props.table({ data: props.tableData })}
      </div>
    </>
  )
}

export default TableView
