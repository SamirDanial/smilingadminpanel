import React from 'react'
import { useDispatch } from 'react-redux'
import { appWideDetailActions } from '../../store/applicationWideDetail.slice'

type ApplicationWideDetailProps = {
  tableData?: any
}

const ApplicationWideDetail = (props: ApplicationWideDetailProps) => {
  const dispatch = useDispatch()

  const close = () => {
    dispatch(appWideDetailActions.hideDetail({}))
  }
  return (
    <div className="fixed mt-[17%] ml-[32%] z-50 bg-white px-20 py-10 rounded-lg mr-auto">
      <div>
        <h1
          onClick={close}
          className="absolute right-2 top-0 font-bold text-smilingRed cursor-pointer"
        >
          x
        </h1>
      </div>
      <table className="table-fixed">
        <thead>
          <tr>
            {props.tableData.headers.map((header: string) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.tableData.rowDatas.map((data: string) => (
              <td key={data}>{data}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ApplicationWideDetail
