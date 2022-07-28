import { useState, useEffect } from 'react';
import { CreateBugContainer as Container } from '../styles/create-bug';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import { VscIssueDraft } from 'react-icons/all';
import ThemeDialogBox from '../components/ThemeDialogBox';

export default function CreateBug(): JSX.Element {
	return (
		<>
			<Header />
			<ThemeDialogBox />
			<NavigationBar
				locationName='Create Bug'
				icon={<VscIssueDraft />}
			/>
			<Container></Container>
		</>
	);
}
