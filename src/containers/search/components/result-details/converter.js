export default data => ({
	type: `Property type: ${data.property_type}\n`,
	title: data.title,
	uri: data.img_url,
	summary: data.summary,
	price: data.price_formatted,
	bedrooms: `Bedrooms count: ${data.bedroom_number}\n`,
	bathrooms: `Bathrooms count: ${data.bathroom_number}`
});