import React from 'react';
import { useApp } from '../../context/AppContext';

export default function LanguageToggle() {
	const { language, setLanguage } = useApp();

	return (
		<label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
			<span aria-hidden="true">🌐</span>
			<span className="sr-only">Language</span>
			<select value={language} onChange={(event) => setLanguage(event.target.value)}>
				<option value="en">English</option>
				<option value="hi">हिंदी</option>
				<option value="pa">ਪੰਜਾਬੀ</option>
			</select>
		</label>
	);
}
