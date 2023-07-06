import * as PopperJS from '@popperjs/core'
import React, { useState } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'
// import './style.css'
interface TooltipProps {
  /** Tooltip's content*/
  children: React.ReactNode | string
  /** Tooltip's detail*/
  tootipDetail: React.ReactNode | string
  /** Tooltip's placement show (default= auto)*/
  placementTootip?: PopperJS.Placement
  visible?: boolean
}

export const Tooltip = (props: TooltipProps) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: props.placementTootip ?? 'auto' })
  const [visibleTooltip, setVisibleTooltip] = useState(props.visible)
  return (
    <>
      {visibleTooltip && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: `tooltip-container p-2 rounded-md bg-grey-1 text-grey-9`,
          })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {props.tootipDetail}
        </div>
      )}
      <div
        ref={setTriggerRef}
        onClick={() => {
          setVisibleTooltip(!visibleTooltip)
        }}
        className="m-0 p-0"
      >
        {props.children}
      </div>
    </>
  )
}
