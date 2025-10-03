# Sample E-commerce Application

A Node.js e-commerce application built with Express.js, featuring product management, order processing, and Azure cloud integration.

## Features

- Product catalog with database integration
- Image management via Azure Blob Storage
- Order processing through Azure Functions
- Application monitoring with Azure Application Insights
- RESTful API endpoints
- Static file serving

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Microsoft SQL Server
- **Cloud Services**: Azure (Blob Storage, Functions, Application Insights)
- **Monitoring**: Application Insights
- **Environment**: Docker support

## Prerequisites

- Node.js 18 or higher
- SQL Server database
- Azure account with the following services:
  - Azure Blob Storage
  - Azure Functions
  - Application Insights

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sample-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=8080
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_db_server
DB_DATABASE=your_database_name
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=false
BLOB_STORAGE_URL=https://yourstorageaccount.blob.core.windows.net
BLOB_SAS_TOKEN=your_sas_token
AZURE_FUNCTION_URL=https://your-function-app.azurewebsites.net/api/orders
APP_INSIGHTS_KEY=your_application_insights_key
```

## Running the Application

### Local Development
```bash
npm start
```

The application will be available at `http://localhost:8080`

### Using Docker

1. Build the Docker image:
```bash
docker build -t sample-ecommerce .
```

2. Run the container:
```bash
docker run -p 8080:8080 --env-file .env sample-ecommerce
```

## API Endpoints

### Products
- `GET /api/products` - Retrieve all products from the database

### Images
- `GET /api/images/:imageName` - Get image URL from Azure Blob Storage

### Orders
- `POST /api/orders` - Process order through Azure Function

### Testing
- `GET /api/slowtest` - Test endpoint with 3-second delay

## Database Setup

Ensure your SQL Server database has a `Products` table with the appropriate schema. The application expects a table structure that can be queried with:
```sql
SELECT * FROM Products
```

## Azure Services Configuration

### Blob Storage
- Create a storage account
- Create a container named `product-images`
- Generate a SAS token with read permissions

### Azure Functions
- Deploy an order processing function
- Ensure it accepts POST requests with JSON payload

### Application Insights
- Create an Application Insights resource
- Copy the instrumentation key

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 8080) | No |
| `DB_USER` | Database username | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `DB_SERVER` | Database server address | Yes |
| `DB_DATABASE` | Database name | Yes |
| `DB_ENCRYPT` | Enable database encryption | Yes |
| `DB_TRUST_SERVER_CERTIFICATE` | Trust server certificate | Yes |
| `BLOB_STORAGE_URL` | Azure Blob Storage URL | Yes |
| `BLOB_SAS_TOKEN` | SAS token for blob access | Yes |
| `AZURE_FUNCTION_URL` | Azure Function endpoint | Yes |
| `APP_INSIGHTS_KEY` | Application Insights key | Yes |

## Project Structure

```
sample-ecommerce/
├── App.js              # Main application file
├── package.json        # Dependencies and scripts
├── Dockerfile         # Docker configuration
├── .env              # Environment variables (not in repo)
├── public/           # Static files
└── README.md         # This file
```

## Monitoring

The application includes Azure Application Insights integration for:
- Request tracking
- Performance monitoring
- Exception logging
- Dependency tracking
- Console logging
- Live metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License

## Support

For issues and questions, please create an issue in the repository.