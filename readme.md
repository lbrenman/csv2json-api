# API for CSV File Upload and Send To Another API As JSON

```bash
curl --location 'http://localhost:3000/upload' \
--form 'file=@"postman-cloud:///1eed29b9-c578-47d0-87cf-659f8a37fe03"'
```

```json
{
    "message": "CSV processed successfully",
    "recordsProcessed": 5,
    "apiResponse": "Success."
}
```