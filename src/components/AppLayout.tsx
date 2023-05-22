import { ReactElement } from 'react'
import {Outlet} from 'react-router-dom'



export const AppLayout = (): ReactElement => {
  return (
    <>
      <h1> Hello Ginger</h1>
      <Outlet />
    </>
  )
}
