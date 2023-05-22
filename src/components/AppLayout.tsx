import {Outlet} from 'react-router-dom'



export const AppLayout = () => {
  return (
    <>
      <h1> Hello Ginger</h1>
      <Outlet />
    </>
  )
}
