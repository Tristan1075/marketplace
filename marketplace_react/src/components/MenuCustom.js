import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

const MenuCustom = ({onTabClick, activeTab, removePlace}) => {
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          name='Marketplace'
          active={activeTab === 0}
          onClick={() => {
            onTabClick(0);
            removePlace();
          }}
        />
        <Menu.Item
          name='My Houses'
          active={activeTab === 1}
          onClick={() => onTabClick(1)}
        />
        <Menu.Item
          name='Add a new place'
          active={activeTab === 2}
          onClick={() => onTabClick(2)}
        />
      </Menu>
    </Segment>
  )
}

export default MenuCustom;