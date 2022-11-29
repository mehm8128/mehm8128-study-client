import type { Meta } from "@storybook/react"
import RecordFixModal from "./RecordFixModal"
import { RecordResponse } from "src/types/record"

const record: RecordResponse = {
	id: "aaa",
	title: "test",
	page: 5,
	time: 15,
	comment: "test",
	favorites: [],
	favoriteNum: 0,
	fileId: "8c902aee-2eab-4631-948d-e1cd337ce39c",
	createdBy: "a1befe35-f5af-4fae-8153-15a35b1052d2",
	createdAt: "2022-11-27T14:28:55.785018Z",
	updatedAt: "2022-11-27T14:28:55.785018Z",
}

export default {
	title: "record/RecordFixModal",
	component: RecordFixModal,
} as Meta

export const Default = () => (
	<RecordFixModal
		shouldShowFixModal
		record={record}
		setShouldShowFixModal={() => {
			return
		}}
	/>
)
