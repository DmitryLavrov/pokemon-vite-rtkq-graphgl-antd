import React, {FC} from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'

export interface IMainPageMenuProps {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

const MainMenu: FC<IMainPageMenuProps>  = ({route, setRoute}) => {
  const items = [
    {
      key: "/",
      label:
        <Link to="/"
              onClick={() => setRoute('/')}>
          REST
        </Link>
    },
    {
      key:"/graphql",
      label:
        <Link to="/graphql"
              onClick={() => setRoute('/graphql')}>
          GRAPHQL
        </Link>
    }
  ]

  return (
    <Menu style={{textAlign: 'center',}}
          selectedKeys={[route]}
          mode="horizontal"
          items={items}/>
  )
}

export default MainMenu
