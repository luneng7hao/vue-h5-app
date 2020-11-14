import { App as VM } from 'vue'
import {
  Button,
  List,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  Form,
  ActionSheet,
  Search,
  Col,
  Row,
  Tag,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  Empty
} from 'vant'

const plugins = [
  Search,
  Button,
  List,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  ActionSheet,
  Form,
  Col,
  Row,
  Tag,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  Empty
]

export const vantPlugins = {
  install(vm: VM) {
    plugins.forEach(item => {
      vm.component(item.name, item)
    })
  }
}
