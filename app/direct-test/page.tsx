export default function DirectTestPage() {
  // Directly embed the data we know works
  const data = {
    "id": "4bf39df0-f430-42cc-ba4e-f51dbebf8f9d",
    "slug": "england",
    "title": "England",
    "meta_title": "Foster Care in England | UK Foster Care Directory",
    "meta_description": "Find accredited foster agencies across England. Discover fostering opportunities in your region.",
    "intro_html": null,
    "hero_image": null,
    "created_at": "2025-12-10T09:32:58.458722+00:00",
    "updated_at": "2025-12-10T09:46:31.241014+00:00",
    "regions": [
      {
        "id": "8171a0ce-762a-4457-9700-c16ee26cf2ad",
        "country_id": "4bf39df0-f430-42cc-ba4e-f51dbebf8f9d",
        "slug": "north-east",
        "title": "North East",
        "summary": null,
        "long_html": null,
        "hero_image": null,
        "order": 1,
        "created_at": "2025-12-10T09:32:58.458722+00:00",
        "updated_at": "2025-12-10T09:46:31.536115+00:00"
      }
    ],
    "counties": [
      {
        "id": "9c466f93-28f7-4906-8d5a-dbae48b10582",
        "region_id": "8171a0ce-762a-4457-9700-c16ee26cf2ad",
        "country_id": "4bf39df0-f430-42cc-ba4e-f51dbebf8f9d",
        "slug": "tyne-and-wear",
        "title": "Tyne and Wear",
        "summary": "Urban county in North East England known for Newcastle upon Tyne.",
        "long_html": null,
        "hero_image": null,
        "stats_json": {
          "agencies": 12,
          "population": 1150000,
          "averageAllowance": "£450-£600"
        },
        "faq_json": [
          {
            "answer": "You must be over 21, have a spare room, and complete our assessment process.",
            "question": "What are the requirements to become a foster carer in Tyne and Wear?"
          }
        ],
        "order": null,
        "created_at": "2025-12-10T09:32:58.458722+00:00",
        "updated_at": "2025-12-10T09:46:33.389721+00:00"
      }
    ],
    "blocks": [
      {
        "id": "32fc3e82-b341-40b5-83bf-b65466069916",
        "country_id": "4bf39df0-f430-42cc-ba4e-f51dbebf8f9d",
        "type": "hero",
        "content_json": {
          "title": "Fostering Agencies in England",
          "ctaLink": "/contact",
          "ctaText": "Get Foster Agency Support",
          "subtitle": "England has one of the most active fostering communities in the UK, and many children still need safe, caring families every single day."
        },
        "order": 1,
        "created_at": "2025-12-10T11:09:48.724664+00:00",
        "updated_at": "2025-12-10T11:09:48.724664+00:00"
      }
    ]
  };

  return (
    <div className="site-container py-8">
      <h1>Direct Test Page</h1>
      <p>Country: {data.title}</p>
      <p>Regions: {data.regions.length}</p>
      <p>Counties: {data.counties.length}</p>
      <p>Blocks: {data.blocks.length}</p>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold">Raw Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}