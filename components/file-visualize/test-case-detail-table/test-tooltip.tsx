import * as React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

const TestTooltip = () => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ closeOnTriggerHidden: true })

  return (
    <div className="">
      <button type="button" ref={setTriggerRef}>
        Trigger
      </button>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          Tooltip
        </div>
      )}
    </div>
  )
}

export default TestTooltip
