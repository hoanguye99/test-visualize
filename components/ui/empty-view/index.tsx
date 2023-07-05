import React from 'react'

interface EmptyViewProps {
  children: React.ReactNode
  className?: string
}

const EmptyView = (props: EmptyViewProps) => {
  return (
    <div
      className={`h-[30rem] border-dashed border border-neutral-300 flex flex-col justify-center items-center ${props.className}`}
    >
      {props.children}
    </div>
  )
}

export default EmptyView
