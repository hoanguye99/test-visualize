import React from 'react'
import { MasterData } from '..'

interface TestCaseDetailProps {
  data: MasterData
}

const TestCaseDetail = (props: TestCaseDetailProps) => {
  return (
    <div className="max-w-5xl mx-auto rounded-lg border border-neutral-200">
      {props.data.results.map((result) => (
        <div></div>
      ))}
    </div>
  )
}

export default TestCaseDetail
