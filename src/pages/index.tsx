import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import TimeLine from '../components/container/TimeLineContainer'
import ToDoList from '../components/container/ToDoListContainer'

import type { NextPage } from "next"

const Index: NextPage = () => {
	return (
		<>
			<Tabs mt="8">
				<TabList justifyContent="center">
					<Tab w="40%" fontSize={20}>
						タイムライン
					</Tab>
					<Tab w="40%" fontSize={20}>
						ToDo
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<TimeLine />
					</TabPanel>
					<TabPanel>
						<ToDoList />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}

export default Index
