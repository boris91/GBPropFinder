export default data => ({
	title: data.title,
	uri: data.img_url,
	summary: data.summary,
	price: data.price_formatted,
	attrs: [
		`Property type: ${data.property_type}`,
		`Bedrooms count: ${data.bedroom_number}`,
		`Bathrooms count: ${data.bathroom_number}`
	].join('\n')
});