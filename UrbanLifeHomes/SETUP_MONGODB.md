# MongoDB Atlas Data API Setup (5 minutes)

Your site uses MongoDB Atlas Data API for direct browser access.
Follow these steps ONCE to get your API URL and key.

## Step 1: Log in to Atlas
Go to https://cloud.mongodb.com and log in.

## Step 2: Go to App Services
- Click your project "UrbanLifeHomes"
- Left sidebar → click **App Services** (or "Data API")
- If you see "Create a New App", click it and name it "urbanlifehomes-web"

## Step 3: Enable the Data API
- In App Services, go to **HTTPS** → **Data API**
- Toggle **Enable Data API** ON
- Select **Cluster0** as the data source
- Click **Save & Deploy**

## Step 4: Get your API Key
- Go to **Authentication** → **API Keys**
- Click **Create API Key**
- Name it "website-key"
- Copy the generated key (you won't see it again!)

## Step 5: Get your Data API URL
- Go back to **HTTPS** → **Data API**
- Copy the endpoint URL (looks like):
  `https://data.mongodb-api.com/app/XXXXXX/endpoint/data/v1`

## Step 6: Update .env
Open `.env` in the project root and replace:

```
VITE_ATLAS_DATA_API_URL=paste_your_endpoint_url_here
VITE_ATLAS_DATA_API_KEY=paste_your_api_key_here
VITE_ATLAS_DB_NAME=urbanlifehomes
VITE_ATLAS_DATA_SOURCE=Cluster0
```

## Step 7: Seed your database
Option A — Via Atlas UI (easiest):
1. Go to Atlas → **Database** → **Browse Collections**
2. Create database "urbanlifehomes"
3. Create collection "properties" → insert documents from seed.js
4. Create collection "pricing" → insert documents from seed.js

Option B — Via terminal:
```
node seed.js
```

## Done!
Run `npm run dev` and your site will fetch data from MongoDB.
If Atlas isn't configured yet, the site falls back to built-in data automatically.
